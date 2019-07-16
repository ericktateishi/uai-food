export default {
    setLoad(state) {
        return { type: 'SET_LOAD', payload: state }
    },
    setError(state) {
        return { type: 'SET_ERROR', payload: state }
    }
}