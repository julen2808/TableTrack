import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import ReservationCard from "../components/ReservationCard";

import ReservationForm from "../components/ReservationForm";

import {
  getReservations,
  deleteReservation,
  updateReservation
} from "../services/ReservationsService";

function PanelPage() {

  // Permite navegar entre rutas
  const navigate = useNavigate();

  // Guarda todas las reservas
  const [reservas, setReservas] = useState([]);

  // Controla estado de carga
  const [loading, setLoading] = useState(true);

  // Guarda filtro actual
  const [filter, setFilter] = useState("Todas");

  // Obtiene reservas al cargar la página
  useEffect(() => {

    const obtenerReservas = async () => {

      try {

        // GET a MockAPI
        const data = await getReservations();

        // Guarda reservas en estado
        setReservas(data);

      } catch (error) {

        console.log(error);

        // Alerta si falla API
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las reservas"
        });

      } finally {

        // Finaliza loading
        setLoading(false);

      }

    };

    obtenerReservas();

  }, []);

  // Elimina sesión y vuelve al login
  const cerrarSesion = () => {

    localStorage.removeItem("host");

    navigate("/login");

  };

  // Elimina reserva
  const eliminarReserva = async (id) => {

    const result = await Swal.fire({
      title: "¿Estás seguro de cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    });

    // Si usuario confirma
    if (result.isConfirmed) {

      // DELETE a MockAPI
      await deleteReservation(id);

      Swal.fire({
        icon: "success",
        title: "Reserva eliminada"
      });

      // Recarga reservas
      window.location.reload();

    }

  };

  // Cambia estado a finalizada
  const finalizarReserva = async (reserva) => {

    // PATCH a MockAPI
    await updateReservation(reserva.id, {
      estado: "Finalizada"
    });

    Swal.fire({
      icon: "success",
      title: "Reserva finalizada"
    });

    // Recarga reservas
    window.location.reload();

  };

  // Filtra reservas según estado
  const reservasFiltradas = filter === "Todas"
    ? reservas
    : reservas.filter(
        reserva => reserva.estado === filter
      );

  // Loader mientras llegan datos
  if (loading) {

    return (

      <div className="flex justify-center mt-20">

        <h1 className="text-3xl">
          Cargando reservas...
        </h1>

      </div>

    );

  }

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Botón cerrar sesión */}
      <div className="flex justify-end mb-4">

        <button
          onClick={cerrarSesion}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>

      </div>

      {/* Título principal */}
      <h1 className="text-4xl font-bold mb-6">
        Panel de Reservas
      </h1>

      {/* Formulario creación reservas */}
      <ReservationForm />

      {/* Botones filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">

        <button
          onClick={() => setFilter("Todas")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Todas
        </button>

        <button
          onClick={() => setFilter("Confirmada")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Confirmadas
        </button>

        <button
          onClick={() => setFilter("En Espera")}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          En Espera
        </button>

        <button
          onClick={() => setFilter("Finalizada")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Finalizadas
        </button>

      </div>

      {/* Grid tarjetas reservas */}
      <div className="grid md:grid-cols-3 gap-4">

        {reservasFiltradas.map((reserva) => (

          <ReservationCard
            key={reserva.id}
            reserva={reserva}
            onDelete={eliminarReserva}
            onFinalize={finalizarReserva}
          />

        ))}

      </div>

    </div>

  );

}

export default PanelPage;