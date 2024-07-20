import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const BASE_URL = "https://crud-operations2.p.rapidapi.com/api/v1";
const HEADERS = {
  "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
  "x-rapidapi-host": "crud-operations2.p.rapidapi.com",
  "Content-Type": "application/json",
};

// Fetch all products
export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: HEADERS,
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Fetch a product by ID
export const fetchProductById = createAsyncThunk("product/fetchProductById", async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: HEADERS,
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Add a new product
export const addProduct = createAsyncThunk("product/addProduct", async (product) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(product),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Edit a product by ID
export const editProduct = createAsyncThunk("product/editProduct", async ({ id, product }) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(product),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a product by ID
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: HEADERS,
    });
    return { id }; // Return the deleted ID to help with updating the state
  } catch (error) {
    throw new Error(error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProducts = state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
        state.products = updatedProducts;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProducts = state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
        state.products = updatedProducts;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product.id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
