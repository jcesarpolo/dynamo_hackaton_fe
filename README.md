
# Lambda Frontend Template

Este es un boilerplate para desarrollar aplicaciones frontend utilizando **React.js**, **Vite**, y **Tailwind CSS**. Está optimizado para integrarse con **Autodesk Platform Services (APS)** y trabaja perfectamente junto a la plantilla de backend de Lambda.

---

## Características principales

- **React.js con Vite**: Entorno ligero y rápido para desarrollo.
- **Tailwind CSS**: Framework de diseño responsivo y moderno.
- **Routing**: Navegación preconfigurada con **React Router Dom**.
- **Autenticación**: Manejo de cookies con **react-cookie**.
- **Configuración modular**: Carpeta estructurada para escalar y mantener el proyecto fácilmente.
- **Integración con APS**: Preparado para gestionar la autenticación y los flujos de Autodesk Platform Services.

---

## Estructura del proyecto

```plaintext
src/
├── assets/             # Archivos estáticos como imágenes e íconos.
├── components/         # Componentes reutilizables (botones, modales, etc.).
├── hooks/              # Custom hooks como useAuthCheck.
├── layouts/            # Layouts como PrivateLayout y PublicLayout.
├── lib/
│   ├── extensions/     # Extensiones y configuraciones específicas para APS.
│   ├── aps.acc.js      # Configuración para Autodesk Construction Cloud.
├── pages/              # Páginas principales organizadas por módulo.
│   ├── Home/           # Página principal.
│   ├── Projects/       # Páginas relacionadas con proyectos.
├── styles/             # Archivos CSS y configuración de Tailwind.
├── App.jsx             # Componente raíz.
├── main.jsx            # Punto de entrada de la aplicación.
```

---

## Variables de entorno

Asegúrate de configurar las siguientes variables en un archivo `.env` basado en el `.env.example` incluido:

| Variable                  | Descripción                                      |
|---------------------------|--------------------------------------------------|
| `VITE_APS_CLIENT_ID`      | Client ID de Autodesk Platform Services.         |
| `VITE_APS_REDIRECT_URI`   | URL de redirección para la autenticación APS.    |

---

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <URL_REPOSITORIO>
   cd lambda-frontend-template
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura el entorno**:
   Crea un archivo `.env` basado en `.env.example` y añade las variables necesarias.

4. **Ejecuta el servidor en modo desarrollo**:
   ```bash
   npm run dev
   ```

---

## Dependencias principales

### Producción

| Paquete            | Versión    | Descripción                                           |
|--------------------|------------|-------------------------------------------------------|
| `react`            | ^18.3.1    | Biblioteca para construir interfaces de usuario.     |
| `react-cookie`     | ^7.2.2     | Manejo de cookies en aplicaciones React.             |
| `react-dom`        | ^18.3.1    | Renderizado de componentes React en el DOM.          |
| `react-router-dom` | ^6.27.0    | Navegación y manejo de rutas en React.               |

### Desarrollo

| Paquete                  | Versión    | Descripción                                           |
|--------------------------|------------|-------------------------------------------------------|
| `@eslint/js`             | ^9.11.1    | Configuración de ESLint para proyectos JS.           |
| `@vitejs/plugin-react`   | ^4.3.2     | Plugin para integrar React en Vite.                  |
| `eslint`                 | ^9.11.1    | Herramienta para analizar y encontrar problemas de JS.|
| `eslint-plugin-react`    | ^7.37.0    | Reglas de ESLint específicas para React.             |
| `eslint-plugin-react-hooks` | ^5.1.0-rc.0 | Reglas para verificar hooks de React.               |
| `tailwindcss`            | ^3.4.14    | Framework CSS para diseño moderno y responsivo.      |
| `vite`                   | ^5.4.8     | Herramienta para desarrollo rápido de aplicaciones.  |

---

## Scripts disponibles

| Script           | Descripción                                  |
|-------------------|----------------------------------------------|
| `npm run dev`     | Inicia el servidor en modo desarrollo.      |
| `npm run build`   | Genera la aplicación para producción.       |
| `npm run preview` | Previsualiza la aplicación generada.        |

---

## Estilos con Tailwind CSS

Este proyecto utiliza **Tailwind CSS** para gestionar estilos. La configuración puede ajustarse en el archivo `tailwind.config.js`.

---

## Notas adicionales

- **ESLint** está configurado para ayudar a mantener un código limpio y consistente.
- **Extensiones APS**: Este proyecto incluye configuraciones y extensiones específicas para gestionar Autodesk Platform Services.
- **Layouts**: PublicLayout y PrivateLayout están preparados para manejar accesos públicos y autenticados.

---

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
