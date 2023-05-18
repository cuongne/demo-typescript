
import { openError, openSuccess } from '@/components/NotificationPopup'
import { api } from '@/routes/constant'
import { UserRequest } from '@/utils/apiRequest'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


type Articles = {
    articles: Array<any>,
    articlesCount: number
}
type InitialState = {
    isLoading: boolean,
    articles: Articles
}

const initialState: InitialState = {
    isLoading: false,
    articles: {
        articlesCount: 0,
        articles: []
    }
}

interface DataType {
    id: number;
    title: string;
    description: string;
    slug?: string;
    tagList: Array<string>;
}
// Generates pending, fulfilled and rejected action types
export const articleList = createAsyncThunk('article/get_all', async (_, { rejectWithValue }) => {

    try {
        const response = await UserRequest.get(api?.article.get)
        return response
    }
    catch (err: any) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response.data?.message)
    }
})
export const createArticle = createAsyncThunk('article/create', async (param: DataType, { rejectWithValue }) => {

    try {
        const response = await UserRequest.post(api?.article.post, param)
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
export const updateArticle = createAsyncThunk('article/update', async (param: DataType, { rejectWithValue }) => {

    try {
        const response = await UserRequest.put(`${api?.article.put}/${param?.slug}`, param)
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
export const deleteArticle = createAsyncThunk('article/delete', async (param: string, { rejectWithValue, fulfillWithValue }) => {

    try {
        const response = await UserRequest.delete(`${api?.article.delete}/${param}`)
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

const articleSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(articleList.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(articleList.fulfilled, (state, { payload }) => {
            state.articles = payload?.data
            state.isLoading = false
        })
        builder.addCase(articleList.rejected, (state) => {
            state.isLoading = false
        })
        //
        builder.addCase(updateArticle.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateArticle.fulfilled, (state, { payload }) => {
            const newArr = state?.articles?.articles.map(article => {
                if (article?.id === payload?.data?.article?.id) {
                    return payload.data?.article
                }
                return article
            })
            state.articles = { articlesCount: newArr.length, articles: newArr }
            state.isLoading = false
        })
        builder.addCase(updateArticle.rejected, (state, { payload }) => {
            openError(payload as string)
            state.isLoading = false
        })
        builder.addCase(deleteArticle.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteArticle.fulfilled, (state, action) => {
            const newArr = state?.articles?.articles.filter(article => article?.slug !== action?.meta?.arg)
            state.articles = { articlesCount: newArr.length, articles: newArr }
            state.isLoading = false;
        });
        builder.addCase(deleteArticle.rejected, (state, { payload }) => {
            openError(payload as string)
            state.isLoading = false;
        });
        builder.addCase(createArticle.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createArticle.fulfilled, (state, { payload }) => {
            state.articles = { articlesCount: state.articles.articlesCount + 1, articles: [payload?.data,...state.articles?.articles] }
            state.isLoading = false;
        });
        builder.addCase(createArticle.rejected, (state, { payload }) => {
            openError(payload as string)
            state.isLoading = false;
        });
    },

})
export default articleSlice.reducer
