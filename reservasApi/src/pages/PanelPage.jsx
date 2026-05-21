import { useNavigate } from "react-router-dom";

function PanelPage() {

  const navigate = useNavigate();

  const host = JSON.parse(localStorage.getItem("host"));

  const cerrarSesion = () => {

    localStorage.removeItem("host");

    navigate("/login");

  };

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Panel de Reservas
          </h1>

          <p>
            Host: {host.nombre}
          </p>

          <p>
            Turno: {host.turno}
          </p>

        </div>

        <button
          onClick={cerrarSesion}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>

      </div>

    </div>

  );

}

export default PanelPage;