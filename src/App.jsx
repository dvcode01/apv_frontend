import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import AdministrarPacientes from './pages/admin/AdministrarPacientes';
import EditarPerfil from './pages/admin/EditarPerfil';
import CambiarPassword from './pages/admin/CambiarPassword';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <PacientesProvider>
            <Routes>
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='olvide-password/:token' element={<NuevoPassword />} />
                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              </Route>

              <Route path='/admin' element={<AdminLayout />} >
                <Route index element={<AdministrarPacientes />} />
                <Route path='perfil' element={<EditarPerfil />} />
                <Route path='cambiar-password' element={<CambiarPassword />} />
              </Route>
            </Routes>
          </PacientesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
