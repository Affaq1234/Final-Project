import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "https://crud-api-storage.p.rapidapi.com/notes";
const HEADERS = {
  "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
  "x-rapidapi-host": "crud-api-storage.p.rapidapi.com",
  "Content-Type": "application/json",
};

// Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await fetch(`${BASE_URL}?offset=0&limit=50`, {
      method: "GET",
      headers: HEADERS,
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Fetch a single user by ID
export const fetchUserById = createAsyncThunk("user/fetchUserById", async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "GET",
      headers: HEADERS,
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Add a new user
export const addUser = createAsyncThunk("user/addUser", async (user) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        id: uuidv4(),
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        orderHistory: user.orderHistory,
        cart: user.cart,
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Edit a user by ID
export const editUser = createAsyncThunk("user/editUser", async ({ userId, user }) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        orderHistory: user.orderHistory,
        cart: user.cart,
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a user by ID
export const deleteUser = createAsyncThunk("user/deleteUser", async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    return { id: userId };
  } catch (error) {
    throw new Error(error);
  }
});

// Check if a user exists by email and password
export const checkUserExists = createAsyncThunk("user/checkUserExists", async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}?email=${email}&password=${password}`, {
      method: "GET",
      headers: HEADERS,
    });
    const users = await response.json();
    return users.find(user => user.email === email && user.password === password);
  } catch (error) {
    throw new Error(error);
  }
});

// Add product to cart by product ID and quantity
export const addProductToCart = createAction("user/addProductToCart", (userId, productId, quantity) => ({
  payload: { userId, productId, quantity },
}));

// Remove product from cart by product ID
export const removeProductFromCart = createAction("user/removeProductFromCart", (userId, productId) => ({
  payload: { userId, productId },
}));

// Confirm order and clear the cart
export const confirmOrder = createAsyncThunk("user/confirmOrder", async (userId, { getState }) => {
  const state = getState();
  const user = state.user.users.find(user => user.id === userId);
  if (user) {
    const order = {
      userId,
      orderHistory: [...user.orderHistory, { cart: user.cart, timestamp: new Date().toISOString() }],
    };
    return order;
  }
  throw new Error("User not found");
});

// Calculate total order price
export const calculateTotalOrderPrice = createAsyncThunk("user/calculateTotalOrderPrice", async (userId, { getState }) => {
  const state = getState();
  const user = state.user.users.find(user => user.id === userId);
  if (user) {
    const cartProducts = user.cart;
    let totalPrice = 0;
    for (const item of cartProducts) {
      const product = state.product.products.find(p => p.id === item.productId);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }
    return totalPrice;
  }
  throw new Error("User not found");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  reducers: {
    [addProductToCart]: (state, action) => {
      const { userId, productId, quantity } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        const productInCart = user.cart.find(item => item.productId === productId);
        if (productInCart) {
          productInCart.quantity += quantity;
        } else {
          user.cart.push({ productId, quantity });
        }
      }
    },
    [removeProductFromCart]: (state, action) => {
      const { userId, productId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.cart = user.cart.filter(item => item.productId !== productId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkUserExists.fulfilled, (state, action) => {
        // Handle user existence check
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        const { userId, orderHistory } = action.payload;
        const user = state.users.find(user => user.id === userId);
        if (user) {
          user.orderHistory = orderHistory;
          user.cart = [];
        }
      })
      .addCase(calculateTotalOrderPrice.fulfilled, (state, action) => {
        // Handle total price calculation if needed
      });
  },
});

export default userSlice.reducer;
