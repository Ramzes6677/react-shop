import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../types";
import { AppDispatch } from "../../../store";

export const getCart = createAsyncThunk<ProductType[]>(
  "products/getCart",
  async (params, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/cart`);
    const result = await response.json();
    return result;
  }
);

export const addToCart = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>("products/addCart", async (product, { dispatch }) => {
  await fetch("http://localhost:5000/cart", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(getCart());
});

export const deleteFromCart = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>("products/deleteCart", async (product, { dispatch }) => {
  await fetch(`http://localhost:5000/cart/${product.id}`, {
    method: "DELETE",
  });
  dispatch(getCart());
});

export const updateProductCart = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>("products/updateProductCart", async (updatedProduct, { dispatch }) => {
  await fetch(`http://localhost:5000/cart/${updatedProduct.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(getCart());
});

type InitialStateType = {
  cart: ProductType[];
};

const initialState: InitialStateType = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
