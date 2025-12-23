import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { Link } from 'react-router-dom';

function NuevoPassword() {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({msg: 'Coloca tu nuevo password', error: false});
        setTokenValido(true);
      } catch (error) {
        setAlerta({msg: 'Hubo un error en el enlace', error: true});
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      setAlerta({msg: 'El Password debe ser mínimo de 6 caracteres', error: true});
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({msg: data.msg, error: false});
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true});
    }

  };

  const { msg } = alerta;

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-4xl">
            Reestablece tu Password y no pierdas Acceso a tus 
            <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>  
            <form onSubmit={handleSubmit} >
              
                <div className="my-5">
                  <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                  <input 
                      type="password"  
                      name='password'
                      id='password'
                      placeholder="Ej: 123456"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"   
                  />
                </div>
    
                <input 
                    type="submit" 
                    value="Guardar nuevo Password" 
                    className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
                />
            </form>
          </>         
        )}

        {passwordModificado && <Link to="/" className='block text-center my-5 text-gray-500'>Iniciar Sesión</Link>}
        
      </div>    
    </>
  )
}

export default NuevoPassword