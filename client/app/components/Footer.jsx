import Link from "next/link";
import TextLogo from "./TextLogo";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-10">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-1 min-w-[250px]">
          <TextLogo variant="dark"/>
          <div className="text-center md:text-left space-y-1">
            <p>Made By DevSpace Studio © {new Date().getFullYear()}</p>
            <p className="text-sm text-gray-400">All Rights Reserved</p>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="text-white font-semibold uppercase tracking-wider">Links</p>
          <Link href="/" className="hover:text-white transition">HomePage</Link>
          <Link href="/" className="hover:text-white transition">Contact Us</Link>
          <Link href="/" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/" className="hover:text-white transition">Product Policy</Link>
        </div>

        {/* Products Column */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="text-white font-semibold uppercase tracking-wider">Products</p>
          <Link href="/" className="hover:text-white transition">All Products</Link>
          <Link href="/" className="hover:text-white transition">New Arrival</Link>
          <Link href="/" className="hover:text-white transition">Best Seller</Link>
          <Link href="/" className="hover:text-white transition">Sale</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="text-white font-semibold uppercase tracking-wider">Company</p>
          <Link href="/" className="hover:text-white transition">About</Link>
          <Link href="/" className="hover:text-white transition">Contact</Link>
          <Link href="/" className="hover:text-white transition">Blog</Link>
          <Link href="/" className="hover:text-white transition">Affiliate Program</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;