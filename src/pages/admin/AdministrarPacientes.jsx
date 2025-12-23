import { useState } from "react";
import Formulario from "../../components/Formulario";
import ListadoPacientes from "../../components/ListadoPacientes"

function AdministrarPacientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button 
        type="button"
        onClick={() => setMostrarFormulario(!mostrarFormulario)} 
        className={`font-bold text-white mx-10 bg-indigo-600 p-3 uppercase rounded-md cursor-pointer mb-5 md:hidden`}>
        {mostrarFormulario ? 'Ocultar' : 'Mostrar'} Formulario
      </button>

      <div className={`${mostrarFormulario ? 'block': 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes