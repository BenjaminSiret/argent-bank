import { Outlet } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './RootLayout.css'

export default function RootLayout () {
  return (
    <div className='rootLayout'>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
