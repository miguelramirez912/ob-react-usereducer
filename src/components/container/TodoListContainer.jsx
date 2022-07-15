import { createContext, useContext, useReducer } from "react";
import TodoForm from "../pure/TodoForm";
import TodoList from "../pure/TodoList";

// Tipos de Acciones
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const FILTER = 'FILTER';
export const COMPLETED = 'COMPLETED';
export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_ACTIVE = 'SHOW_ACTIVE';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';


// Estado inicial
const initialState = {
    todoList: [
        {id: 1, text: 'Tarea de Prueba 1', isCompleted: false},
        {id: 2, text: 'Tarea de Prueba 2', isCompleted: true},
        {id: 3, text: 'Tarea de Prueba 3', isCompleted: false},
        
    ],
    filter: 'SHOW_ALL',
    nextId: 3
}


// Crear Contexto
export const todosContext = createContext([]);

// Reducer
const todosReducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                todoList: [...state.todoList, 
                    {
                        id: action.payload.id,
                        text: action.payload.text, 
                        isCompleted: false
                    }
                    ]
            }
        case REMOVE:
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload.id)
            }
        case COMPLETED:
            const indexTodo = action.payload.id
            return { 
                ...state, 
                todoList: state.todoList.map(
                    (todo) => todo.id === indexTodo ? {...todo, isCompleted: !todo.isCompleted}
                                            : todo
                )
             }
        case SET_VISIBILITY_FILTER: 
            return{
                ...state,
                filter: action.payload.filter
            }
        default:
            return state;
    }
}

// Acciones
const filterTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(todo => todo.isCompleted === false);
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.isCompleted === true);;
        default:
            return todos;
    }
}


//Componente

const TodoListContainer = () => {

    const globalState = useReducer(todosReducer, initialState);

    return(
        <todosContext.Provider value={globalState}>
            <TodoList todos={filterTodos(globalState[0].todoList, globalState[0].filter)}/>
            <TodoForm/>
        </todosContext.Provider>
    )
}

export default TodoListContainer;

