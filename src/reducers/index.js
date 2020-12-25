const initialState = {
    articleList: [],
    todos: []
};

export default function todoApp(state = initialState, action) {
    switch (action.type) {
        case 'GET_ARTICLELIST':
            const articleList = [1, 2]
            return Object.assign({}, state, {
                articleList
            })
        default:
            return state
    }
}