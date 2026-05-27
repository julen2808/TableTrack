
# 🍽️ TABLE TRACK
> Aplicación web desarrollada para la gestión de reservas de mesas en restaurantes.

TABLE TRACK permite registrar reservas, visualizar clientes, actualizar estados de atención y eliminar reservas de manera rápida e intuitiva. El proyecto fue construido con React y una API mockeada utilizando MockAPI para simular operaciones CRUD reales.

---

## 📋 Descripción del Proyecto

La aplicación está enfocada en mejorar la organización y administración de reservas dentro de restaurantes o negocios gastronómicos.

El sistema permite:

- ✅ Registrar nuevas reservas
- 📄 Visualizar reservas existentes
- 🔍 Filtrar reservas por estado
- 🏁 Finalizar reservas
- 🗑️ Eliminar reservas
- 📱 Gestionar la información desde una interfaz moderna y responsive

Además, el proyecto implementa manejo de estados, consumo de APIs REST y actualización dinámica de la interfaz sin necesidad de recargar la página.

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Uso |
|---|---|
| React | Framework principal |
| Vite | Bundler y servidor de desarrollo |
| React Router DOM | Enrutamiento entre páginas |
| Tailwind CSS | Estilos y diseño responsive |
| SweetAlert2 | Alertas y confirmaciones |
| JavaScript | Lenguaje base |

### Backend Simulado
| Tecnología | Uso |
|---|---|
| MockAPI | Almacenamiento y consumo de reservas |

---

## 🌐 API Mockeada

Servicio utilizado para almacenar y consumir las reservas:

```
https://6a0ddcdd769682b8ee76f55b.mockapi.io/reservas
```

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
```

### 2. Entrar a la carpeta del proyecto

```bash
cd reservasApi
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 5. Abrir la aplicación en el navegador

Vite mostrará una URL similar a esta:

```
http://localhost:5173
```

Abrir esa dirección en el navegador para visualizar el proyecto.

---

## ⚙️ Funcionalidades Implementadas

### 🔐 Login de acceso
- Registro local del host
- Persistencia usando localStorage

### 🗂️ Panel de reservas
- Visualización de reservas
- Actualización dinámica de estados
- Eliminación de reservas
- Filtros por estado

### 📝 Gestión de reservas
- Crear reservas
- Editar estados
- Finalizar reservas
- Eliminar reservas

### 🎨 UI/UX
- Interfaz moderna
- Diseño responsive
- Uso de Tailwind CSS
- Experiencia visual optimizada

---

## 📁 Estructura del Proyecto

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── ReservationCard.jsx
│   ├── ReservationForm.jsx
│   └── Loader.jsx
│
├── pages/
│   ├── LoginPage.jsx
│   └── PanelPage.jsx
│
├── services/
│   └── ReservationsService.js
│
├── router/
│
├── assets/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📚 Conceptos Trabajados

Durante el desarrollo del proyecto se trabajaron conceptos como:

- ⚛️ Componentes reutilizables
- 🪝 Hooks de React (`useState`, `useEffect`)
- 🔀 React Router
- 🌐 Consumo de APIs
- 📦 CRUD completo
- 🔄 Renderizado dinámico
- 🗃️ Manejo de estados
- 💾 Persistencia local
- 📱 Diseño responsive
- 🎨 Tailwind CSS

---

## 👥 Autores

Proyecto desarrollado por Jp como práctica de desarrollo Frontend utilizando React y APIs REST.
