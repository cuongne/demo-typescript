
import { openError, openSuccess } from '@/components/NotificationPopup'
import { api } from '@/routes/constant'
import { UserRequest } from '@/utils/apiRequest'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


type Comments = {
    id:number,
    body: string,
    created: number,
    author:any
}
type Article = {
    id:number,
    description: string,
    title: string,
    body: string,
    tagList: Array<string>,
    slug:string,
    created: number,
    comments:Array<Comments>
}
type InitialState = {
    isLoading: boolean,
    article: Article
}

const initialState: InitialState = {
    isLoading: false,
    article: {
        id:0,
        description: '',
        title: '',
        body: '',
        slug:'',
        tagList: [],
        created: 0,
        comments:[]
    }
}

interface DataType {
    slug?: string;
    body:string;
}
interface DeleteType {
    slug?: string;
    id:number;
}
// Generates pending, fulfilled and rejected action types
export const commentItem = createAsyncThunk('comment/get_item', async (param: string, { rejectWithValue }) => {

    try {
        const response = await UserRequest.get((`${api?.article.get}/${param}`))
        return response
    }
    catch (err: any) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response.data?.message)
    }
})
export const createComment = createAsyncThunk('comment/create', async (param: DataType, { rejectWithValue }) => {

    try {
        const response = await UserRequest.post((`${api?.article.post}/${param?.slug}/comments`),{body:param?.body})
        openSuccess('Create Successfully!')
        return response
    }
    catch (err: any) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response.data?.message)
    }
})
export const deleteComment = createAsyncThunk('comment/delete', async (param: DeleteType, { rejectWithValue, fulfillWithValue }) => {

    try {
        const response = await UserRequest.delete(`${api?.article.post}/${param?.slug}/comments/${param?.id}`)
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

const commentSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(commentItem.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(commentItem.fulfilled, (state, { payload }) => {
            state.article = payload?.data?.article
            state.isLoading = false
        })
        builder.addCase(commentItem.rejected, (state) => {
            state.isLoading = false
        })
        builder.addCase(createComment.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createComment.fulfilled, (state, { payload }) => {
            state.article = payload?.data?.article
            state.isLoading = false
        })
        builder.addCase(createComment.rejected, (state) => {
            state.isLoading = false
        })
        
    },

})
export default commentSlice.reducer
