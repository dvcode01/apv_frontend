import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

function Registrar() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Los passwords son diferentes', error: true});
      return;
    }

    if(password.length < 6){
      setAlerta({msg: 'El password es muy corto, agrega mínimo 6 caracteres', error: true});
      return;
    }

    setAlerta({});
    
    // Crear usuario en la API
    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password});

      setAlerta({msg: 'Creado correctamente, revisa tu email', error: false});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-4xl">
            Crea tu Cuenta y Administra tus 
            <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">
        {msg && <Alerta alerta={alerta} />}

        <form action="" onSubmit={handleSubmit}>
           <div className="my-5">
                <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                <input 
                    type="text" 
                    name='nombre' 
                    id='nombre'
                    value={nombre}
                    placeholder="Ej: Jose"
                    onChange={e => setNombre(e.target.value)}
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"   
                />
            </div>

            <div className="my-5">
                <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input 
                    type="email"  
                    name='email'
                    id='email'
                    placeholder="Ej: jose@correo.com"
                    onChange={e => setEmail(e.target.value)}
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"   
                />
            </div>

            <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input 
                  type="password"  
                  name='password'
                  id='password'
                  placeholder="Ej: 123456"
                  onChange={e => setPassword(e.target.value)}
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"   
              />
            </div>

            <div className="my-5">
              <label htmlFor="repetir" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
              <input 
                  type="password"
                  name='repetir'
                  id='repetir'  
                  placeholder="Repite tu password"
                  onChange={e => setRepetirPassword(e.target.value)}
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"   
              />
            </div>

            <input 
                type="submit" 
                value="Crear Cuenta" 
                className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
            />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
            <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
            <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar