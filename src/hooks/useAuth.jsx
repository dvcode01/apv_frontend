import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Aquí accedemos / extraemos a los datos almacenados globalmente
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;


