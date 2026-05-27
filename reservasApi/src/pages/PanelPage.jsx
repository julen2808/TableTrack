import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import Navbar from "../components/Navbar";

import ReservationCard from "../components/ReservationCard";
import Loader from "../components/Loader";
import ReservationForm from "../components/ReservationForm";

import {
  getReservations,
  deleteReservation,
  updateReservation
} from "../services/ReservationsService";

function PanelPage() {

  // Guarda todas las reservas
  const [reservas, setReservas] = useState([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado filtro
  const [filter, setFilter] = useState("Todas");

  // Obtiene reservas desde MockAPI
  const obtenerReservas = async () => {

    try {

      // GET reservas
      const data = await getReservations();

      // Guarda reservas en estado
      setReservas(data);

    } catch (error) {

      console.log(error);

      // Alerta error API
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

  // Ejecuta petición al cargar página
  useEffect(() => {

    obtenerReservas();

  }, []);

  // Elimina reserva
  const eliminarReserva = async (id) => {

    const result = await Swal.fire({
      title: "¿Estás seguro de cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    });

    // Si confirma eliminación
    if (result.isConfirmed) {

      // DELETE MockAPI
      await deleteReservation(id);

      // Actualiza estado local sin recargar página
      setReservas(

        reservas.filter(
          reserva => reserva.id !== id
        )

      );

      Swal.fire({
        icon: "success",
        title: "Reserva eliminada"
      });

    }

  };

  // Cambia estado a finalizada
  const finalizarReserva = async (reserva) => {

  // Datos actualizados
  const reservaActualizada = await updateReservation(
    reserva.id,
    {
      ...reserva,
      estado: "Finalizada"
    }
  );

  // Actualiza estado local inmediatamente
  setReservas((prevReservas) =>

    prevReservas.map((item) =>

      item.id === reserva.id
        ? reservaActualizada
        : item

    )

  );

  Swal.fire({
    icon: "success",
    title: "Reserva finalizada"
  });

};

  // Filtrado local
  const reservasFiltradas = filter === "Todas"
    ? reservas
    : reservas.filter(
        reserva => reserva.estado === filter
      );

  // Loader mientras llegan datos
  if (loading) {

  return <Loader />;

}

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Navbar superior */}
      <Navbar />

      {/* Título */}
      <h1 className="text-4xl font-bold mb-6">
        Panel de Reservas
      </h1>

      {/* Formulario reservas */}
      <ReservationForm />

      {/* Botones filtros */}
      <div className="flex flex-wrap gap-4 mb-6">

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

      {/* Grid reservas */}
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