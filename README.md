# 🧬 PokeAPI Explorer

Aplicación web interactiva para explorar los 151 Pokémon originales. Incluye búsqueda en tiempo real, filtros por tipo, vistas personalizables (tabla o cuadrícula) y un modal detallado por Pokémon.

Construido con **React + Next.js**, **TypeScript** y la biblioteca de UI **Mantine**, este proyecto representa una solución moderna, modular y escalable para consumir y visualizar datos de una API pública.

---

## 🛠️ Tecnologías utilizadas

| Tecnología                       | Descripción                                                                                          |
|----------------------------------|------------------------------------------------------------------------------------------------------|
| [React + Next.js](https://nextjs.org/) | Framework moderno para React con App Router, Server-Side Rendering (SSR) y optimización automática |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático para JavaScript que mejora la mantenibilidad y escalabilidad del código             |
| [Mantine UI](https://mantine.dev/) | Biblioteca de componentes accesibles, estilizados y listos para producción                          |
| [Axios](https://axios-http.com/) | Cliente HTTP basado en promesas para consumir APIs de manera sencilla                               |
| [react-data-table-component](https://react-data-table-component.netlify.app/) | Tabla interactiva con paginación, ordenamiento y personalización                                   |
| [react-select](https://react-select.com/) | Select avanzado con búsqueda, multi-select y customización                                         |
| [PokéAPI](https://pokeapi.co/) | API RESTful con información completa de Pokémon                                                      |
| [Vercel](https://vercel.com/) | Plataforma de despliegue optimizada para aplicaciones Next.js                                        |

---

## ⚙️ Funcionalidades principales

| Funcionalidad                | Descripción                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| 📊 Vista de tabla           | Tabla interactiva con ordenamiento y paginación                            |
| 🧱 Vista en cuadrícula      | Tarjetas visuales con diseño Grid para explorar Pokémon                    |
| 🔍 Búsqueda en tiempo real  | Filtro instantáneo por nombre                                               |
| 🧪 Filtro por tipo          | Filtro dinámico usando `react-select`                                       |
| 🧬 Modal de detalles        | Muestra altura, peso, stats y tipos en un diseño visual con barra de stats |
| 🔁 Cambio de vista          | Botón toggle entre vista de tabla y cuadrícula                             |
| 📱 Diseño responsive        | UI adaptable a dispositivos móviles y pantallas grandes                    |
| 🧩 Componentes reutilizables| UI desacoplada en componentes pequeños y claros                            |
| ✅ Código tipado y limpio   | Interfaces sólidas con TypeScript, manteniendo arquitectura modular        |

---

## 🧠 Estructura del Proyecto

```bash
/src
  /components       → UI reutilizable (Tabla, Grid, Modal, Card, etc.)
  /hooks            → Hooks personalizados (e.g. usePokemon)
  /services         → Lógica de consumo de PokéAPI con Axios
  /types            → Interfaces TypeScript (PokemonDetails, etc.)
  /constants        → Constantes globales (colores, límites, etc.)
  /pages            → App Router con rutas como index.tsx

🚀 Instalación y ejecución

# Clonar el repositorio
git clone https://github.com/tu-usuario/poke-api.git
cd pokemon-explorer

# Instalar dependencias
npm install

# Iniciar servidor local
npm run dev

🌐 API utilizada

    PokéAPI – https://pokeapi.co/

        Se consultan los 151 Pokémon originales

        Luego se accede a sus detalles individuales: nombre, altura, peso, tipos, stats, imágenes, etc.

✅ Roadmap de desarrollo

    ✅ Inicialización del proyecto con create-next-app + TypeScript

    ✅ Configuración con App Router, ESLint, alias @/

    ✅ Instalación de dependencias: Mantine, Axios, react-data-table-component, react-select

    ✅ Hook personalizado para consumo de PokéAPI

    ✅ Uso de Promise.all para llamadas concurrentes

    ✅ Tabla interactiva con ordenamiento y paginación

    ✅ Vista en cuadrícula con tarjetas

    ✅ Modal detallado con ReactDOM.createPortal

    ✅ Filtro dinámico por tipo

    ✅ Búsqueda instantánea por nombre

    ✅ Cambio de vista entre Tabla y Grid

    ✅ Responsive Design para móviles y desktop

    ✅ Despliegue en Vercel (opcional si ya fue realizado)

🧠 Aprendizajes aplicados

    🔄 Consumo eficiente de APIs con Axios y Promise.all para llamadas concurrentes

    ⚙️ Estado global y local gestionado con useState y useEffect

    📦 Componentes bien abstraídos y reutilizables

    ✅ Arquitectura modular y escalable

    🧑‍🎨 UI moderna con Mantine

    🧾 Interfaces TypeScript para claridad y seguridad

    🧩 Buenas prácticas en estructura y mantenibilidad del código
