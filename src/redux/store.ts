import { configureStore } from "@reduxjs/toolkit";
import adverdReducer from "./slices/adverts";
import staticReducer from "./slices/static";
import loginReducer from "./slices/login";

export const store = configureStore({
  reducer: {
    Login: loginReducer,
    Static: staticReducer,
    Adverts: adverdReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
