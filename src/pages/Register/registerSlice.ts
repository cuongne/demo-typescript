
import { api } from '@/routes/constant'
import { AuthRequest } from '@/utils/apiRequest'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


type InitialState = {
    isLoading: boolean
}
const initialState: InitialState = {
    isLoading: false,
}

type IDataSubmit = {
    email: string;
    password: string;
    username:string
}
// Generates pending, fulfilled and rejected action types
export const register = createAsyncThunk('auth/register', async (param: IDataSubmit, { rejectWithValue }) => {

    try {
        const response = await AuthRequest.post(api?.auth.register, param)
        return response
    }
    catch (err) {
        rejectWithValue(err)
    }
})

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(register.rejected, (state) => {
            state.isLoading = false
        })
    },

})
export default registerSlice.reducer
