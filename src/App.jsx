/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";

import "./index.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/About";
import PageLoader from "./components/PageLoader";
import ProductPage from "./pages/ProductsGallery";
import TemplatePage from "./pages/TemplatesGallery";
import Contact from "./pages/Contact";
import TemplateDetail from "./pages/TemplateDetail";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import CreateProduct from "./pages/CreateProduct";
import Login from "./pages/Login";
import Layout from "./pages/Dashboard";
import ViewProducts from "./pages/ViewProducts";
import ViewCustomProducts from "./pages/ViewCustomProducts";
import UpdateProduct from "./pages/UpdateProduct";
import CreateCustomProduct from "./pages/CreateCustomProduct";
import  CartProvider  from "./context/CartContext";
import ViewOrders from "./pages/ViewOrder";
import Messages from "./pages/ViewMessages";
import AnnouncementsPage from "./pages/ViewAnnouncements";
import AnnouncementBar from "./components/AnnouncementBar";
import ScrollToTop from "./utils/scrollToTop";
// import ScrollToTop from "./utils/scrollToTop";

const ProtectedRoute = ({
  element: Component,
  condition,
  isAdmin,
  fallbackRoute = "/",
}) => {
  if (!condition) {
    return <Navigate to={fallbackRoute} />;
  }
  if (isAdmin && !localStorage.getItem("isAdmin")) {
    return <Navigate to="/dashboard" />;
  }
  return <Component />;
};

function App() {
  const [allowAccess, setAllowAccess] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <CartProvider>
        <MainContent
          allowAccess={allowAccess}
          setAllowAccess={setAllowAccess}
        />
      </CartProvider>
    </Router>
  );
}

function MainContent({ allowAccess, setAllowAccess }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // List of admin routes
  const adminRoutes = [
    "/dashboard",
    "/create-product",
    "/all-products",
    "/all-custom-products-template",
    "/update-product",
    "/view-orders",
    "/create-template",
    "/messages",
    "/announcements",
  ];

  const isAdminRoute = adminRoutes.includes(location.pathname);

  const [showLoader, setShowLoader] = useState(false);
 
  useEffect(() => {
    if (!isAdminRoute) {
      setShowLoader(true);
      setLoading(true);

      const minLoaderTime = 2000;
      const startTime = Date.now();

      const timer = setTimeout(() => {
        const elapsed = Date.now() - startTime;
        const remaining = minLoaderTime - elapsed;

        setTimeout(
          () => {
            setLoading(false); // Trigger fade-out
            window.scrollTo(0, 0);

            // Wait for fade-out animation before unmount
            setTimeout(() => setShowLoader(false), 5000);
          },
          remaining > 0 ? remaining : 0
        );
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [location, isAdminRoute]);

 

  return (
    <>
      {!isAdminRoute && <AnnouncementBar />}
      {!isAdminRoute && <Navbar />}
      {showLoader && <PageLoader visible={loading} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/customize-products" element={<TemplatePage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route
          path="/product/:id"
          element={<ProductDetail  />}
        />
        <Route
          path="/customize-product/:id"
          element={<TemplateDetail />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route
          path="/login"
          element={<Login setAllowAccess={setAllowAccess} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Layout} condition={allowAccess} />}
        />
        <Route
          path="/create-product"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <CreateProduct />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
        <Route
          path="/all-products"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <ViewProducts />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
        <Route
          path="/all-custom-products-template"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <ViewCustomProducts />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
        <Route
          path="/update-product"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <UpdateProduct />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
        <Route
          path="/view-orders"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <ViewOrders />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
        <Route
          path="/create-template"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <CreateCustomProduct />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
         <Route
          path="/messages"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <Messages />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
        <Route
          path="/announcements"
          element={
            <ProtectedRoute
              element={() => (
                <Layout>
                  <AnnouncementsPage />
                </Layout>
              )}
              condition={allowAccess}
              isAdmin={true}
            />
          }
        />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
