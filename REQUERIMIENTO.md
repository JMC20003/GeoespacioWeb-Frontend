
# Requerimientos de Arquitectura y Tecnologías

## 1. Resumen del Proyecto

El objetivo es construir una aplicación web de mapas altamente modular y escalable. La arquitectura se basa en la separación de responsabilidades, la reutilización de componentes y un sistema de gestión de estado centralizado usando los principios de Clean Architecture / Scream Architecture.

## 2. Tecnologías Principales (Frontend)

| Tecnología | Versión | Propósito |
| :--- | :--- | :--- |
| **React** | `^18.2.0` | Biblioteca principal para la construcción de la interfaz de usuario. |
| **Vite** | `^6.1.0` | Herramienta de construcción y servidor de desarrollo. |
| **Redux Toolkit**| `^2.8.2` | Para la gestión de estado global de la aplicación. |
| **React Router** | `^7.8.1` | Para el manejo de rutas y navegación en la aplicación. |
| **MapLibre GL** | `^3.6.2` | Biblioteca para la renderización de mapas interactivos. |
| **Mapbox GL** | `^3.3.0` | Biblioteca alternativa para renderización de mapas. |
| **React Map GL** | `^7.1.7` | Wrapper de React para Mapbox GL/MapLibre GL. |
| **Sonner** | `^2.0.7` | Para mostrar notificaciones (toasts) en la aplicación. |
| **Tailwind CSS**| `^4.1.12` | Framework de CSS para el diseño de la interfaz. |
| **Axios** | `^1.11.0` | Cliente HTTP para realizar peticiones a APIs. |


## 3. Arquitectura del Código Fuente

La estructura del proyecto (`src`) está diseñada para promover la modularidad y la escalabilidad, siguiendo un enfoque de "feature-based architecture".

### `src/app`
-   **Propósito**: Contiene la configuración central y el punto de entrada de la aplicación.
-   **Contenido Clave**:
    -   `main.jsx`: Punto de entrada de la aplicación donde se renderiza el componente `App`.
    -   `App.jsx`: Componente raíz que configura el proveedor de Redux (`Provider`), el sistema de rutas y el layout principal.
    -   `routes/`: Define la lógica de enrutamiento de la aplicación, incluyendo rutas públicas y protegidas (`AuthProtected`).
    -   `styles/`: Estilos globales y de bibliotecas (ej. `maplibre-gl.css`).

### `src/features`
-   **Propósito**: Es el corazón de la arquitectura. Cada subdirectorio representa una "feature" o dominio de negocio autocontenido.
-   **Estructura de una Feature (ej. `auth`)**:
    -   `views/`: Contiene los componentes de React que el usuario ve (ej. `Login.jsx`).
    -   `services/`: Lógica para comunicarse con APIs externas (ej. `login.service.js`).
    -   `validations/`: Lógica de validación para formularios.

### `src/shared`
-   **Propósito**: Contiene código que es reutilizable a través de múltiples features. Sigue el principio "Don't Repeat Yourself" (DRY).
-   **Contenido Clave**:
    -   `components/`: Componentes de UI genéricos y reutilizables (ej. `ButtonTool`, `Card`, `Table`, `Spinner`).
    -   `hooks/`: Hooks de React personalizados que encapsulan lógica reutilizable (ej. `useDrawingTool`).
    -   `context/`: Contextos de React para estado que no necesita ser global (ej. `GlobalState.jsx`).
    -   `redux/`: Configuración de la tienda de Redux y los "slices" que manejan el estado global.
        -   `store.js`: Configuración de la tienda principal de Redux.
        -   `features/`: Slices de Redux para manejar partes del estado global (ej. `mapSlice.js`, `userSlice.js`).
    -   `services/`: Servicios genéricos o configuraciones de API (ej. `api.js`).
    -   `layout/`: Componentes que definen la estructura principal de la página (paneles laterales, inferiores, etc.).

## 4. Gestión de Estado

La aplicación utiliza una combinación de Redux Toolkit y React Context para la gestión del estado.

-   **Redux Toolkit**: Se utiliza para el estado global que afecta a múltiples features, como la información del usuario (`userSlice`) y el estado del mapa (`mapSlice`).
-   **React Context**: Se puede usar para estado más localizado que es compartido por un subárbol de componentes, evitando la sobrecarga de Redux para estados simples.

## 5. Sistema de Ruteo

-   Se utiliza `react-router-dom` para definir las rutas de la aplicación.
-   El componente `src/app/routes/Index.jsx` centraliza la declaración de todas las rutas.
-   Se implementa un componente `AuthProtected` para proteger rutas que requieren autenticación, redirigiendo a los usuarios no autorizados.

## 6. Visualización Mínima Esperada

La aplicación a construir debe tener una interfaz similar a la siguiente imagen de referencia, que muestra la disposición general de los paneles y el mapa.

![Imagen de referencia de la aplicación](web-base.png)

### URLs de Apoyo

-   **Aplicación en producción**: Se puede consultar una versión en vivo de la aplicación para entender la interacción y el comportamiento esperado.
    -   [http://200.121.128.47:3055/web-base/map-free](http://200.121.128.47:3055/web-base/map-free)

-   **Catálogo de Componentes (Storybook)**: Para una vista detallada de los componentes de UI individuales, su apariencia y sus props.
    -   [http://200.121.128.47:3065/?path=/docs/features-map-mapcontainer--docs](http://200.121.128.47:3065/?path=/docs/features-map-mapcontainer--docs)

