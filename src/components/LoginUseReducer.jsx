import { useReducer } from "react";

// Acciones
const FIELD = 'FIELD';
const LOGIN = 'LOGIN';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const LOGOUT = 'LOGOUT';

// Estado inicial 
const initialState = {
    username: '',
    password: '',
    error: '',
    isLoading: false,
    isLoggedIn: false,
}


// Reducer
const loginReducer = (state, action) => {
    switch (action.type) {
        case FIELD:
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case LOGIN:
            return {
                ...state,
                error: '',
                isLoading: true,
                isLoggedIn: false,
                
            }
        case SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                isLoggedIn: true,
            }
        case ERROR:
            return {
                ...state,
                error: 'Usuario o contraseña invalido',
                isLoading: false,
                isLoggedIn: false,
                username: '',
                password: ''
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            }
        default:
            return state;
    }
}


const LoginUseReducer = () => {
    // Crear el useReducer
    const [state, dispatch] = useReducer(loginReducer, initialState);
    
    // Obtener variables desde el estado
    const { username, password, error, isLoading, isLoggedIn} = state;

    // Funcion que se ejecutara en el submit del formulario
    const submit = async (e) => {
        e.preventDefault();
        // Despachamos accion LOGIN
        dispatch({type: LOGIN});
        try {
            await function login({username, password}) {
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (username === 'admin' && password === 'admin') {
                            resolve();
                        } else {
                            reject();
                        }
                    }, 3000);
                })
            };
            // LOGIN exitoso, se despacha la accion SUCCESS
            dispatch({type: SUCCESS});
        } catch (error) {
            // LOGIN fallado, se despacha la accion ERROR
            dispatch({type: ERROR})
        }   
    }

    const logout = () => {
        dispatch({type: LOGOUT})
    }
    return(
        <div className="App">
            <div>
                { isLoggedIn ? 
                    <div>
                        <h1>Bienvenido {username}</h1>
                        <button onClick={logout }>Cerrar Sesión</button>
                    </div>
                    : <form onSubmit={submit}>
                        { error && <p style={{color: 'tomato'}}>{error}</p>}
                        <input 
                            type="text" 
                            placeholder="Usuario" 
                            value={username} 
                            onChange={(e) => 
                                dispatch({
                                    type: FIELD,
                                    fieldName: 'username',
                                    payload: e.currentTarget.value
                                })
                            } 
                        />
                        <input 
                            type="text" 
                            placeholder="Contraseña" 
                            value={password} 
                            onChange={(e) => 
                                dispatch({
                                    type: FIELD,
                                    fieldName: 'password',
                                    payload: e.currentTarget.value
                                })
                            } 
                        />
                        <button type="submit">{ isLoading ? 'Cargando..' : 'Login'}</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default LoginUseReducer;