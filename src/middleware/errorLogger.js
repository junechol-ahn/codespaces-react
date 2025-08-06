const errorLogger = (store) => (next) => (action) => {
    // console.log(action)
    if (action.type === 'SHOW_ERROR') {
        console.log(action.payload.error)
    } else {
        next(action)
    }
}

export default errorLogger