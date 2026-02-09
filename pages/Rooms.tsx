
import React from 'react';
import { Wifi, Thermometer, Tv, Coffee, Maximize } from 'lucide-react';
import { AppData } from '../types';

const Rooms: React.FC<{ data: AppData | null }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="py-20 bg-neutralBg/50 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Chambres</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Découvrez nos 9 chambres uniques, décorées avec soin pour vous offrir un séjour inoubliable à Lomé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.chambres.map((chambre) => (
            <div key={chambre.id} className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={chambre.image} 
                  alt={chambre.nom} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {chambre.prix} <span className="text-[10px] font-normal">/nuit</span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-darkText group-hover:text-primary transition-colors">{chambre.nom}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {chambre.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {chambre.commodites.map((comm, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-500 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">
                      {comm}
                    </span>
                  ))}
                </div>
                <a 
                  href={`https://wa.me/${data.contact.whatsapp}?text=Bonjour, je souhaite réserver la ${chambre.nom}`}
                  target="_blank"
                  className="w-full py-4 bg-primary text-white text-center rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md group-hover:translate-y-[-4px]"
                >
                  Réserver maintenant
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
