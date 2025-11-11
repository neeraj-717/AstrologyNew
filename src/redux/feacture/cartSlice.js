import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

// ✅ Load cart from localStorage if available
const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: storedCart,
  loading: false,
  error: null,
};

// ✅ Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("https://astrologyb.onrender.com/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem("cartItems", JSON.stringify(data.items));
    return data.items;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || "Error fetching cart");
  }
});

// ✅ Add to cart
export const addToCart = createAsyncThunk("cart/addToCart", async (product, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "https://astrologyb.onrender.com/api/cart/add",
      { productId: product._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem("cartItems", JSON.stringify(data.items));
    return data.items;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || "Error adding to cart");
  }
});

// ✅ Remove item
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`https://astrologyb.onrender.com/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem("cartItems", JSON.stringify(data.items));
    return data.items;
  } catch (err) {
    return rejectWithValue(err.response?.data?.msg || "Error removing item");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
