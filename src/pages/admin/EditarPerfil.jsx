import { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav";
import useAuth from "../../hooks/useAuth";
import Alerta from '../../components/Alerta';

function EditarPerfil() {
    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, email } = perfil;

        if([nombre, email].includes('')){
            setAlerta({msg: 'Nombre y Email son obligatorios', error: true});
            return;
        }

        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);
    };

    const { msg } = alerta;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl text-center mt-5 mb-10">
                Modifica tu {''} 
                <span className="text-indigo-600 font-bold">Información Aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white rouded-lg shadow p-5">
                    {msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="nombre" className="font-bold text-gray-600">Nombre:</label>
                            <input 
                                type="text"
                                name="nombre"
                                id="nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                                className="w-full border p-2 mt-5 rounded-lg bg-gray-50" />
                        </div>
                        
                        <div className="my-3">
                            <label htmlFor="web" className="font-bold text-gray-600">Web:</label>
                            <input 
                                type="text"
                                name="web"
                                id="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                                className="w-full border p-2 mt-5 rounded-lg bg-gray-50" />
                        </div>

                        <div className="my-3">
                            <label htmlFor="telefono" className="font-bold text-gray-600">Teléfono:</label>
                            <input 
                                type="text"
                                name="telefono"
                                id="telefono"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                                className="w-full border p-2 mt-5 rounded-lg bg-gray-50" />
                        </div>

                        <div className="my-3">
                            <label htmlFor="email" className="font-bold text-gray-600">Email:</label>
                            <input 
                                type="text"
                                name="email"
                                id="email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                                className="w-full border p-2 mt-5 rounded-lg bg-gray-50" />
                        </div>

                        <input 
                            type="submit" 
                            value="Guardar Cambios" 
                            className="uppercase w-full bg-indigo-700 hover:bg-indigo-800 font-bold text-white py-3 px-2 rounded-lg" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil;