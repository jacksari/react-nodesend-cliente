import React,{ useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import clienteAxios from "../config/axios";


function Dropzone() {

    const onDrop = useCallback(async (acceptedFiles) => {
        console.log('soltando archivo',acceptedFiles)

        //crear un form data
        const formData = new FormData()
        formData.append('archivo', acceptedFiles[0])

        const resp = await clienteAxios.post('/api/archivos', formData)
        console.log('res', resp)
    },[])


    //Extraer  contenido del dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop});


    const archivos = acceptedFiles.map((archivo,index) => (
        <li key={index} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{archivo.path}</p>
            <p className="text-sm text-gray-500">{(archivo.size/Math.pow(1024,2)).toFixed(3)} MB</p>
        </li>
    ))

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col justify-center items-center border-dashed border-gray-400 border-2 bg-gray-100">

            {acceptedFiles.length > 0 ? (
                <ul className="p-3">
                    {archivos}
                </ul>
            ): (
                <div {...getRootProps({ className: "dropzone w-full py-32" })}>
                    <input type="text" className="h-100" {...getInputProps()}/>
                    {
                        isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p>: (
                            <div className="text-center">
                                <p className="text-2xl text-center text-gray-600 ">Selecciona un archivo y arrastralo aquí</p>
                                <button className="mx-10 px-5 bg-blue-700 py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">Selecciona archivos para subir</button>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default Dropzone;
