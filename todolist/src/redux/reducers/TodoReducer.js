import { v4 as uuidv4 } from 'uuid';
import { ADD_TODO,DELETE_TODO,ADD_TODO_CHILD,COMPLETE_TODO,TOGGLE_TODO, STATUS_FILTER_BUTTON } from '../actions/ActionTypes';

const initialState = {
    listItems: [
        {
            id: 1,
            title: 'Ăn cơm',
            isComplete: false,
            children: [
                {id: uuidv4(),title: 'Ăn cháo', isComplete: false, isChildren: true},
                {id: uuidv4(),title: 'Ăn cá', isComplete: false, isChildren: true},
                {id: uuidv4(),title: 'Ăn tôm', isComplete: false, isChildren: true},
            ],
            isHaveChildren: true,
        },
        {id: 2, title: 'Ăn cá', isComplete: false, children: [], isHaveChildren: false},
        {id: 3, title: 'Ăn canh', isComplete: false, children: [], isHaveChildren: false },
        {id: 4, title: 'uống nước', isComplete: false, children: [], isHaveChildren: false},
        {id: 5, title: 'giặt', isComplete: false, children: [], isHaveChildren: false},
        {id: 6, title: 'tắm', isComplete: false, children: [], isHaveChildren: false},
        {id: 7, title: 'Nấu cơm', isComplete: false, children: [], isHaveChildren: false},
    ],
    inputHeader: {
        inputSearch: '',
        inputAddTodo: ''
    },
    statusFilter: 'all'
};

export default function TodoReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO:
            console.log('ADD TODO');
            const todo = {
                title: action.text,
                isComplete: false,
                children: [],
                isHaveChildren: false
            }
            state.listItems.push(todo);
            return Object.assign({}, state);
        case DELETE_TODO:
            console.log('DELETE_TODO, id: ', action.id, action.idChild);
            if(action.idChild) {
                const indexParent = state.listItems.findIndex(itemParent => itemParent.id === action.id);
                const newListItems = state.listItems[indexParent].children.filter(itemChild => itemChild.id !== action.idChild);
                state.listItems[indexParent].children = newListItems;
            } else {
                 const newListItems = state.listItems.filter(todo => todo.id !== action.id);
                state.listItems = newListItems;
            }
            const result = Object.assign({}, state)
            return result;
        case COMPLETE_TODO:
            console.log('COMPLETE_TODO');
            return state;
        case TOGGLE_TODO:
            console.log('TOGGLE_TODO');
            return state;
        case STATUS_FILTER_BUTTON:
            console.log('STATUS_FILTER_BUTTON');
            return state;
        case ADD_TODO_CHILD:
            console.log('ADD_TODO_CHILD');
            return state;
        default:
            return state;
    }
} 