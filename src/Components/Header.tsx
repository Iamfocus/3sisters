import { Container, Navbar, Nav } from 'react-bootstrap';
import {
   FaEnvelope,
   FaMapMarkerAlt,
   FaInstagram,
   FaLinkedin,
   FaSearch
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';

declare global {
   interface Window {
       google: any;
       googleTranslateElementInit: () => void;
   }
}

const Header = () => {
   const [language, setLanguage] = useState('en');
   const translateElementRef = useRef<HTMLDivElement>(null);

   // Restore preferred language from localStorage (optional)
   useEffect(() => {
      const savedLang = localStorage.getItem('preferredLang');
      if (savedLang) {
         setLanguage(savedLang);
      }
   }, []);

   useEffect(() => {
      const initGoogleTranslate = () => {
         if (window.google?.translate) {
            new window.google.translate.TranslateElement(
               {
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr',
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false,
               },
               'google_translate_element'
            );

            // Hide native Google tools
            if (translateElementRef.current) {
               translateElementRef.current.style.position = 'absolute';
               translateElementRef.current.style.left = '-9999px';
            }
         }
      };

      window.googleTranslateElementInit = initGoogleTranslate;

      if (!document.querySelector('script[src*="translate.google.com"]')) {
         const script = document.createElement('script');
         script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
         script.async = true;
         document.body.appendChild(script);

         return () => {
            document.body.removeChild(script);
         };
      } else {
         // Reinitialize if script already present
         window.googleTranslateElementInit();
      }
   }, []);

   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLang = e.target.value;
      setLanguage(selectedLang);

      // Save to localStorage (optional)
      localStorage.setItem('preferredLang', selectedLang);

      // Set cookie to let Google Translate know your choice
      document.cookie = `googtrans=/en/${selectedLang}; path=/; domain=${window.location.hostname}`;

      // Set #googtrans hash
      window.location.hash = `#googtrans(en|${selectedLang})`;

      // Force page reload to ensure translation applies
      setTimeout(() => {
         window.location.reload();
      }, 300);
   };

   return (
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030 }}>
         {/* Top Bar */}
         <div style={{ backgroundColor: '#6b874b', color: '#fff', fontSize: '0.9rem' }} className="py-2">
            <Container className="d-flex justify-content-between align-items-center">
               <div className="d-flex gap-3 align-items-center p-1 headers">
                  <FaEnvelope style={{ color: '#FCA027' }} />
                  <span>info@threesistersconsulting.com</span>
                  <FaMapMarkerAlt style={{ color: '#FCA027' }} />
                  <span>133 King St W. Chatham, Ontario, Canada. N7M 1E4</span>
               </div>
               <div className="d-flex gap-3">
                  <FaInstagram />
                  <FaLinkedin />
               </div>
            </Container>
         </div>

         {/* Main Navbar */}
         <Navbar bg="white" expand="lg" className="py-3">
            <Container className="d-flex justify-content-between align-items-center">
               <Navbar.Brand href="#">
                  <img
                     src="/images/threesisterslogo.svg"
                     alt="Three Sisters Consulting"
                     style={{ height: '60px' }}
                  />
               </Navbar.Brand>

               <Nav className="mx-auto d-none d-lg-flex gap-4 main-navs">
                  <Nav.Link href="https://threesistersconsulting.com/">Home</Nav.Link>
                  <Nav.Link href="https://threesistersconsulting.com/who-we-are/">Who we are</Nav.Link>
                  <Nav.Link href="https://threesistersconsulting.com/our-services/">What we do</Nav.Link>
                  <Nav.Link href="https://threesistersconsulting.com/job-assistance/">Knowledge Sharing</Nav.Link>
                  <Nav.Link href="https://jobs.threesistersconsulting.com/" style={{ color: '#a18c00', fontWeight: 'bold' }}>
                     Our Job Board
                  </Nav.Link>
               </Nav>

               <div className="d-flex align-items-center gap-4">
                  <FaSearch size={18} />
                  <img src="/images/Icon.svg" alt="Icon" className="img-fluid" />

                  {/* Language Dropdown */}
                  <select
                     onChange={handleLanguageChange}
                     value={language}
                     style={{
                        appearance: 'none',
                        padding: '5px 25px 5px 10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>") no-repeat right 8px center/12px 12px`,
                     }}
                  >
                     <option value="en">English</option>
                     <option value="fr">Français</option>
                  </select>

                  {/* Google Translate Element (Hidden) */}
                  <div
                     id="google_translate_element"
                     ref={translateElementRef}
                     style={{ visibility: 'visible' }}
                  ></div>

                  <div className="d-flex align-items-center gap-2">
                     <img
                        src="/images/phones.svg"
                        alt="Phone Number"
                        className="img-fluid"
                        width="50"
                     />
                     <div>
                        <small>Call Us Anytime</small>
                        <br />
                        <strong>+1 519 365 3485</strong>
                     </div>
                  </div>
               </div>
            </Container>
         </Navbar>
      </div>
   );
};

export default Header;