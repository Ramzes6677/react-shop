import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../types";

type CommentType = {
  userName: string;
  text: string;
  productID: number;
  date: string;
  id?: number;
};

export const loadProduct = createAsyncThunk<ProductType, string>(
  "products/loadProduct",
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const result = await response.json();
    return result;
  }
);

export const loadComments = createAsyncThunk<CommentType[], number>(
  "products/loadComments",
  async (id, thunkAPI) => {
    const response = await fetch(
      `http://localhost:5000/comments?productID=${id}`
    );
    const result = await response.json();
    return result;
  }
);

export const createComment = createAsyncThunk<void, CommentType>(
  "products/createComment",
  async (comment, { dispatch }) => {
    await fetch(`http://localhost:5000/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(loadComments(comment.productID));
  }
);

type InitialStateType = {
  product: ProductType | null;
  comments: CommentType[];
};

const initialState: InitialStateType = {
  product: null,
  comments: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default productSlice.reducer;
