import { Outlet } from "react-router-dom";

export default function RootLayout () {
  return (
    <div className='rootLayout'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}


// import Header from "../components/Header";
// import Footer from "../components/Footer";
