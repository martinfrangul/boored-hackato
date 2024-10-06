import "./App.css";
import Filters from "./components/Filters";
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const onFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const onGenerateHandler = async () => {

    // SI NO HAY NINGÚN FILTRO ACTIVADO LLAMAR AL ENDPOINT RANDOM

    if (Object.values(filters).every((isActive) => !isActive)) {
      try {
        const response = await fetch("/api/random");
        if (!response.ok)
          throw new Error("Error en la solicitud: " + response.statusText);
        const data = await response.json();
        setFilteredData([data]);
        return;
      } catch (error) {
        setError(error.message);
        return;
      }
    }

    // SI HAY FILTROS ACTIVADOS 

    try {
      const activeFilters = Object.keys(filters).filter((filter) => filters[filter]);
      const responses = await Promise.all(
        activeFilters.map((filter) =>
          fetch(`/api/filter?type=${filter}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.statusText);
              }
              return response.json();
            })
        )
      );
    
      const combinedData = responses.flat();
    
      setFilteredData((prev) => {
        if (combinedData.length > 0) {
          const randomizedData = combinedData[Math.floor(Math.random() * combinedData.length)];
          return [randomizedData];
        }
        return prev;
      });
    } catch (error) {
      console.error("Error al generar actividades:", error);
    }
    
  };

  return (
    <div className="max-w-96 flex flex-col m-auto justify-center items-center gap-3 h-screen">
      <div className="flex w-full justify-start">
        <img src="/logo.png" className="w-32 p-3" alt="logo-image" />
      </div>
      <div className="flex flex-col w-full h-3/4 items-center">
        <Filters onFiltersChange={onFiltersChange} />
        <div className="flex flex-col h-full justify-center items-center">
          <div className="-mb-5 z-10">
            <img
              src="/imageCentral.png"
              className="w-32"
              alt="motivational-image"
            />
          </div>
          <div className="flex flex-col max-w-60 bg-[url(./generatorBackground.png)] bg-cover bg-no-repeat bg-center rounded-xl">
            <div className="w-48 text-center">
              <h1 className="font-bold font-sans px-5 pt-7">
                TROBA ALGUNA COSA A FER
              </h1>
            </div>
            <div className="flex justify-center p-5">
              <button
                onClick={onGenerateHandler}
                className="btn btn-sm bg-black text-white text-[10px] px-5"
              >
                Generar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-1/4 items-center">
        <div>
          <div className="flex justify-center p-5">
            <h1 className="text-lg font-sans font-bold">Activitat: </h1>
          </div>
          <div>
            <h3 className="text-md text-center px-5 pb-5">
              {error
                ? error 
                : filteredData.length > 0
                  ? filteredData[0].activity 
                  : "No s'han trobat activitats"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
