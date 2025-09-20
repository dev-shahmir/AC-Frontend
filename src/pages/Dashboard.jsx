// import Sidebar from '../components/Sidebar';

import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  

  // setAllowAccess(true);
  return (
    <section className=" min-h-screen flex">
   
      <Sidebar  />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-4">
        
        {children}
      </main>
    </section>
  );
};

export default Layout;