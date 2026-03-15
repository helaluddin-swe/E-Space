const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    // Link to a User if you have authentication, 
    // otherwise, store guest details directly
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        selectedColor: { type: String, required: true },
        selectedSize: { type: String, required: true },
        // Reference to the product ID in your Products collection
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      district: { type: String, required: true }, // Important for BD shipping logic
    },
    paymentResult: {
      id: { type: String }, // Store bKash TRXID or Card TransID
      status: { type: String, default: 'Pending' },
      method: { 
        type: String, 
        required: true, 
        enum: ['bkash', 'card', 'cod'] 
      },
      paidAt: { type: Date },
    },
    pricing: {
      subtotal: { type: Number, required: true, default: 0.0 },
      shippingFee: { type: Number, required: true, default: 0.0 },
      discount: { type: Number, required: true, default: 0.0 },
      totalPrice: { type: Number, required: true, default: 0.0 },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// Add an index for faster lookups by phone or email (useful for admin dashboards)
orderSchema.index({ "user.phone": 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;