import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button / Fixed at the top */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-5 left-5 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative
        top-0 left-0
        h-screen lg:h-auto
        max-w-64 min-w-64
        bg-gray-900 text-white
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-40
        min-h-screen lg:min-h-[90vh]
      `}>
        <aside className="flex flex-col h-full justify-between">
          <div className="w-full">
            <h1 className="text-lg sm:text-xl lg:text-2xl border-b border-gray-700 p-3 sm:p-4 font-bold text-center mt-14 lg:mt-0">
              Admin Dashboard
            </h1>
            
            <nav className="p-2 sm:p-4">
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/all-products"
                    className="block py-2 px-3 text-sm sm:text-base lg:text-lg transition-all duration-200 border text-center rounded-lg border-gray-500 hover:bg-gray-700 active:bg-gray-600 hover:underline"
                  >
                  Products List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-custom-products-template"
                    className="block py-2 px-3 text-sm sm:text-base lg:text-lg transition-all duration-200 border text-center rounded-lg border-gray-500 hover:bg-gray-700 active:bg-gray-600 hover:underline"
                  >
                    Templates List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-product"
                    className="block py-2 px-3 text-sm sm:text-base lg:text-lg transition-all duration-200 border text-center rounded-lg border-gray-500 hover:bg-gray-700 active:bg-gray-600 hover:underline"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-template"
                    className="block py-2 px-3 text-sm sm:text-base lg:text-lg transition-all duration-200 border text-center rounded-lg border-gray-500 hover:bg-gray-700 active:bg-gray-600 hover:underline"
                  >
                    Add Template
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-orders"
                    className="block py-2 px-3 text-sm sm:text-base lg:text-lg transition-all duration-200 border text-center rounded-lg border-gray-500 hover:bg-gray-700 active:bg-gray-600 hover:underline"
                  >
                    View Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/messages"
                    className="block py-2 px-3 text-sm sm:text-base lg:text-lg transition-all duration-200 border text-center rounded-lg border-gray-500 hover:bg-gray-700 active:bg-gray-600 hover:underline"
                  >
                    View Messages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/announcements"
                    className="block py-2 px-3 text-sm sm:text-base lg:text-lg transition-all duration-200 border text-center rounded-lg border-gray-500 hover:bg-gray-700 active:bg-gray-600 hover:underline"
                  >
                    Announcements
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="p-2 sm:p-4 border-t border-gray-700">
              <button onClick={() => navigate("/")} className="w-full py-2 px-3 text-sm sm:text-base lg:text-xl text-white bg-gray-600 rounded-lg hover:bg-red-500 active:bg-red-600 transition-all duration-200">
                    Logout
              </button>
          </div>
        </aside>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;