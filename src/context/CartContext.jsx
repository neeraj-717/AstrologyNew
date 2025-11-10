import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setCartItems([]);
        return;
      }
      
      const { data } = await axios.get('https://astrologyb.onrender.com/api/cart', {
        headers: getAuthHeaders(),
      });
      setCartItems(data.items || []);
      localStorage.setItem('cartItems', JSON.stringify(data.items || []));
    } catch (err) {
      setError(err.response?.data?.msg || 'Error fetching cart');
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCart);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        'https://astrologyb.onrender.com/api/cart/add',
        { productId: product._id, quantity: 1 },
        { headers: getAuthHeaders() }
      );
      setCartItems(data.items);
      localStorage.setItem('cartItems', JSON.stringify(data.items));
    } catch (err) {
      setError(err.response?.data?.msg || 'Error adding to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`https://astrologyb.onrender.com/api/cart/remove/${productId}`, {
        headers: getAuthHeaders(),
      });
      setCartItems(data.items);
      localStorage.setItem('cartItems', JSON.stringify(data.items));
    } catch (err) {
      setError(err.response?.data?.msg || 'Error removing item');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await axios.delete('https://astrologyb.onrender.com/api/cart/clear', {
        headers: getAuthHeaders(),
      });
      setCartItems([]);
      localStorage.removeItem('cartItems');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error clearing cart');
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.productId?.price || 0);
      const quantity = Number(item.quantity) || 1;
      return acc + price * quantity;
    }, 0);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    } else {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCart);
    }
  }, []);

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
    getTotalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};