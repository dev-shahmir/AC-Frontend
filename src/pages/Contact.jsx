import { useState } from "react";
import {
  ShoppingBag,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Instagram,
  Clock,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react";
import instance from "../utils/axios";
import { toast } from "react-toastify";


export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await instance.post("/contact/save-message", form);
        toast.success("Message sent successfully! We'll get back to you within 24 hours.", {
        icon: <CheckCircle className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 1000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
      setForm({ name: "", number: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = "+923334400020"; // Replace with your actual number
    const message = "Hi! I need help with my order.";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+92 315 429 5716",
      subtitle: "Mon-Sat 10AM-8PM",
      action: () => window.open("tel:+923001234567"),
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "contact@artcharm.shop",
      subtitle: "We reply within 24hrs",
      action: () => window.open("mailto:info@yourstore.com"),
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      info: "Chat with us",
      subtitle: "Quick Response",
      action: handleWhatsAppClick,
    },
  ];

  const features = [
    { icon: Shield, title: "Secure Shopping", desc: "SSL Protected" },
    { icon: Star, title: "Trusted Store", desc: "100+ Happy Customers" },
    { icon: Clock, title: "Quick Response", desc: "Within 24 hours" },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-accent text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary orbitron">
              Contact Us
            </h1>
          </div>
          <p className="text-sm sm:text-base text-primary poppins-regular mt-1 sm:mt-2">
            Get in touch with us for any queries or support
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              onClick={method.action}
              className="bg-accent rounded-lg p-4 sm:p-6 shadow-sm border hover:shadow-md transition-all cursor-pointer hover:border-red-200"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-secondary border-[#80011f] border p-2 sm:p-3 rounded-full flex-shrink-0">
                  <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-primary poppins-semibold text-sm sm:text-base">
                    {method.title}
                  </h3>
                  <p className="text-primary poppins-medium text-sm sm:text-base truncate">
                    {method.info}
                  </p>
                  <p className="text-xs sm:text-sm text-primary poppins-regular">
                    {method.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-accent rounded-lg shadow-sm border border-[#80011f]">
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-lg sm:text-xl font-semibold text-primary orbitron">
                  Send us a Message
                </h2>
                <p className="text-sm sm:text-base text-primary poppins-regular mt-1">
                  Fill out the form below and we'll get back to you soon
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-primary poppins-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full p-3 border placeholder:text-[#80011f] border-primary rounded-lg focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none text-sm sm:text-base bg-transparent text-primary"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email and Phone - Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-primary poppins-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                         className="w-full p-3 border placeholder:text-[#80011f] border-primary rounded-lg focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none text-sm sm:text-base bg-transparent text-primary"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-primary poppins-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={form.number}
                        onChange={handleChange}
                         className="w-full p-3 border placeholder:text-[#80011f] border-primary rounded-lg focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none text-sm sm:text-base bg-transparent text-primary"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-primary poppins-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-3 border placeholder:text-[#80011f] border-primary rounded-lg focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none text-sm sm:text-base bg-transparent text-primary"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-[#80011f] border border-primary cursor-pointer hover:bg-[#80011f] hover:text-[#ffefcc] py-3 px-6 rounded-lg font-medium hover:opacity-90 focus:ring-4 disabled:opacity-70 disabled:cursor-not-allowed transition-all text-sm sm:text-base poppins-medium"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Follow Us */}
            <div className="bg-accent rounded-lg shadow-sm border p-4 sm:p-6">
              <h3 className="font-semibold text-primary poppins-semibold mb-4 text-sm sm:text-base">
                Follow Us
              </h3>
              <div className="flex justify-center">
                <button
                  onClick={() =>
                    window.open("https://www.instagram.com/artcharm.pk/?hl=en", "_blank")
                  }
                  className="flex items-center space-x-2 sm:space-x-3 bg-tranparent cursor-pointer text-[#80011f] border border-primary hover:bg-[#80011f] hover:text-[#ffefcc] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:opacity-90 transition-all text-sm sm:text-base"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="poppins-medium" >@artcharm.pk</span>
                </button>
              </div>
              <p className="text-xs poppins-regular sm:text-sm text-primary text-center mt-3">
                Follow us for latest updates and products
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="bg-accent rounded-lg shadow-sm border p-4 sm:p-6">
              <h3 className="font-semibold text-primary poppins-semibold mb-4 text-sm sm:text-base">
                Why Choose Us
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-primary poppins-medium text-sm sm:text-base">
                        {feature.title}
                      </p>
                      <p className="text-xs sm:text-sm text-primary poppins-regular">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Location */}
            <div className="bg-accent rounded-lg shadow-sm border p-4 sm:p-6">
              <h3 className="font-semibold text-primary mb-4 flex poppins-semibold items-center space-x-2 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>Visit Our Store</span>
              </h3>

              {/* Address */}
              <div className="mb-4">
                <p className="font-medium text-primary poppins-medium text-sm sm:text-base">
                  1st Floor,
                </p>
                <p className="text-primary poppins-regular text-xs sm:text-sm">
                  Mehboob Plaza,
                </p>
                <p className="text-primary poppins-regular text-xs sm:text-sm">
                  behind shell Petrol Pump,
                </p>
                <p className="text-primary poppins-regular text-xs sm:text-sm">
                  Roundabout Liberty Chowk, Lahore
                </p>
              </div>

              {/* Store Hours */}
              <div>
                <p className="font-medium text-primary poppins-semibold mb-2 text-sm sm:text-base">
                  Store Hours
                </p>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary poppins-regular">Monday - Saturday</span>
                    <span className="text-primary poppins-regular">10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary poppins-regular">Sunday</span>
                    <span className="text-primary poppins-regular">12:00 PM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* View Location Button */}
              <button
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/search/1st+Floor,++Mehboob+Plaza,++behind+shell+Petrol+Pump,++Roundabout+Liberty+Chowk,+Lahore/@31.5101791,74.3239606,14z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D",
                    "_blank"
                  )
                }
                className="w-full mt-4 text-[#80011f] border border-primary py-2 px-4 rounded-lg hover:opacity-80 transition-all text-sm font-medium cursor-pointer poppins-medium hover:bg-[#80011f] hover:text-[#ffefcc]"
              >
                View on Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
