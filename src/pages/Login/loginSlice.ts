
import { api } from '@/routes/constant'
import { AuthRequest } from '@/utils/apiRequest'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


type InitialState = {
    isLoading: boolean
    infoLogin: LoginInfo,
    message: any
}
const initialState: InitialState = {
    isLoading: false,
    infoLogin: {
        email: ''
    },
    message: {}
}
type LoginInfo = {
    email: string;

}
type IDataSubmit = {
    email: string;
    password: string;
}
// Generates pending, fulfilled and rejected action types
export const login = createAsyncThunk('auth/login', async (param: IDataSubmit, { rejectWithValue }) => {

    try {
        const response = await AuthRequest.post(api?.auth.login, param)
        localStorage.setItem('token', response?.data?.user?.token);
        localStorage.setItem('email', response?.data?.user?.email);
        return response
    }
    catch (err) {
        rejectWithValue(err)
    }
})

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogin: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.infoLogin = {
                email: payload?.data?.user?.email
            }
            state.isLoading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            state.message = action.payload
            state.isLoading = false
        })
    },

})
export default loginSlice.reducer
export const { setIsLogin } = loginSlice.actions