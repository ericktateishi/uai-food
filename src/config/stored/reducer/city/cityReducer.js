const initialState = { 
    current: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CITY':
            return { ...state, current: action.payload }
        default:
            return state
    }
}