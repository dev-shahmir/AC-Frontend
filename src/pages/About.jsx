import { useState } from "react";
import {
  Shield,
  Truck,
  RotateCcw,
  FileText,
  Users,
  Award,
  Star,
  Heart,
  CheckCircle,
} from "lucide-react";
// import logo from "/images/Group 1.png";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("privacy");

  const tabs = [
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "return", label: "Return & Refund", icon: RotateCcw },
    { id: "delivery", label: "Delivery Policy", icon: Truck },
    { id: "terms", label: "Terms & Conditions", icon: FileText },
  ];

  const renderTabContent = (tabId) => {
    if (tabId === "privacy") {
      return (
        <div className="space-y-3 sm:space-y-4">
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start bg-[#ffefcc] p-3 sm:p-4 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#80011f] mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                We respect your privacy and only use your personal information
                for order processing and delivery.
              </span>
            </li>
            <li className="flex items-start bg-[#ffdf9e] p-3 sm:p-4 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#80011f] mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                We never sell or share your details with third parties without
                your consent.
              </span>
            </li>
            <li className="flex items-start bg-[#ffefcc] p-3 sm:p-4 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#80011f] mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Online payments are handled securely through trusted gateways.
              </span>
            </li>
          </ul>
        </div>
      );
    }

    if (tabId === "return") {
      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gradient-to-r from-[#ffdf9e] to-[#ffefcc] p-3 sm:p-4 rounded-lg border-l-4 border-[#80011f]">
            <p className="font-semibold text-sm sm:text-base text-[#80011f] leading-relaxed">
              Our return and refund policy applies to{" "}
              <span className="bg-[#80011f] text-[#ffefcc] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                Cash on Delivery (COD)
              </span>{" "}
              orders:
            </p>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start bg-[#ffefcc] p-2.5 sm:p-3 rounded-lg">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#80011f] text-[#ffefcc] text-xs rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                1
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Returns can be requested if the product is damaged, defective,
                or incorrect.
              </span>
            </li>
            <li className="flex items-start bg-[#ffdf9e] p-2.5 sm:p-3 rounded-lg">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#80011f] text-[#ffefcc] text-xs rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                2
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Requests must be made on time of delivery.
              </span>
            </li>
            <li className="flex items-start bg-[#ffefcc] p-2.5 sm:p-3 rounded-lg">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#80011f] text-[#ffefcc] text-xs rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                3
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Refunds are processed only after receiving the product in its
                original condition.
              </span>
            </li>
            <li className="flex items-start bg-[#ffdf9e] p-2.5 sm:p-3 rounded-lg">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#80011f] text-[#ffefcc] text-xs rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                4
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Delivery charges are non-refundable.
              </span>
            </li>
          </ul>
        </div>
      );
    }

    if (tabId === "delivery") {
      return (
        <div className="space-y-3 sm:space-y-4">
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start bg-gradient-to-r from-[#ffdf9e] to-[#ffefcc] p-3 sm:p-4 rounded-lg">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffefcc]" />
              </div>
              <div className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                <span className="font-semibold">Nationwide Coverage:</span> We
                deliver via reliable courier partners.
              </div>
            </li>
            <li className="flex items-start bg-[#ffefcc] p-3 sm:p-4 rounded-lg border-2 border-[#ffdf9e]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffefcc]" />
              </div>
              <div className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                <span className="font-semibold">Fair Pricing:</span> Delivery
                charges based on location and order size.
              </div>
            </li>
            <li className="flex items-start bg-gradient-to-r from-[#ffdf9e] to-[#ffefcc] p-3 sm:p-4 rounded-lg">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffefcc]" />
              </div>
              <div className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                <span className="font-semibold">Quick Delivery:</span> 3–7
                working days estimated time.
              </div>
            </li>
            <li className="flex items-start bg-[#ffefcc] p-3 sm:p-4 rounded-lg border-2 border-[#ffdf9e]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffefcc]" />
              </div>
              <div className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                <span className="font-semibold">Free Shipping:</span> Available
                for orders above certain amount.
              </div>
            </li>
          </ul>
        </div>
      );
    }

    if (tabId === "terms") {
      return (
        <div className="space-y-3 sm:space-y-4">
          <ol className="space-y-3 sm:space-y-4">
            <li className="flex items-start bg-[#ffefcc] p-3 sm:p-4 rounded-lg border-l-4 border-[#80011f]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] text-[#ffefcc] text-xs sm:text-sm rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                1
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Product images are for illustration purposes; slight variations
                may occur.
              </span>
            </li>
            <li className="flex items-start bg-[#ffdf9e] p-3 sm:p-4 rounded-lg border-l-4 border-[#80011f]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] text-[#ffefcc] text-xs sm:text-sm rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                2
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Prices are subject to change without prior notice.
              </span>
            </li>
            <li className="flex items-start bg-[#ffefcc] p-3 sm:p-4 rounded-lg border-l-4 border-[#80011f]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] text-[#ffefcc] text-xs sm:text-sm rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                3
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Orders are confirmed via call, SMS, or email before processing.
              </span>
            </li>
            <li className="flex items-start bg-[#ffdf9e] p-3 sm:p-4 rounded-lg border-l-4 border-[#80011f]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] text-[#ffefcc] text-xs sm:text-sm rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                4
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                We reserve the right to cancel orders in case of suspected
                fraud.
              </span>
            </li>
            <li className="flex items-start bg-[#ffefcc] p-3 sm:p-4 rounded-lg border-l-4 border-[#80011f]">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80011f] text-[#ffefcc] text-xs sm:text-sm rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0 font-bold">
                5
              </div>
              <span className="text-sm sm:text-base text-[#80011f] leading-relaxed">
                Customers must provide accurate shipping details to avoid
                delays.
              </span>
            </li>
          </ol>
        </div>
      );
    }

    return null;
  };

  const getCurrentTabData = () => {
    return tabs.find((tab) => tab.id === activeTab);
  };

  return (
    <div className="min-h-screen bg-[#ffdf9e]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#80011f] to-[#80011f]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
          <div className="animate-fade-in animation-delay-[2s]">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
            </div>
             <h1 className="text-3xl orbitron sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffefcc] mb-4 sm:mb-6 px-2">
              About{" "}
              <span className="bg-gradient-to-r from-[#ffdf9e] to-[#ffefcc] bg-clip-text text-transparent">
                Art Charm
              </span>
            </h1>
            <p className="text-base poppins-extralight sm:text-lg md:text-xl text-[#ffefcc] max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
              At Art Charm, we transform your space with premium frames, stunning posters, elegant polaroids, customized nikkah-namas, durable PVC sheets, and more. Every piece is crafted where creativity meets elegance and quality, adding charm and meaning to your moments and surroundings.
            </p>
            <div className="mt-6 sm:mt-8 flex justify-center space-x-1 sm:space-x-2">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffdf9e] fill-current" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffdf9e] fill-current" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffdf9e] fill-current" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffdf9e] fill-current" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffdf9e] fill-current" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
        {/* Who We Are Section */}
        <section className="text-center mb-8 sm:mb-16">
          <div className="bg-[#ffefcc] rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-[#ffdf9e] relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#80011f] to-[#80011f] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffefcc]" />
                </div>
              </div>
              <h2 className="text-2xl orbitron sm:text-3xl font-bold text-[#80011f] mb-4 sm:mb-6">
                Who We Are
              </h2>
              <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 text-[#80011f] leading-relaxed text-base sm:text-lg">
                <p className="bg-gradient-to-r poppins-light from-[#ffdf9e] to-[#ffefcc] p-4 sm:p-6 rounded-xl sm:rounded-2xl border-l-4 border-[#80011f]">
                  Welcome to <span className="font-bold orbitron">Art Charm</span>, your
                  trusted destination for high-quality Frames, Posters, Nikkah-Nama's, Polaroids and PVC-Sheets. We believe in transforming spaces with creativity,
                  elegance, and originality.
                </p>
                <p className="bg-[#ffdf9e] p-4 poppins-light sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#ffefcc] shadow-md">
                  Our mission is to bring art closer to everyone by offering
                  unique designs at affordable prices. Customer satisfaction is
                  our priority, ensuring a smooth and reliable shopping
                  experience from browsing to delivery.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-[#ffdf9e]">
                <div className="text-center bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                  <div className="text-2xl poppins-bold sm:text-3xl md:text-4xl font-bold text-[#80011f] mb-1 sm:mb-2">
                    100+
                  </div>
                  <div className="text-sm poppins-medium sm:text-base text-[#80011f] font-semibold">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center bg-[#ffefcc] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#ffdf9e]">
                  <div className="text-2xl poppins-bold sm:text-3xl md:text-4xl font-bold text-[#80011f] mb-1 sm:mb-2">
                    1k+
                  </div>
                  <div className="text-sm poppins-medium sm:text-base text-[#80011f] font-semibold">
                    Products Delivered
                  </div>
                </div>
                <div className="text-center bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
                  <div className="text-2xl poppins-bold sm:text-3xl md:text-4xl font-bold text-[#80011f] mb-1 sm:mb-2">
                    99%
                  </div>
                  <div className="text-sm poppins-medium sm:text-base text-[#80011f] font-semibold">
                    Satisfaction Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Policies Section */}
        <section className="bg-[#ffefcc] rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-[#ffdf9e] overflow-hidden">
          <h2 className="text-xl orbitron sm:text-2xl md:text-3xl font-bold text-[#80011f] text-center mb-6 sm:mb-8 px-2">
            Our Policies & Terms
          </h2>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 poppins-medium gap-1 sm:gap-2 mb-6 sm:mb-8 bg-[#ffdf9e] p-1 sm:p-2 rounded-xl sm:rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center cursor-pointer justify-center p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#80011f] text-[#ffefcc] shadow-lg"
                      : "bg-[#ffefcc] text-[#80011f] hover:bg-[#ffdf9e] hover:border-[#80011f] border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm font-semibold text-center leading-tight px-1">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-[#ffdf9e] rounded-xl poppins-regular sm:rounded-2xl p-4 sm:p-6 border-2 border-[#ffefcc] min-h-[250px] sm:min-h-[300px]">
            <div className="flex items-center mb-3 sm:mb-4">
              {(() => {
                const currentTab = getCurrentTabData();
                const Icon = currentTab.icon;
                return (
                  <>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#80011f] rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffefcc]" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#80011f]">
                      {currentTab.label}
                    </h3>
                  </>
                );
              })()}
            </div>

            <div className="transition-all duration-300">
              {renderTabContent(activeTab)}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="relative bg-gradient-to-br from-[#80011f] to-[#80011f] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center overflow-hidden shadow-xl sm:shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-xl orbitron sm:text-2xl md:text-3xl font-bold mb-2 text-[#ffdf9e] px-2">
              Why Choose Art Charm?
            </h2>
            <p className="text-sm poppins-regular sm:text-base text-[#ffefcc] mb-6 sm:mb-8 px-4">
              Experience the difference with our premium, personalized services designed just for you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="flex flex-col items-center bg-[#ffefcc] bg-opacity-10 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#ffefcc] border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <Truck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#80011f]" />
                </div>
                <h3 className="font-bold poppins-bold text-primary mb-2 text-base sm:text-lg">
                  Fast Delivery
                </h3>
                <p className="text-primary poppins-medium text-xs sm:text-sm leading-relaxed text-center px-2">
                  Quick and reliable delivery service across the entire nation
                </p>
              </div>

              <div className="flex flex-col items-center bg-[#ffefcc] bg-opacity-10 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#ffefcc] border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#80011f]" />
                </div>
                <h3 className="font-bold poppins-bold text-primary mb-2 text-base sm:text-lg">
                  Premium Quality
                </h3>
                <p className="text-primary poppins-medium text-xs sm:text-sm leading-relaxed text-center px-2">
                  High-quality frames and artwork that exceed expectations
                </p>
              </div>

              <div className="flex flex-col items-center bg-[#ffefcc] bg-opacity-10 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#ffefcc] border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#80011f]" />
                </div>
                <h3 className="font-bold poppins-bold text-primary mb-2 text-base sm:text-lg">
                  Customer First
                </h3>
                <p className="text-primary poppins-medium text-xs sm:text-sm leading-relaxed text-center px-2">
                  Dedicated support and satisfaction guarantee for every order
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-br from-[#ffefcc] to-[#ffdf9e] rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 border-2 sm:border-4 border-[#ffdf9e] relative overflow-hidden">
          <div className="relative z-10 text-center">
            <h2 className="text-2xl orbitron sm:text-3xl md:text-4xl font-bold text-[#80011f] mb-4 sm:mb-6">
              Get In Touch
            </h2>
            <p className="text-base poppins-regular sm:text-lg text-[#80011f] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
              Have questions about our products or need assistance with your
              order? We&apos;re here to help!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-[#ffefcc] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#ffdf9e] hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#80011f] rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffefcc]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="poppins-semibold text-[#80011f] mb-2 text-sm sm:text-base">
                  Email Us
                </h3>
                <p className="text-[#80011f] poppins-regular text-xs sm:text-sm">
                  contact@artcharm.shop
                </p>
              </div>

              <div className="bg-[#ffdf9e] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#ffefcc] hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#80011f] rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffefcc]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="poppins-semibold text-[#80011f] mb-2 text-sm sm:text-base">
                  Call Us
                </h3>
                <p className="text-[#80011f] poppins-regular text-xs sm:text-sm">
                  +92 315 429 5716
                </p>
              </div>

              <div className="bg-[#ffefcc] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#ffdf9e] hover:shadow-xl transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#80011f] rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffefcc]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="poppins-semibold text-[#80011f] mb-2 text-sm sm:text-base">
                  Business Hours
                </h3>
                <p className="text-[#80011f] poppins-regular text-xs sm:text-sm">
                  Mon-Fri: 9AM-6PM
                  <br />
                  Sat-Sun: 10AM-4PM
                </p>
              </div>
            </div>

            {/* <div className="bg-[#80011f] p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center max-w-md mx-auto">
              <p className="text-[#ffefcc] font-semibold text-sm sm:text-base mb-2">
                Follow us on social media
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffdf9e] rounded-lg flex items-center justify-center hover:bg-[#ffefcc] transition-colors cursor-pointer">
                  <span className="text-[#80011f] font-bold text-xs sm:text-sm">
                    f
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffdf9e] rounded-lg flex items-center justify-center hover:bg-[#ffefcc] transition-colors cursor-pointer">
                  <span className="text-[#80011f] font-bold text-xs sm:text-sm">
                    ig
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffdf9e] rounded-lg flex items-center justify-center hover:bg-[#ffefcc] transition-colors cursor-pointer">
                  <span className="text-[#80011f] font-bold text-xs sm:text-sm">
                    tw
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        /* Additional responsive utilities for very small screens */
        @media (max-width: 320px) {
          .text-xs { font-size: 0.7rem; }
          .p-2 { padding: 0.4rem; }
        }
        
        /* Smooth scrolling for better mobile experience */
        html {
          scroll-behavior: smooth;
        }
        
        /* Better touch targets for mobile */
        button {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Prevent horizontal scroll on very small screens */
        .overflow-x-hidden {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
