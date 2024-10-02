import "./App.css";

function App() {
  return (
    <div className="max-w-96 flex flex-col m-auto justify-center items-center gap-3 h-screen">
      <div className="flex w-full justify-start">
        LOGO
        <img src="" alt="" />
        {/* LOGO */}
      </div>
      <div className="flex flex-col w-full h-3/4 items-center">
        <div className="flex flex-row p-10">
          FILTROS
        </div>
        <div className="flex flex-col items-center">
          <div>
            IMAGEN
            <img src="" alt="" />
          </div>
          <div className="flex flex-col max-w-60">
            <div className="w-40 text-center">
              <h1 className="font-bold font-sans">TROBA ALGUNA COSA A FER</h1>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-sm btn-primary">Generate</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-1/4 items-center">
        <div>
          <div className="flex justify-center">
            <h1>Activitat: </h1>
          </div>
          <div>
            <h3>LA ACTIVIDAD GENERADA</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
