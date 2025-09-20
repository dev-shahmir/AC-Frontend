import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import logo from "/images/Group 1.png";
import { useCart } from "../context/CartContext"; // 👈 import cart context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart(); // 👈 ab yaha se cartItems milenge

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full z-50 transition-all sticky top-7 duration-500 ease-in-out bg-primary text-secondary">
      <div className="max-w-screen mx-auto px-10">
        <div className="flex justify-between items-center poppins-regular h-[80px] text-4xl">
          <a href="/" className="font-bold transition-all duration-300">
            <img height={140} width={120} src={logo} alt="logo" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 space-x-8 text-[15px]">
            <Link
              to="/"
              className="hover:text-accent transition-colors duration-300 mr-3"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="hover:text-accent transition-colors duration-300 mr-3"
            >
              About Us
            </Link>
            <Link
              to="/products"
              className="hover:text-accent transition-colors duration-300 mr-3"
            >
              Products
            </Link>
            <Link
              to="/customize-products"
              className="hover:text-accent transition-colors duration-300 mr-3"
            >
              Customize Products
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-accent transition-colors duration-300 mr-3"
            >
              Contact Us
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center justify-between max-sm:hidden">
            <Link to="/cart" className="relative mr-9">
              <ShoppingCart className="w-6 h-6 hover:scale-110 hover:text-[#ffdf9e] text-xl transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute poppins-semibold -top-2 -right-3 bg-accent text-primary text-xs px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden items-center transition-transform duration-300 hover:scale-110"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? <X size={35} /> : <Menu size={35} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-transform duration-500 origin-top ${
            isOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 h-0 overflow-hidden"
          }`}
        >
          <div className="h-[580px] flex flex-col items-center w-[100%] justify-around transition-all duration-300">
            <Link
              to="/"
              onClick={toggleSidebar}
              className="block w-full p-3 text-2xl poppins-regular text-center font-sans font-medium rounded-md border-b-2 border-[#ffefcc]"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              onClick={toggleSidebar}
              className="block text-2xl text-center poppins-regular w-full p-3 font-sans font-medium rounded-md border-b-2 border-[#ffefcc]"
            >
              About Us
            </Link>
            <Link
              to="/products"
              onClick={toggleSidebar}
              className="block w-full p-3 text-2xl poppins-regular text-center font-sans font-medium rounded-md border-b-2 border-[#ffefcc]"
            >
              Products
            </Link>
            <Link
              to="/customize-products"
              onClick={toggleSidebar}
              className="block text-2xl w-full p-3 poppins-regular text-center font-sans font-medium rounded-md border-b-2 border-[#ffefcc]"
            >
              Customize Products
            </Link>
            <Link
              to="/contact-us"
              onClick={toggleSidebar}
              className="block text-2xl text-center poppins-regular w-full p-3 font-sans font-medium rounded-md border-b-2 border-[#ffefcc]"
            >
              Contact Us
            </Link>
            <Link
              to="/cart"
              onClick={toggleSidebar}
              className="block text-2xl text-center poppins-regular w-full p-3 font-sans font-medium rounded-md border-b-2 border-[#ffefcc]"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
