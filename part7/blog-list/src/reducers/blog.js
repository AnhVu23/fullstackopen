import blogService from '../services/blogs'
const getAllBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
            type: 'GET_BLOGS',
            payload: {
                data,
            }
        })
    }
}

const createBlog = (blog) => {
    return async dispatch => {
        const data = await blogService.createOne(blog)
        dispatch({
            type: 'CREATE_BLOG',
            payload: {
                data,
            }
        })
        return data
    }
}

const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteOne(id)
        dispatch({
            type: 'DELETE_BLOG',
            payload: {
                id,
            }
        })
    }
}

const updateBlog = (id, data) => {
    return async dispatch => {
        await blogService.updateOne(id, data)
    }
}

const addComment = (id, text) => {
    return async dispatch => {
        await blogService.addComment(id, text)
        dispatch(getAllBlogs())
    }
}

const initialState = {
    blogs: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BLOGS':
            return {...state, blogs: action.payload.data}
        case 'CREATE_BLOG':
            return {...state, blogs: state.blogs.concat([action.payload.data])}
        case 'DELETE_BLOG':
            const foundBlogIndex = state.blogs.findIndex(blog => blog.id === action.payload.id)
            const cloneBlogs = [...state.blogs]
            cloneBlogs.splice(foundBlogIndex, 1)
            return {...state, blogs: cloneBlogs}
        default:
            return state
    }
}

export default reducer

export {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    addComment
}