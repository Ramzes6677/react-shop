import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductType } from '../../../types'
import { AppDispatch } from '../../../store'

export const getfavorites = createAsyncThunk<ProductType[]>(
  'products/getfavorites',
  async (params, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/favorites`)
    const result = await response.json()
    return result
  }
)

export const addfavorites = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>('products/addfavorites', async (product, { dispatch }) => {
  await fetch('http://localhost:5000/favorites', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  dispatch(getfavorites())
})

export const deletefavorites = createAsyncThunk<
  void,
  ProductType,
  { dispatch: AppDispatch }
>('products/deletefavorites', async (product, { dispatch }) => {
  await fetch(`http://localhost:5000/favorites/${product.id}`, {
    method: 'DELETE',
  })
  dispatch(getfavorites())
})

type InitialStateType = {
  favorites: ProductType[]
}

const initialState: InitialStateType = {
  favorites: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getfavorites.fulfilled, (state, action) => {
      state.favorites = action.payload
    })
  },
})

export const {} = favoritesSlice.actions
export default favoritesSlice.reducer
