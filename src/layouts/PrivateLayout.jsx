import { Outlet } from "react-router-dom";

import useAuthCheck  from "../hooks/useAuthCheck";

const PrivateLayout = () => {
  
  useAuthCheck(null, "/");
  
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
