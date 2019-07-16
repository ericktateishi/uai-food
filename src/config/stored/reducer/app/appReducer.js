const initialState = { 
    loading: false,
    error: {
        hasError: false,
        message: ''
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOAD':
            return { ...state, loading: action.payload }
        case 'SET_ERROR':
            return { ...state, error: action.payload }
        default:
            return state
    }
}