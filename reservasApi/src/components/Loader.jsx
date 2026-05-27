function Loader() {

  return (

    <div className="flex flex-col justify-center items-center min-h-screen gap-4">

      {/* icono en movimiento*/}
      <div
        className="
          w-16
          h-16
          border-4
          border-black
          border-t-transparent
          rounded-full
          animate-spin
        "
      ></div>

      {/* Texto carga */}
      <h1 className="text-2xl font-bold text-gray-700">

        Cargando reservas...

      </h1>

    </div>

  );

}

export default Loader;

