
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

// Context create
const CartContext = createContext();

// Custom hook for consuming cart
export const useCart = () => useContext(CartContext);

// Provider component
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event for cross-component communication
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // Remove item from cart
  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Update item quantity
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    
    // Dispatch event for other components
    window.dispatchEvent(new Event('cartCleared'));
  };

  return (
    <CartContext.Provider
      value={{ 
        cart: cartItems,        // ✅ Added cart alias
        cartItems,              // ✅ Keep cartItems for backward compatibility
        addToCart, 
        removeFromCart, 
        updateQuantity,         // ✅ Added updateQuantity
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;