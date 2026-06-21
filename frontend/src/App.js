import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HonigdaxLanding from "@/pages/HonigdaxLanding";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HonigdaxLanding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
