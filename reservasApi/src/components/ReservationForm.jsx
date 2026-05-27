import { useState } from "react";

import Swal from "sweetalert2";

import { createReservation } from "../services/ReservationsService";

function ReservationForm() {

  const [formData, setFormData] = useState({
    nombreCliente: "",
    fechaHora: "",
    cantidadPersonas: "",
    estado: "En Espera"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

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

      await createReservation(formData);

      Swal.fire({
        icon: "success",
        title: "Reserva creada correctamente"
      });

      setFormData({
        nombreCliente: "",
        fechaHora: "",
        cantidadPersonas: "",
        estado: "En Espera"
      });

      window.location.reload();

    } catch (error) {

      console.log(error);

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
      className="
        w-full
        max-w-5xl
        mx-auto
        bg-white/10
        backdrop-blur-md
        border border-white/10
        rounded-3xl
        p-10
        shadow-2xl
      "
    >

      <h2 className="text-3xl font-bold mb-8 text-white">
        Nueva Reserva
      </h2>

      <div className="grid gap-6">

        <input
          type="text"
          name="nombreCliente"
          placeholder="Nombre del cliente"
          value={formData.nombreCliente}
          onChange={handleChange}
          className="
            bg-white/10
            border border-white/10
            rounded-2xl
            px-5
            py-4
            text-white
            placeholder:text-gray-300
            outline-none
          "
        />

        <input
          type="datetime-local"
          name="fechaHora"
          value={formData.fechaHora}
          onChange={handleChange}
          className="
            bg-white/10
            border border-white/10
            rounded-2xl
            px-5
            py-4
            text-white
            outline-none
          "
        />

        <input
          type="number"
          name="cantidadPersonas"
          placeholder="Cantidad de personas"
          value={formData.cantidadPersonas}
          onChange={handleChange}
          className="
            bg-white/10
            border border-white/10
            rounded-2xl
            px-5
            py-4
            text-white
            placeholder:text-gray-300
            outline-none
          "
        />

        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="
            bg-white/10
            border border-white/10
            rounded-2xl
            px-5
            py-4
            text-white
            outline-none
          "
        >

          <option className="text-black" value="En Espera">
            En Espera
          </option>

          <option className="text-black" value="Confirmada">
            Confirmada
          </option>

          <option className="text-black" value="Finalizada">
            Finalizada
          </option>

        </select>

        <button
          type="submit"
          className="
            mt-4
            bg-white
            text-black
            py-4
            rounded-2xl
            font-bold
            text-lg
            hover:scale-[1.02]
            transition
          "
        >
          Guardar Reserva
        </button>

      </div>

    </form>

  );

}

export default ReservationForm;