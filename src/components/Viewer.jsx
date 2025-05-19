import { initViewerUniqueModel } from "../lib/aps"

// Function component
const Viewer = ({ setIsLoading, setData }) => {
  // const urn =
  //   "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cGVyc2l0ZW50bGFtYmRhL0RlcGFydGFtZW50byUyMC0lMjBQdWVibG8lMjBMaWJyZSUyMF8lMjBDb25maWd1cmFkby5ydnQ";
  const urn =
    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cGVyc2l0ZW50bGFtYmRhL0xhbWJkYV9TaW1wbGVfRXhhbXBsZV8yMDIyLnJ2dA";

  useEffect(() => {
    initViewerUniqueModel(urn, setIsLoading, setData);
  }, []);

  // const response = fetch("http://localhost:3000/auth/get-token");

  return (
    <div className="w-full">
      <div className="flex w-full h-full relative ">
        <div id="myViewer"></div>
      </div>
    </div>
  );
};

export default Viewer;

//  Hooks => funciones que nos facilitaran la vida
// UseEffect => se ejecuta cuando el componente se monta
