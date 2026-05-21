import { useState } from "react";

import Swal from "sweetalert2";

import { createReservation } from "../services/ReservationsService";

function ReservationForm() {

  // Estado del formulario
  // Guarda todos los datos escritos por el usuario
  const [formData, setFormData] = useState({
    nombreCliente: "",
    fechaHora: "",
    cantidadPersonas: "",
    estado: "En Espera"
  });

  // Maneja cambios en inputs
  // Cada vez que el usuario escribe, actualiza el estado
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Maneja envío del formulario
  const handleSubmit = async (e) => {

    // Evita recarga automática de la página
    e.preventDefault();

    // Validación básica
    // Si campos están vacíos muestra alerta
    if (
      !formData.nombreCliente ||
      !formData.fechaHora ||
      !formData.cantidadPersonas
    ) {

      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar todos los campos"
      });

      return;

    }

    try {

      // Petición POST a MockAPI
      await createReservation(formData);

      // Alerta éxito
      Swal.fire({
        icon: "success",
        title: "Reserva creada correctamente"
      });

      // Limpia formulario después de guardar
      setFormData({
        nombreCliente: "",
        fechaHora: "",
        cantidadPersonas: "",
        estado: "En Espera"
      });

      // Recarga página para actualizar reservas
      window.location.reload();

    } catch (error) {

      console.log(error);

      // Alerta error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la reserva"
      });

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-8"
    >

      <h2 className="text-2xl font-bold mb-4">
        Nueva Reserva
      </h2>

      <div className="grid gap-4">

        {/* Input nombre cliente */}
        <input
          type="text"
          name="nombreCliente"
          placeholder="Nombre del cliente"
          value={formData.nombreCliente}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* Input fecha y hora */}
        <input
          type="datetime-local"
          name="fechaHora"
          value={formData.fechaHora}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* Input cantidad personas */}
        <input
          type="number"
          name="cantidadPersonas"
          placeholder="Cantidad de personas"
          value={formData.cantidadPersonas}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        {/* Select estado */}
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="border p-3 rounded"
        >

          <option value="En Espera">
            En Espera
          </option>

          <option value="Confirmada">
            Confirmada
          </option>

          <option value="Finalizada">
            Finalizada
          </option>

        </select>

        {/* Botón guardar */}
        <button
          type="submit"
          className="bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Guardar Reserva
        </button>

      </div>

    </form>

  );

}

export default ReservationForm;