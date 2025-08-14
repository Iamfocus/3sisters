import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Slider from "./Slider.tsx";
import { useLocation } from "react-router-dom"; // IMPORT THIS

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const location = useLocation(); // USE THE HOOK
  const isSingleJobPage = location.pathname.startsWith("/single-job"); // CHECK THE URL PATH

  return (
    <div>
      <Header />
      <div style={{ paddingTop: '150px' }}>
        {!isSingleJobPage && <Slider />} {/* CONDITIONAL RENDERING */}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;