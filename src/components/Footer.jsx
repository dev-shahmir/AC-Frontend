import {
  Heart,
  Star,
  Phone,
  Clock,
  ArrowRight,
  Shield,
  Award,
  MapPin,
  Mail,
  LucideInstagram,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#80011f] via-[#7a0f1e] to-[#80011f] relative overflow-hidden">
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-4 sm:py-12 md:py-12 lg:py-20 xl:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            {/* Company Info - Top Section */}
            <div className="mb-6 sm:mb-10 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3 sm:mb-4">
                <h3 className="text-4xl orbitron sm:text-2xl lg:text-3xl font-bold text-[#ffefcc]">
                  Art Charm
                </h3>
              </div>
              <p className="text-[#ffefcc] poppins-regular text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 max-w-lg mx-auto sm:mx-0">
                At Art Charm, we transform your space with premium frames,
                stunning posters, elegant polaroids, customized nikkah-namas,
                durable PVC sheets, and more. Every piece is crafted where
                creativity meets elegance and quality, adding charm and meaning
                to your moments and surroundings.
              </p>

              {/* Minimalist Trust Badges */}
              <div className="flex justify-center sm:justify-start gap-3 max-w-sm mx-auto sm:mx-0">
                <div className="bg-tranparent poppins-medium backdrop-blur-sm p-2.5 rounded-lg border border-[#ffefcc]/20">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#ffdf9e] flex-shrink-0" />
                    <span className="text-[#ffefcc] text-xs sm:text-sm font-semibold">
                      Secure
                    </span>
                  </div>
                </div>
                <div className="bg-tranparent poppins-medium backdrop-blur-sm p-2.5 rounded-lg border border-[#ffefcc]/20">
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#ffdf9e] flex-shrink-0" />
                    <span className="text-[#ffefcc] text-xs sm:text-sm font-semibold">
                      Premium
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Section with Enhanced Design */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-6 sm:mb-10">
              {/* Quick Links */}
              <div className="group">
                <h4 className="text-sm sm:text-xl font-bold text-[#ffdf9e] mb-3 sm:mb-5 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#ffdf9e] to-[#ffefcc] rounded-full shadow-lg animate-pulse"></div>
                  <span className="poppins-semibold">Quick Links</span>
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    { name: "Home", path: "/" },
                    { name: "About Us", path: "/about-us" },
                    { name: "Products", path: "/products" },
                    { name: "Customize Products", path: "/customize-products" },
                    { name: "Contact Us", path: "/contact-us" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-[#ffefcc]/80 hover:text-[#ffdf9e] transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 group/link py-1 hover:pl-2 rounded-lg hover:bg-[#ffefcc]/5"
                      >
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/link:translate-x-0" />
                        <span className="font-medium poppins-regular group-hover/link:font-semibold transition-all duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="group">
                <h4 className="text-sm sm:text-xl font-bold text-[#ffdf9e] mb-3 sm:mb-5 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#ffdf9e] to-[#ffefcc] rounded-full shadow-lg animate-pulse delay-300"></div>
                  <span className="poppins-semibold">Products</span>
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    { name: "Posters" },
                    { name: "Frames" },
                    { name: "Polaroids" },
                    { name: "Nikkah-Namas" },
                    { name: "Stickers" },
                  ].map((category, index) => (
                    <li key={index}>
                      <h4 className="text-[#ffefcc]/80 hover:text-[#ffdf9e] transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 group/link py-1 hover:pl-2 rounded-lg hover:bg-[#ffefcc]/5">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 group-hover/link:opacity-100 transition-all duration-300 group-hover/link:text-[#ffdf9e] group-hover/link:fill-current" />
                        <span className="font-lg poppins-regular group-hover/link:font-semibold transition-all duration-300">
                          {category.name}
                        </span>
                      </h4>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-span-2 lg:col-span-1 group">
                <h4 className="text-sm sm:text-xl font-bold text-[#ffdf9e] mb-3 sm:mb-5 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#ffdf9e] to-[#ffefcc] rounded-full shadow-lg animate-pulse delay-500"></div>
                  <span className="poppins-semibold">Contact Us</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
                  {/* Address */}
                  <div className="flex poppins-regular items-start gap-3 p-3 rounded-xl hover:bg-[#ffefcc]/5 transition-all duration-300 hover:scale-105 group/contact">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#ffefcc]/20 to-[#ffdf9e]/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-[#ffefcc]/20 group-hover/contact:border-[#ffdf9e]/40 transition-all duration-300">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdf9e]" />
                    </div>
                    <div>
                      <p className="text-[#ffefcc] text-xs sm:text-sm font-bold mb-1">
                        Address
                      </p>
                      <p className="text-[#ffefcc]/90 text-xs sm:text-sm leading-relaxed font-medium">
                        Mehboob Plaza, behind shell Petrol Pump,
                        <br />
                        Roundabout Liberty Chowk, Lahore
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#ffefcc]/5 transition-all duration-300 hover:scale-105 group/contact">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#ffefcc]/20 to-[#ffdf9e]/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-[#ffefcc]/20 group-hover/contact:border-[#ffdf9e]/40 transition-all duration-300">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdf9e]" />
                    </div>
                    <div>
                      <p className="text-[#ffefcc] text-xs sm:text-sm font-bold mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:info@artcharm.com"
                        className="text-[#ffefcc]/90 hover:text-[#ffdf9e] text-xs sm:text-sm font-medium transition-colors duration-300"
                      >
                        contact@artcharm.shop
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#ffefcc]/5 transition-all duration-300 hover:scale-105 group/contact">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#ffefcc]/20 to-[#ffdf9e]/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-[#ffefcc]/20 group-hover/contact:border-[#ffdf9e]/40 transition-all duration-300">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdf9e]" />
                    </div>
                    <div>
                      <p className="text-[#ffefcc] text-xs sm:text-sm font-bold mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:+92 315 429 5716"
                        className="text-[#ffefcc]/90 hover:text-[#ffdf9e] text-xs sm:text-sm font-medium transition-colors duration-300"
                      >
                       +92 315 429 5716
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#ffefcc]/5 transition-all duration-300 hover:scale-105 group/contact">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#ffefcc]/20 to-[#ffdf9e]/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-[#ffefcc]/20 group-hover/contact:border-[#ffdf9e]/40 transition-all duration-300">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdf9e]" />
                    </div>
                    <div>
                      <p className="text-[#ffefcc] text-xs sm:text-sm font-bold mb-1">
                        Business Hours
                      </p>
                      <p className="text-[#ffefcc]/90 text-xs sm:text-sm leading-relaxed font-medium">
                        Mon-Fri: 9AM-6PM
                        <br />
                        Sat-Sun: 10AM-4PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Media & Rating */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-[#ffdf9e]  gap-6">
              {/* Social Media */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <p className=" text-sm sm:text-base font-bold bg-gradient-to-r from-[#ffefcc] to-[#ffdf9e] bg-clip-text text-transparent poppins-semibold">
                  Follow Our Journey:
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  {[
                    {
                      icon: LucideInstagram,
                      href: "https://www.instagram.com/artcharm.pk/?hl=en",
                      delay: "100ms",
                      name: "Instagram",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Follow us on ${social.name}`}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ffefcc]/15 to-[#ffdf9e]/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#ffdf9e] hover:to-[#ffefcc] transition-all duration-500 hover:scale-110 hover:rotate-12 shadow-lg border border-[#ffefcc]/20 hover:border-[#ffdf9e]/50 group"
                      style={{ animationDelay: social.delay }}
                    >
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffefcc] group-hover:text-[#80011f] transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Enhanced Rating */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#ffefcc]/10 to-[#ffdf9e]/5 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-xl border border-[#ffefcc]/20 hover:border-[#ffdf9e]/40 transition-all duration-300 hover:scale-105">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdf9e] fill-current animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <span className="text-[#ffefcc] text-sm sm:text-base font-bold">
                  4.9/5 Customer Love
                </span>
              </div>
            </div>

            {/* Enhanced Copyright */}
            <div className="text-center pt-6 sm:pt-8 border-t border-[#ffdf9e] mt-6 sm:mt-8 space-y-3 sm:space-y-4 poppins-regular">
              <p className="text-[#ffefcc]/80 text-sm sm:text-base leading-relaxed font-medium">
                © {new Date().getFullYear()} Art Charm. All rights reserved. |
                Crafted with
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdf9e] inline mx-2 animate-pulse" />
                for art lovers everywhere
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="text-[#ffefcc]/60 text-sm font-medium orbitron">
                  Developed & Designed by
                </span>
                <div className="bg-gradient-to-r cursor-pointer from-[#ffefcc]/15 to-[#ffdf9e]/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#ffefcc]/30 hover:border-[#ffdf9e]/50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <a
                    href="https://webarcorp.vercel.app/"
                    className="text-[#ffdf9e] font-bold text-sm sm:text-base cursor-pointer hover:text-[#ffefcc] transition-colors duration-300 orbitron"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Webar Corp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
