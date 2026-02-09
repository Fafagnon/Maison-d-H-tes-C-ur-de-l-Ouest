
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, MapPin, Mail, ChevronRight, Facebook, Instagram } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import ServicesPage from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { AppData } from './types';

const Header: React.FC<{ data: AppData | null }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/apropos' },
    { name: 'Chambres', path: '/chambres' },
    { name: 'Services', path: '/services' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-bold text-primary tracking-tighter">CŒUR DE L'OUEST</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold leading-tight">Maison d'Hôte • Lomé</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-primary font-bold border-b-2 border-primary' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href={`https://wa.me/${data?.contact.whatsapp}`} 
              target="_blank" 
              className="bg-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent/90 transition-all shadow-sm flex items-center gap-2"
            >
              <MessageSquare size={16} />
              Réserver
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 absolute w-full shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={`https://wa.me/${data?.contact.whatsapp}`}
            className="block w-full text-center bg-primary text-white py-3 rounded-lg font-bold"
          >
            Réserver via WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ data: AppData | null }> = ({ data }) => {
  if (!data) return null;

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">Cœur de l'Ouest</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            {data.site.description}
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"><Instagram size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-accent"></span> Navigation
          </h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link to="/apropos" className="hover:text-white transition-colors">À Propos</Link></li>
            <li><Link to="/chambres" className="hover:text-white transition-colors">Nos Chambres</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services & Confort</Link></li>
            <li><Link to="/galerie" className="hover:text-white transition-colors">Galerie Photo</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-accent"></span> Contact
          </h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-1 shrink-0" />
              <span>{data.contact.adresse}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>{data.contact.telephone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>{data.contact.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-accent"></span> Localisation
          </h4>
          <div className="rounded-lg overflow-hidden h-40 border border-gray-700">
             <iframe 
               src={data.contact.mapUrl} 
               width="100%" 
               height="100%" 
               style={{border:0}} 
               allowFullScreen 
               loading="lazy"
             ></iframe>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} {data.site.nom}. Tous droits réservés. Design par Expertise Web.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur chargement JSON:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutralBg">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-medium text-primary">Chargement de la douceur de vivre...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header data={data} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/apropos" element={<About data={data} />} />
            <Route path="/chambres" element={<Rooms data={data} />} />
            <Route path="/services" element={<ServicesPage data={data} />} />
            <Route path="/galerie" element={<Gallery data={data} />} />
            <Route path="/contact" element={<Contact data={data} />} />
          </Routes>
        </main>
        <Footer data={data} />
        {/* Sticky WhatsApp Button */}
        <a 
          href={`https://wa.me/${data?.contact.whatsapp}`} 
          target="_blank"
          className="fixed bottom-6 right-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
          aria-label="Contactez-nous sur WhatsApp"
        >
          <MessageSquare size={28} />
        </a>
      </div>
    </Router>
  );
};

export default App;
