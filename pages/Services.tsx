
import React from 'react';
import * as Icons from 'lucide-react';
import { AppData } from '../types';

const ServicesPage: React.FC<{ data: AppData | null }> = ({ data }) => {
  if (!data) return null;

  // Helper to map string icon names to Lucide icons
  const getIcon = (name: string) => {
    const LucideIcon = (Icons as any)[name];
    return LucideIcon ? <LucideIcon size={40} className="text-accent" /> : <Icons.HelpCircle size={40} />;
  };

  return (
    <div className="py-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Services & Équipements</h1>
          <p className="text-primary font-bold uppercase tracking-widest text-sm">Tout pour votre confort</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.services.map((service, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/20 transition-all hover:shadow-xl group">
              <div className="mb-6 p-4 bg-accent/5 rounded-2xl w-fit group-hover:bg-accent/10 transition-colors">
                {getIcon(service.icone)}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-darkText">{service.nom}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-primary text-white p-12 rounded-[3rem] text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Un besoin particulier ?</h2>
            <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto">
              Nous faisons de notre mieux pour satisfaire toutes les demandes spéciales de nos hôtes. Contactez-nous à l'avance !
            </p>
            <a 
              href={`https://wa.me/${data.contact.whatsapp}`}
              className="bg-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block shadow-2xl"
            >
              Échanger avec nous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
