import { useState } from "react";
import { useCookies } from "react-cookie";

import AutodeskLoginButton from "./AutodeskLoginButton";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [cookies] = useCookies(["access_token"]);

  const token = cookies.access_token;

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Navbar principal */}
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <img src="/horizontal_logo.svg" alt="" className="h-6" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {token ? (
              <Link to="/projects">Ver proyectos</Link>
            ) : (
              <AutodeskLoginButton />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay oscuro (para cerrar el menú al hacer clic fuera) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Menú lateral (drawer) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform z-50`}
      >
        {/* Encabezado del menú */}
        <div className="flex items-center justify-between p-4">
          <div className="text-lg font-bold">Lambda</div>
          <button
            className="text-white focus:outline-none"
            onClick={closeSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Opciones del menú lateral */}
        <nav className="p-4 space-y-4">
          <a
            href="#cursos"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4m12 0v6m-16-6v6"
              />
            </svg>
            <span>Cursos</span>
          </a>
          <a
            href="#especializaciones"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span>Especializaciones</span>
          </a>
          <a
            href="#pildoras"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5a7 7 0 11-5 2.9A7.1 7.1 0 019 5z"
              />
            </svg>
            <span>Píldoras</span>
          </a>
          <a
            href="#blog"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
            <span>Blog</span>
          </a>
          <a
            href="#planes"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5v14"
              />
            </svg>
            <span>Planes</span>
          </a>
        </nav>

        {/* Botón adicional */}
        <div className="p-4">
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
            Campus Virtual
          </button>
        </div>
      </div>
    </div>
  );
}
