function ReservationCard({

  reserva,
  onDelete,
  onFinalize

}) {

  return (

    <div
      className="
        bg-white/10
        backdrop-blur-md
        border border-white/10
        rounded-3xl
        p-6
        shadow-2xl
        text-white
      "
    >

      <h2 className="text-2xl font-medium mb-5">
        {reserva.nombreCliente}
      </h2>

      <div className="space-y-3 text-lg text-gray-200">

        <p>
          Fecha: {reserva.fechaHora}
        </p>

        <p>
          Personas: {reserva.cantidadPersonas}
        </p>

        <p>
          Estado: {reserva.estado}
        </p>

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => onFinalize(reserva)}
          className="
            bg-green-500
            hover:bg-green-600
            px-5
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Finalizar
        </button>

        <button
          onClick={() => onDelete(reserva.id)}
          className="
            bg-red-500
            hover:bg-red-600
            px-5
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Eliminar
        </button>

      </div>

    </div>

  );

}

export default ReservationCard;