import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserType = {
  userName?: string;
  login: string;
  password: string;
  phoneNumber?: string;
  id?: string;
};

const getUsers = async () => {
  const fetchedUsers = await fetch(`http://localhost:5000/users`);
  const users: UserType[] = await fetchedUsers.json();
  return users;
};

export const registration = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { errorMessage: string } }
>("user/registration", async (newUser, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();
  const checkUser = users.some(
    (user) =>
      user.login === newUser.login || user.phoneNumber === newUser.phoneNumber
  );

  if (checkUser) {
    return rejectWithValue({
      errorMessage:
        "Пользователь с таким логином или телефоном уже зарегистрирован",
    });
  }

  if (!checkUser) {
    const response = await fetch(`http://localhost:5000/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  }
});

export const login = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { errorMessage: string } }
>("user/login", async (authorizedUser, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();

  const userAuthorizationSuccess = users.find(
    (user) =>
      user.login === authorizedUser.login &&
      user.password === authorizedUser.password
  );

  // const passwordDenied = users.some(
  //   (user: any) =>
  //     user.login !== authorizedUser.login &&
  //     user.password !== authorizedUser.password
  // );

  if (userAuthorizationSuccess) {
    return userAuthorizationSuccess;
  } else {
    return rejectWithValue({
      errorMessage: "Логин или пароль указаны неправильно",
    });
  }
});

type InitialStateType = {
  user: UserType | null;
  error: null | string;
};

const initialState: InitialStateType = {
  user: null,
  error: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.error = action.payload ? action.payload.errorMessage : null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload ? action.payload.errorMessage : null;
    });
  },
});

export default registrationSlice.reducer;
