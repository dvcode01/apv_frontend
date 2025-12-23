import { useState, useEffect } from "react";
import Alerta from '../components/Alerta';
import usePacientes from '../hooks/usePacientes';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});
  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(paciente?.nombre){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }


  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validar formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    guardarPaciente({nombre, propietario, email, fecha, sintomas, id});
    setAlerta({msg: 'Guardado Correctamente', error: false});

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId(null);

  }; 

  const { msg } = alerta;

  return (
    <>
      <h2 className="text-3xl font-black text-center">Administrador de Pacientes</h2>

      <p className="text-xl mb-10 mt-5 text-center">
        Añade tus Pacientes y {''}
        <span className="font-bold text-indigo-600">Administralos</span>
      </p>

      { msg && <Alerta alerta={alerta} />}
      
      <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md" onSubmit={handleSubmit}>
        
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input 
            type="text" 
            id="nombre" 
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md" 
            placeholder="Ej: Billy" 
            value={nombre}
            onChange={e => setNombre(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre propietario</label>
          <input 
            type="text" 
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md" 
            id="propietario" 
            placeholder="Ej: Jonathan"
            value={propietario}
            onChange={e => setPropietario(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email propietario</label>
          <input 
            type="email" 
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md" 
            id="email" 
            placeholder="Ej: john@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
          <input 
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md" 
            id="fecha"
            value={fecha}
            onChange={e => setFecha(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas paciente</label>

          <textarea 
            name="sintomas" 
            id="sintomas" 
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"></textarea>
        </div>

        <input 
          type="submit" 
          value={id ? "Guardar Cambios" : "Agregar Paciente" }
          className="bg-indigo-600 text-white w-full p-3 uppercase font-bold hover:bg-indigo-800 cursor-pointer rounded-md transition-colors" />
      </form>
    </>
  )
}

export default Formulario