
import React from 'react';
import { Link } from 'react-router-dom';
// Added ChevronRight to the imports from lucide-react
import { ArrowRight, Star, ShieldCheck, Waves, ChevronRight } from 'lucide-react';
import { AppData } from '../types';

interface HomeProps {
  data: AppData | null;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={data.site.heroImage} 
            alt="Hero Maison d'Hôte" 
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Bienvenue au Togo
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {data.site.nom}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto">
            {data.site.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chambres" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              Voir nos chambres <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="bg-white text-darkText px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/90 transition-all">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Confort Premium</h2>
            <h3 className="text-4xl font-bold text-darkText">Nos Chambres Favorites</h3>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.chambres.slice(0, 3).map((chambre) => (
              <div key={chambre.id} className="group overflow-hidden rounded-2xl bg-neutralBg shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={chambre.image} 
                    alt={chambre.nom} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-sm font-bold text-primary">
                    À partir de {chambre.prix}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-3 text-darkText">{chambre.nom}</h4>
                  <p className="text-gray-600 mb-6 text-sm line-clamp-2">
                    {chambre.description}
                  </p>
                  <Link to="/chambres" className="text-primary font-bold flex items-center gap-1 hover:gap-3 transition-all">
                    En savoir plus <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/chambres" className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all">
              Voir toutes les chambres
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-neutralBg relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Art de Vivre</h2>
              <h3 className="text-4xl font-bold text-darkText mb-6">Des services pensés pour votre sérénité</h3>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                Plus qu'une simple maison d'hôte, le Cœur de l'Ouest est une expérience togolaise complète. Nous prenons soin de chaque détail pour rendre votre séjour inoubliable.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.services.slice(0, 4).map((service, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-darkText">{service.nom}</h5>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/services" className="inline-block mt-12 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg">
                Découvrir tous les services
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800" 
                className="rounded-3xl shadow-2xl relative z-10"
                alt="Ambiance"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience / Stats */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">9+</div>
              <div className="text-primary-100/70 uppercase tracking-widest text-xs">Chambres uniques</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-100/70 uppercase tracking-widest text-xs">Produits locaux</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500m</div>
              <div className="text-primary-100/70 uppercase tracking-widest text-xs">De la plage</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-primary-100/70 uppercase tracking-widest text-xs">Avis voyageurs</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
