const Order = require("../models/orderModel");
const axios = require("axios");

// Note: In production, move these to your .env file
const BKASH_URL = process.env.BKASH_BASE_URL || "https://checkout.sandbox.bka.sh/v1.2.0-beta";

// Helper: Get bKash Auth Token
const getBkashToken = async () => {
  const { data } = await axios.post(
    `${BKASH_URL}/checkout/token/grant`,
    {
      app_key: process.env.BKASH_APP_KEY,
      app_secret: process.env.BKASH_APP_SECRET,
    },
    {
      headers: {
        username: process.env.BKASH_USERNAME,
        password: process.env.BKASH_PASSWORD,
      },
    }
  );
  return data.id_token;
};

// @desc    Create new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, pricing, user } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // 1. Save order to MongoDB
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentResult: { method: paymentMethod },
      pricing,
      isPaid: false,
    });

    const createdOrder = await order.save();

    // 2. Logic for bKash Integration
    if (paymentMethod === "bkash") {
      try {
        const token = await getBkashToken();
        
        // Call bKash Create Payment API
        const { data } = await axios.post(
          `${BKASH_URL}/checkout/payment/create`,
          {
            mode: "0011",
            payerReference: user.phone,
            callbackURL: `${process.env.BACKEND_URL}/api/orders/bkash/callback?orderId=${createdOrder._id}`,
            amount: pricing.totalPrice.toString(),
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: createdOrder._id.toString().substring(0, 20),
          },
          {
            headers: {
              Authorization: token,
              "X-APP-Key": process.env.BKASH_APP_KEY,
            },
          }
        );

        return res.status(201).json({
          success: true,
          paymentUrl: data.bkashURL, // The actual bKash checkout page
          paymentID: data.paymentID,
        });
      } catch (bkashErr) {
        return res.status(500).json({ message: "bKash Init Failed", error: bkashErr.message });
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    bKash Callback & Execute Payment
// @route   GET /api/orders/bkash/callback
const bkashCallback = async (req, res) => {
  const { paymentID, status, orderId } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.redirect(`${process.env.FRONTEND_URL}/checkout?steps=3&error=payment_failed`);
  }

  try {
    const token = await getBkashToken();

    // Execute the payment to actually move the money
    const { data } = await axios.post(
      `${BKASH_URL}/checkout/payment/execute/${paymentID}`,
      {},
      {
        headers: {
          Authorization: token,
          "X-APP-Key": process.env.BKASH_APP_KEY,
        },
      }
    );

    if (data.transactionStatus === "Completed") {
      // Update Order in DB
      await Order.findByIdAndUpdate(orderId, {
        isPaid: true,
        "paymentResult.id": data.trxID,
        "paymentResult.status": "Completed",
        "paymentResult.paidAt": Date.now(),
      });

      return res.redirect(`${process.env.FRONTEND_URL}/checkout/success?trxID=${data.trxID}`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/checkout?steps=3&error=verification_failed`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, bkashCallback };