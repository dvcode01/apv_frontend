import { useState } from "react";
import AdminNav from "../../components/AdminNav";
import Alerta from '../../components/Alerta';
import useAuth from "../../hooks/useAuth";

function CambiarPassword() {
  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(Object.values(password).some(campo => campo === '')){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    if(password.pwd_nuevo.length < 6){
      setAlerta({msg: 'El nuevo password debe tener mínimo 6 caracteres', error: true});
      return;
    }

    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl text-center mt-5 mb-10">
        Modifica tu {''} 
        <span className="text-indigo-600 font-bold">Password Aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white rouded-lg shadow p-5">
            {msg && <Alerta alerta={alerta} />}

            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="pwd_actual" className="font-bold text-gray-600">Password Actual:</label>
                    <input 
                        type="password"
                        name="pwd_actual"
                        id="pwd_actual"
                        value={password.pwd_actual || ''}
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                        })}
                        placeholder="Ej: 1234567"
                        className="w-full border p-2 mt-5 rounded-lg bg-gray-50" />
                </div>

                <div className="my-3">
                    <label htmlFor="pwd_nuevo" className="font-bold text-gray-600">Password Nuevo:</label>
                    <input 
                        type="password"
                        name="pwd_nuevo"
                        id="pwd_nuevo"
                        value={password.pwd_nuevo || ''}
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                        })}
                        placeholder="Ej: 12345678"
                        className="w-full border p-2 mt-5 rounded-lg bg-gray-50" />
                </div>

                <input 
                  type="submit" 
                  value="Guardar Password" 
                  className="uppercase w-full bg-indigo-700 hover:bg-indigo-800 font-bold text-white py-3 px-2 rounded-lg" 
                />
            </form>
        </div>
      </div>


    </>
  )
}

export default CambiarPassword;