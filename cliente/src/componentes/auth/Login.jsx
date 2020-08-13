import React, {useState} from 'react'

import { Link } from 'react-router-dom'

const Login = () => {


    // State para iniciar sesion

    const [usuario, guardarUsuario] = useState({
        email: "",
        password: ""
    });

    const {email, password} = usuario;

    const onChange= e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value

        })
    }

    // CUando el usuario quiere iniciar sesion

    const onSubmit = e => {
        e.preventDefault()

        // Validar que no haya campos vacion

        // Pasarlo al action

    }


    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                            />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                            />
                    </div>

                    <div className="campo-form">
                        <button 
                            type="sumbit" 
                            className="btn btn-primario btn-block" 
                        >Iniciar Sesion</button>

                      
                    </div>
                </form>

                <Link to={'/nueva-cuenta'}  className="enlace-cuenta">Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;