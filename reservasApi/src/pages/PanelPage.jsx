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

    if (result.isConfirmed) {

      await deleteReservation(id);

      // Actualiza estado local
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

  // Finaliza reserva
  const finalizarReserva = async (reserva) => {

    const reservaActualizada = await updateReservation(
      reserva.id,
      {
        ...reserva,
        estado: "Finalizada"
      }
    );

    // Actualiza UI sin refrescar
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

  // Filtrado
  const reservasFiltradas = filter === "Todas"
    ? reservas
    : reservas.filter(
        reserva => reserva.estado === filter
      );

  // Loader
  if (loading) {

    return <Loader />;

  }

return (
  <div className="min-h-screen bg-gradient-to-br from-black via-[#041238] to-[#1E293B] text-white">

    {/* Navbar fuera del contenedor */}
    <Navbar />

    {/* Contenedor principal */}
    <div className="max-w-5xl mx-auto px-6">

      {/* Encabezado */}
      <div className="pt-16 pb-16">
        <h1 className="text-5xl font-black tracking-tight mb-4">
          Panel de Reservas
        </h1>
        <p className="text-gray-300 text-base max-w-2xl leading-relaxed">
          Gestiona reservas, confirma clientes y organiza mesas fácilmente.
        </p>
      </div>

      {/* Formulario */}
      <div className="pb-16">
        <ReservationForm />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 pb-12">
        <button onClick={() => setFilter("Todas")} className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition font-semibold shadow-lg">Todas</button>
        <button onClick={() => setFilter("Confirmada")} className="px-6 py-3 rounded-2xl bg-blue-500/20 border border-blue-400/20 hover:bg-blue-500/30 transition font-semibold shadow-lg">Confirmadas</button>
        <button onClick={() => setFilter("En Espera")} className="px-6 py-3 rounded-2xl bg-yellow-500/20 border border-yellow-400/20 hover:bg-yellow-500/30 transition font-semibold shadow-lg">En Espera</button>
        <button onClick={() => setFilter("Finalizada")} className="px-6 py-3 rounded-2xl bg-green-500/20 border border-green-400/20 hover:bg-green-500/30 transition font-semibold shadow-lg">Finalizadas</button>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 pb-10">
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
  </div>

  );

}

export default PanelPage;