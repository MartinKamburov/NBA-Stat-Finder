import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout       from "./components/Layout";
import PlayerPage   from "./pages/PlayerPage";
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* this route renders Layout */}
        <Route path="/" element={<Layout />}>
          {/* these are “child” routes that render into <Outlet/> */}
          <Route index      element={<Home />} />
          <Route path="player/:name" element={<PlayerPage />} />
          {/* add more pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;