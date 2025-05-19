import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-200/30 border-b shadow-xs">
      <header className="flex justify-between w-full items-center  max-w-screen-xl mx-auto h-20 px-4 ">
        <img src="/horizontal_logo.svg" alt="" className="h-7" />
        <nav>
          <ul className="flex gap-x-4">
            <li>
              <Link to="/" className="font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className="font-bold">
                Proyectos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-bold">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
        <button>
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </button>
        {/* <div className="flex gap-x-4">
        <div className="flex flex-col">
          <p className="font-bold">Renzo Rios</p>
          <p className="text-xs font-semibold">Coordinador BIM</p>
        </div>
        <div className="bg-blue-200 w-10 h-10 rounded-full flex justify-center items-center text-sm font-bold border border-black">
          RR
        </div>
      </div> */}
      </header>
    </div>
  );
};

export default Header;
