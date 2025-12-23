import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta';

function Login() {
    const { setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password});
            localStorage.setItem('token', data.token);

            setAuth(data);
            navigate('/admin');
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true});
        }
    };

    const { msg } = alerta;

    return ( 
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-4xl">
                    Inicia Sesión y Administra tus 
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            placeholder="Ej: jose@correo.com"
                            onChange={e => setEmail(e.target.value)}
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"   
                        />
                    </div>

                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input 
                            type="password"  
                            value={password}
                            placeholder="Ej: 123456"
                            onChange={e => setPassword(e.target.value)}
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"   
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Iniciar Sesión" 
                        className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Registrate</Link>
                    <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
                </nav>
            </div>
        </>
     );
}

export default Login;