import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types';

const Reducer = (state,action) => {
    switch (action.type){
        case REGISTRO_ERROR:
        case REGISTRO_EXITOSO:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token',action.payload)
            return {
                ...state,
                token: action.payload,
                mensaje: 'Login exitoso',
                autenticado: true
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: null,

            }
        default:
            return state;
    }
}

export default Reducer
