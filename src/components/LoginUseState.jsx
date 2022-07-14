import { useState } from "react";

const LoginUseState = () => {

    //Estado del componente
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedin, setIsLoggedIn] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
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
            setIsLoggedIn(true);
            setLoading(false)
        } catch (error) {
            setError(`El usuario con contraseña no son validos: ${error}`);
            setLoading(false);
            setUsername('');
            setPassword('');
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
        setLoading(false);
        setUsername('');
        setPassword('');
    }

    return(
        <div className="App">
            <div>
                { isLoggedin ? 
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
                            onChange={(e) => setUsername(e.currentTarget.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Contraseña" 
                            value={password} 
                            onChange={(e) => setPassword(e.currentTarget.value)} 
                        />
                        <button type="submit">{ isLoading ? 'Cargando..' : 'Login'}</button>
                    </form>
                }
            </div>

        </div>
    )
}

export default LoginUseState;