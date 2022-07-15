import { useContext } from "react";
import { COMPLETED, REMOVE, SET_VISIBILITY_FILTER, todosContext } from "../container/TodoListContainer";

const TodoList = ({todos}) => {
    const [state, dispatch] = useContext(todosContext);

    const activeButton = {
        backgroundColor: 'blue', 
        color: 'whitesmoke', 
        border: '1px solid white', 
        borderRadius: '5px', 
        padding: '5px 10px'
    }

    return(
        <div>
            <h3>Lista de tareas:</h3>
            <div>
                <button onClick={() => dispatch({
                    type: SET_VISIBILITY_FILTER,
                    payload: {
                        filter: 'SHOW_ALL'
                    }
                })}
                style={ state.filter === 'SHOW_ALL' ? activeButton : null}
                >Todas</button>
                <button onClick={() => dispatch({
                    type: SET_VISIBILITY_FILTER,
                    payload: {
                        filter: 'SHOW_ACTIVE'
                    }
                })}
                style={ state.filter === 'SHOW_ACTIVE' ? activeButton : null}
                >Activas</button>
                <button onClick={() => dispatch({
                    type: SET_VISIBILITY_FILTER,
                    payload: {
                        filter: 'SHOW_COMPLETED'
                    }
                })}
                style={ state.filter === 'SHOW_COMPLETED' ? activeButton : null}
                >Completadas</button>
            </div>
            <ul>
                {
                    todos.map((todo) => 
                        <li 
                            key={todo.id}
                            style={ todo.isCompleted ? { color: 'green', textDecoration: 'line-through', cursor: 'pointer'} : {cursor: 'pointer'}}
                            onClick={() => dispatch({
                                type: COMPLETED,
                                payload: {
                                    id: todo.id
                                }
                            })}
                        >
                            {todo.id} - {todo.text}
                            <button 
                                style={{marginLeft: '20px'}}
                                onClick={() => dispatch({
                                    type: REMOVE,
                                    payload: {
                                        id: todo.id
                                    }
                                })}>Borrar</button>
                        </li>
                    )
                }
                
            </ul>
        </div>
    )
}

export default TodoList;