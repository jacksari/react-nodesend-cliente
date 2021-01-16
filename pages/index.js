import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import React,{useContext,useEffect} from 'react'
import Link from 'next/link'
import Dropzone from "../components/Dropzone";

export default function Home() {
    //Extrar el usuario autenticado del storage
    const AuthContext = useContext(authContext)
    const { usuarioAutenticado } = AuthContext
    useEffect(() => {
        usuarioAutenticado()
    }, []);


  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                <Dropzone/>
                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                    <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
                    <p className="text-lg leading-loose my-2">
                        <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus  cosas no esten en línea para siempre.
                    </p>
                    <Link href="/register" className="pt-4 ">
                        <a className="bg-red-500 rounded-lg text-white px-3 py-2 text-bold text-lg hover:bg-red-700">Iniciar para más beneficios</a>
                    </Link>
                </div>
            </div>
      </div>
    </Layout>
  )
}
