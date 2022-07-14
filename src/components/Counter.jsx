import React, {createContext, useContext, useReducer} from 'react'

// Acciones
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const miContexto = React.createContext(null);
// const miContexto = createContext(null);

const Points = () => {

    // const [state, setState] = useContext(miContexto);
    const state= useContext(miContexto);

    return(
        <div>
            Points: {state.count}
        </div>
    )
}

const Counter = () => {
    // Estado inicial para asociarlo a un reducer
    const initialState = {
        count: 0
    }

    // Reducer asociado a initialState
    const reducer = (state, action) => {
        switch (action.type) {
            case INCREMENT:
                return {
                    ...state,
                    // count: state.count++
                    count: state.count + action.payload.quantity
                }
            case DECREMENT:
                return {
                    ...state,
                    // count: state.count--
                    count: state.count - action.payload.quantity
                }
            case RESET:
                return {
                    ...state,
                    count: 0
                }               
            default:
                return state;
        }
    }
    // Asignar useReducer al estado, reducer y despachar acciones
    // const [state, dispatch] = useReducer(reducer, initialState, init);
    const [state, dispatch] = useReducer(reducer, initialState);
     

    return(
        <miContexto.Provider value={state}>
            <div>
                <Points/>
                {/* Points: {state.count} */}
                <button onClick={() => dispatch({
                    type: INCREMENT,
                    payload: {
                        quantity: 2
                    }
                })}>Incrementar</button>
                <button onClick={() => dispatch({
                    type: DECREMENT,
                    payload: {
                        quantity: 2
                    }
                })}>Decrementar</button>
                <button onClick={() => dispatch({
                    type: RESET,
                })}>Resetear</button>
            </div>
        </miContexto.Provider>
    )
}

export default Counter;