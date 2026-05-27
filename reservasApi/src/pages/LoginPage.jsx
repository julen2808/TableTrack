import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

function LoginPage() {

  // Navegación entre páginas
  const navigate = useNavigate();

  // Estado nombre
  const [nombre, setNombre] = useState("");

  // Estado turno
  const [turno, setTurno] = useState("");

  // Maneja login
  const handleLogin = (e) => {

    e.preventDefault();

    // Validación campos
    if (!nombre || !turno) {

      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar toda la información"
      });

      return;

    }

    // Datos host
    const host = {
      nombre,
      turno
    };

    // Guarda sesión
    localStorage.setItem(
      "host",
      JSON.stringify(host)
    );

    // Alerta éxito
    Swal.fire({
      icon: "success",
      title: `Bienvenido ${nombre}`
    });

    // Navega panel
    navigate("/panel");

  };

  return (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-700 p-4">

    {/* Título */}
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold text-white tracking-wide">
        TABLE TRACK
      </h1>
      <p className="text-gray-400 mt-2 text-sm">
        Gestor de Reservas
      </p>
    </div>

    {/* Card Login */}
    <form
      onSubmit={handleLogin}
      className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl rounded-[32px] px-10 py-12 w-full max-w-md text-white flex flex-col gap-6"
    >
      <p className="text-gray-300 text-lg text-center leading-relaxed">
        Sistema moderno para gestión de reservas y atención de mesas
      </p>

      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-4 rounded-2xl bg-white/15 border border-white/10 placeholder-gray-300 outline-none text-lg focus:ring-2 focus:ring-white transition"
      />

      <select
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
        className="w-full p-4 rounded-2xl bg-white/15 border border-white/10 outline-none text-lg text-white"
      >
        <option value="" className="text-black">Seleccione turno</option>
        <option value="Mañana" className="text-black">Mañana</option>
        <option value="Tarde" className="text-black">Tarde</option>
        <option value="Noche" className="text-black">Noche</option>
      </select>

      <button className="w-full bg-white text-black font-semibold py-4 rounded-2xl text-lg hover:scale-[1.02] hover:bg-gray-200 transition duration-300 shadow-xl">
        Ingresar al Panel
      </button>
    </form>

  </div>

  );

}

export default LoginPage;