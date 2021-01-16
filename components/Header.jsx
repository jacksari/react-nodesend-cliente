import React, {useContext} from 'react';
import Link from 'next/link'
import authContext from "../context/auth/authContext";

function Header() {
    const AuthContext = useContext(authContext)
    const { autenticado, usuario, cerrarSesion } = AuthContext
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <a>
                    <img src="logo.svg" className="w-64 mb-8 md:mb-0"/>
                </a>
            </Link>
            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                            <p className="mr-2">Hola: {usuario.nombre}</p>
                            <button type="button" className="bg-red-400 px-5 py-3 rounded-lg text-white hover:bg-red-500 transition duration-300 font-bold uppercase mr-2" onClick={cerrarSesion}>Cerrar Sesión</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-400 px-5 py-3 rounded-lg text-white hover:bg-red-500 transition duration-300 font-bold uppercase mr-2">Iniciar Sesión</a>
                            </Link>
                            <Link href="/register">
                                <a className="bg-gray-600 px-5 py-3 rounded-lg text-white hover:bg-black transition duration-300 font-bold uppercase">Crear Cuenta</a>
                            </Link>
                        </>
                    )
                }

            </div>
        </header>
    );
}

export default Header;
