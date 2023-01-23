import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { HeaderMemo as Header } from "./components/Header/Header";

function App() {
  console.log("Render App");

  return (
    <div className="container py-5">
      <Header />
			<Outlet />
      <Footer />
    </div>
  );
}

export default App;
