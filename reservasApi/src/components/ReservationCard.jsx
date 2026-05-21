function ReservationCard({

  reserva,
  onDelete,
  onFinalize

}) {

  return (

    <div className="bg-white shadow-lg rounded-xl p-4">

      <h2 className="text-2xl font-bold mb-2">
        {reserva.nombreCliente}
      </h2>

      <p>
        Fecha: {reserva.fechaHora}
      </p>

      <p>
        Personas: {reserva.cantidadPersonas}
      </p>

      <p>
        Estado: {reserva.estado}
      </p>

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => onFinalize(reserva)}
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          Finalizar
        </button>

        <button
          onClick={() => onDelete(reserva.id)}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Eliminar
        </button>

      </div>

    </div>

  );

}

export default ReservationCard;