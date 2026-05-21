import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPage() {

  const navigate = useNavigate();// redirige despues del login

  const [nombre, setNombre] = useState("");// guarda informacion del input
  const [turno, setTurno] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!nombre || !turno) {

      Swal.fire({
        icon: "error",
        title: "Campos obligatorios",
        text: "Completa todos los campos"
      });

      return;
    }

    const host = {
      nombre,
      turno
    };

    localStorage.setItem("host", JSON.stringify(host));//simula la persistencia de sesion

    Swal.fire({
      icon: "success",
      title: "Bienvenido"
    });

    navigate("/panel");

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          TABLE TRACK
        </h1>

        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full border p-3 rounded mb-4"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded mb-4"
          value={turno}
          onChange={(e) => setTurno(e.target.value)}
        >

          <option value="">Seleccione turno</option>
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
          <option value="Noche">Noche</option>

        </select>

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Ingresar
        </button>

      </form>

    </div>

  );

}

export default LoginPage;