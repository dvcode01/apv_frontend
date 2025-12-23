import { Link } from "react-router-dom"

function AdminNav() {
  return (
    <nav className="flex gap-2">
        <Link to={'/admin/perfil'} className="uppercase text-gray-500 hover:text-indigo-600 font-bold">Perfil</Link>
        <Link to={'/admin/cambiar-password'} className="uppercase text-gray-500 hover:text-indigo-600 font-bold">Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav