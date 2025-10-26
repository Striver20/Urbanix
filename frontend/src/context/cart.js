import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      let existingCartItem = localStorage.getItem("cart");
      if (existingCartItem) {
        const parsedCart = JSON.parse(existingCartItem);
        // Only set cart if it's a valid array
        if (Array.isArray(parsedCart)) {
          // Migrate existing cart items to include quantity if missing
          const migratedCart = parsedCart.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCart(migratedCart);
        }
      }
    } catch (error) {
      console.log("Error loading cart from localStorage:", error);
      // Clear corrupted cart data
      localStorage.removeItem("cart");
      setCart([]);
    }
  }, []);

  // Auto-save cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        // Clear localStorage if cart is empty
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log("Error saving cart to localStorage:", error);
      // If localStorage is full, clear it and try again with current cart
      try {
        localStorage.clear();
        if (cart.length > 0) {
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } catch (retryError) {
        console.log(
          "Failed to save cart even after clearing localStorage:",
          retryError
        );
      }
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
