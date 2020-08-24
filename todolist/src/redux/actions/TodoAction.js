import { ADD_TODO,
    DELETE_TODO,
    ADD_TODO_CHILD,
    COMPLETE_TODO,
    TOGGLE_TODO,
    STATUS_FILTER_BUTTON,
    SORT_TODO,
    CLEAR_COMPLETE} from '../actions/ActionTypes'
// reducer se goi den day
const addTodo = text => {
    return {
        type: ADD_TODO,
        text
    }
};

const deleteTodo = (id, idChild) => {
    return {
        type: DELETE_TODO,
        id,
        idChild
    }
};

const completeTodo = (id, idParent) => {
    debugger;
    return {
        type: COMPLETE_TODO,
        id,
        idParent
    }
};

const addChildTodo = (text, idParent) => {
    debugger;
    return {
        type: ADD_TODO_CHILD,
        text,
        idParent
    }
}

const toggleTodo = () => {
    return {
        type: TOGGLE_TODO
    }
}

const statusFilterButton = () => {
    return {
        type: STATUS_FILTER_BUTTON  
    }
}

const sortTodo = (listItems) => {
    const lis = listItems;
    debugger
    return {
        type: SORT_TODO,
        listItems
    }
}
const clearComplete = () => {
    return {
        type: CLEAR_COMPLETE,
    }
}
// const saveTextInput = (text) => {
//     return {
//         type: SAVE_TEXT_INPUT,
//         text
//     }
// }

export {
    addTodo, 
    deleteTodo,
    completeTodo,
    addChildTodo,
    toggleTodo,
    statusFilterButton,
    sortTodo,
    clearComplete
    // saveTextInput
}