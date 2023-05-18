
import { openError, openSuccess } from '@/components/NotificationPopup'
import { api } from '@/routes/constant'
import { UserRequest } from '@/utils/apiRequest'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface IUsers {
    id: number,
    username: string,
    email: string
}
type InitialState = {
    isLoading: boolean,
    users: Array<IUsers>
}
type Error = {
    statusCode: number,
    message: string
}
const initialState: InitialState = {
    isLoading: false,
    users: []
}

// Generates pending, fulfilled and rejected action types
export const userList = createAsyncThunk('users/get_all', async (_, { rejectWithValue }) => {

    try {
        const response = await UserRequest.get(api?.users.get)
        return response
    }
    catch (err: any) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response.data?.message)
    }
})
export const updateUser = createAsyncThunk('users/update', async (param: IUsers, { rejectWithValue }) => {

    try {
        const response = await UserRequest.put(api?.users.put, param)
        openSuccess('Update Successfully!')
        return response
    }
    catch (err: any) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response.data?.message)
    }
})
export const deleteUser = createAsyncThunk('users/delete', async (param: string, { rejectWithValue, fulfillWithValue }) => {

    try {
        const response = await UserRequest.delete(`${api?.users.delete}/${param}`)
        openSuccess('Delete Successfully!')
        fulfillWithValue(param)
        return response
    }
    catch (err: any) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response.data?.message)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updatePosition: (state, { payload }: PayloadAction<any>) => {
            state.users = [...payload]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userList.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(userList.fulfilled, (state, { payload }) => {
            state.users = payload?.data
            state.isLoading = false
        })
        builder.addCase(userList.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            openSuccess('Update Successfully!')
            state.users = state?.users.map(user => {
                if (user?.id === payload?.data?.id) {
                    return payload.data
                }
                return user
            })
            state.isLoading = false;
        });
        builder.addCase(updateUser.rejected, (state, { payload }) => {
            openError(payload as string)
            state.isLoading = false;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state?.users.filter(user => user?.email !== action?.meta?.arg)
            state.isLoading = false;
        });
        builder.addCase(deleteUser.rejected, (state, { payload }) => {
            openError(payload as string)
            state.isLoading = false;
        });
    },

})
export default userSlice.reducer
export const { updatePosition } = userSlice.actions