import loginReducer from '@/pages/Login/loginSlice'
import registerReducer from '@/pages/Register/registerSlice'
import userReducer from '@/pages/UserManagement/userSlice'
import articleReducer from '@/pages/Article/articleSlice'
import commentReducer from '@/pages/Comment/commentSlice'
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    users: userReducer,
    articles: articleReducer,
    comments: commentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch