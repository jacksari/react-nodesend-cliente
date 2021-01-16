import authContext from "./authContext";
import React,{ useReducer } from 'react'
import authReducer from "./authReducer";
import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types';
import clienteAxios from '../../config/axios'
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({children}) => {
    //Definir State inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token'): '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Definir el reducer
    const [state,dispatch] = useReducer(authReducer,initialState)

    //Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try{
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        }catch (e){
            dispatch({
                type: REGISTRO_ERROR,
                payload: e.response.data.msg
            })
            //console.log(e.response.data.msg)
        }
        //Limpiar la alerta despues de 3 seg
        setTimeout(()=>{
            dispatch({
                type: LIMMPIAR_ALERTA,
            })
        },3000)
    }
    //Autenticar usuarios
    const iniciarSesion = async datos => {
        try{
            const resp = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: resp.data.token
            })
        }catch (e){
            dispatch({
                type: LOGIN_ERROR,
                payload: e.response.data.msg
            })
        }
        setTimeout(()=>{
            dispatch({
                type: LIMMPIAR_ALERTA,
            })
        },3000)
    }
    //Retornar usuario autenticado en base al jwt
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if(token){
            tokenAuth(token)
        }
        try{
            const resp = await clienteAxios.get('/api/auth')
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: resp.data.usuario
            })
        }catch (e) {
            dispatch({
                type: LOGIN_ERROR,
                payload: e.response.data.msg
            })
        }
    }
    //Cerrar sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;
