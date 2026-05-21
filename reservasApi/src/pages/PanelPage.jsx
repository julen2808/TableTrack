import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import ReservationCard from "../components/ReservationCard";

import ReservationForm from "../components/ReservationForm";

import {
  getReservations,
  deleteReservation,
  updateReservation
} from "../services/ReservationsService";

function PanelPage() {

  const [reservas, setReservas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("Todas");

  useEffect(() => {

    const obtenerReservas = async () => {

      try {

        const data = await getReservations();

        setReservas(data);

      } catch (error) {

        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las reservas"
        });

      } finally {

        setLoading(false);

      }

    };

    obtenerReservas();

  }, []);

  const eliminarReserva = async (id) => {

    const result = await Swal.fire({
      title: "¿Estás seguro de cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    });

    if (result.isConfirmed) {

      await deleteReservation(id);

      Swal.fire({
        icon: "success",
        title: "Reserva eliminada"
      });

      window.location.reload();

    }

  };

  const finalizarReserva = async (reserva) => {

    await updateReservation(reserva.id, {
    estado: "Finalizada"
    });

    Swal.fire({
      icon: "success",
      title: "Reserva finalizada"
    });

    window.location.reload();

  };

  const reservasFiltradas = filter === "Todas"
    ? reservas
    : reservas.filter(
        reserva => reserva.estado === filter
      );

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

      <h1 className="text-4xl font-bold mb-6">
        Panel de Reservas
      </h1>

      {/* Formulario para crear reservas */}
        <ReservationForm />

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