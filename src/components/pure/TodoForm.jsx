import { useContext, useRef } from 'react';
import { todosContext, ADD, SHOW_ALL } from '../container/TodoListContainer';


const TodoForm = () => {
    const [state, dispatch] = useContext(todosContext);
    const todoRef = useRef(null);
    

    return(
        <div>
            <h3>Formulario</h3>
            <p>Agrega una tarea:</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                state.nextId++
                dispatch({
                    type: ADD,
                    payload: {
                        id: state.nextId,
                        text: todoRef.current.value,
                    }
                })
                dispatch({type: SHOW_ALL})
                todoRef.current.value = '';
            }
            }>
                <input ref={todoRef} type="text" placeholder='Ingresa la Tarea'/>
                <button type='submit'>Agregar</button>
            </form>
        </div>
    )
}

export default TodoForm;