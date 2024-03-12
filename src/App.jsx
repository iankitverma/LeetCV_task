import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wizard_stepper from "./components/Wizard_stepper";
import Test_Cases from "./components/Test_Cases";
import Details from "./components/Details";
import "./App.css";
function App() {
  return (
    <div className="bg-green-200 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Wizard_stepper />} />
          <Route path="/test_Cases" element={<Test_Cases />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
