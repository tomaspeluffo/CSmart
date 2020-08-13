import React from 'react'

const Barra = () => {
    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>Tomas</span></p>

            <nav className="nav-principal">
                <a href="!#">Cerrar Sesion</a>
            </nav>
        </header>
     );
}
 
export default Barra;