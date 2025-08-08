import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Slider from "./Slider.tsx";


const Layout = ({children,  }:Readonly<{ children:React.ReactNode }>) => {
    return (
        <div>
            <Header />
            <div style={{ paddingTop: '150px' }}>
                <Slider />
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default Layout;