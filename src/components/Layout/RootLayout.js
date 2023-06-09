import { Outlet } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
export default function RootLayout () {
  return (
    <div className='rootLayout'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}


// import Header from "../components/Header";
// import Footer from "../components/Footer";
