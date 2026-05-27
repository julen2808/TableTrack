import { useNavigate } from "react-router-dom";

function Navbar() {

  // Obtiene información del host desde localStorage
  const host = JSON.parse(localStorage.getItem("host"));

  // Permite navegar entre rutas
  const navigate = useNavigate();

  // Cierra sesión
  const cerrarSesion = () => {

    localStorage.removeItem("host");

    navigate("/login");

  };

  return (

    <nav className="bg-black text-white p-4 rounded-xl shadow-lg mb-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Logo/Título */}
        <div>

          <h1 className="text-3xl font-bold">
            TABLE TRACK
          </h1>

          <p className="text-gray-300 text-sm">
            Sistema de gestión de reservas
          </p>

        </div>

        {/* Información host */}
        <div className="flex items-center gap-4">

          <div className="text-right">

            <p className="font-semibold">
              {host?.nombre}
            </p>

            <p className="text-sm text-gray-300">
              Turno: {host?.turno}
            </p>

          </div>

          {/* Botón logout */}
          <button
            onClick={cerrarSesion}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Salir
          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;

