import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductType } from '../../../types'

export const fetchProducts = createAsyncThunk<ProductType[], string>(
  'products/fetchProducts',
  async (params, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/products?${params}`)
    const result = await response.json()
    return result
  }
)

export const AddProduct = createAsyncThunk<void, ProductType>(
  'products/newProduct',
  async (newProduct) => {
    await fetch(`http://localhost:5000/products`, {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
)

type InitialStateType = {
  loading: boolean
  products: ProductType[]
}

const initialState: InitialStateType = {
  loading: false,
  products: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload
    })
  },
})

export const {} = productsSlice.actions
export default productsSlice.reducer
