import { v4 as uuidv4 } from 'uuid';
import { ADD_TODO,DELETE_TODO,ADD_TODO_CHILD,COMPLETE_TODO,TOGGLE_TODO, STATUS_FILTER_BUTTON, SORT_TODO, CLEAR_COMPLETE } from '../actions/ActionTypes';
// container se map action va reducer
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
        {id: 0, title: 'giặt', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'tắm', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'Nấu cơm', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'đi làm', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'deadline', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'ngồi', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'nghỉ ngơi', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'Ăn cơm trưa', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'Ăn sáng', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'Ăn tối', isComplete: false, children: [], isHaveChildren: false},
        {id: 0, title: 'đi học', isComplete: false, children: [], isHaveChildren: false}
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
            debugger
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
            debugger
            console.log('DELETE_TODO, id: ', action.id, action.idChild);
            if(action.idChild) {
                const indexParent = state.listItems.findIndex(itemParent => itemParent.id === action.id);
                const newListItems = state.listItems[indexParent].children.filter(itemChild => itemChild.id !== action.idChild);
                state.listItems[indexParent].children = newListItems;
            } else {
                 const newListItems = state.listItems.filter(todo => todo.id !== action.id);
                state.listItems = newListItems;
            }
            
            return {...state};
        case COMPLETE_TODO:
            debugger
            console.log('COMPLETE_TODO');
            if(!action.idParent) { // complete parent
                const index = state.listItems.findIndex(item => item.id === action.id);
                state.listItems[index].isComplete = !state.listItems[index].isComplete;
                if(state.listItems[index].children.length > 0 ) {
                    state.listItems[index].children.map(itemChild => itemChild.isComplete = state.listItems[index].isComplete);
                }
            } else { //complete child
                const indexParent = state.listItems.findIndex(itemParent => itemParent.id === action.idParent);
                const index = state.listItems[indexParent].children.findIndex(item => item.id === action.id);
                let flag = false;
                state.listItems[indexParent].children[index].isComplete = !state.listItems[indexParent].children[index].isComplete;
                // co 1 phan tu chua complete
                if(state.listItems[indexParent].isComplete) {
                    const isFlag = (itemChild) => itemChild.isComplete === false;
                    flag = state.listItems[indexParent].children.some(isFlag);
                }
                if(flag) state.listItems[indexParent].isComplete = false
                
            }
            return {...state};
        case TOGGLE_TODO:
            debugger
            console.log('TOGGLE_TODO');
            state.listItems.map(item => {
                item.isComplete = true;
                item.children.length > 0 && item.children.map(itemChild => itemChild.isComplete = true);
            });
            return {...state};
        case STATUS_FILTER_BUTTON:
            debugger
            console.log('STATUS_FILTER_BUTTON');
            return state;
        case ADD_TODO_CHILD:
            debugger
            console.log('ADD_TODO_CHILD, id = ', action.idParent);
            const indexParent = state.listItems.findIndex(itemParent => itemParent.id === action.idParent);
            const newItem = {
                id: uuidv4(),
                title: action.text,
                isComplete: false, 
                isChildren: true
            }
            state.listItems[indexParent].children.push(newItem);
            return {...state};
        case SORT_TODO:
            let sta = state;
            debugger;
            return {...state};
        case CLEAR_COMPLETE:
            debugger
            const newListItems = state.listItems.filter(item => item.isComplete === false);
            state.listItems = newListItems;
            return {...state};
        default:
            debugger
            return state;
    }
} 