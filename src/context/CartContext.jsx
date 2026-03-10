import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 🔥 Load Cart From LocalStorage First Time
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🔥 Save Cart To LocalStorage Whenever It Changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Add To Cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ➕➖ Update Quantity
  const updateQty = (id, type) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              qty:
                type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1,
            }
          : item,
      ),
    );
  };

  // ❌ Remove Item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // 🧮 Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  // 🔢 Total Items For Header Badge
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
