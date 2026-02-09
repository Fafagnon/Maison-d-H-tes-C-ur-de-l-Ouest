
import React from 'react';
import { AppData } from '../types';

const About: React.FC<{ data: AppData | null }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="py-20 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Histoire</h1>
          <p className="text-accent font-bold uppercase tracking-widest text-sm">Authenticité & Tradition</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <img 
              src={data.apropos.image} 
              alt="L'établissement" 
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-primary">Un cadre d'exception à Avepozo</h2>
            <p className="text-gray-600 text-lg leading-relaxed italic">
              "Lomé la belle, Lomé l'accueillante, vue de l'intérieur."
            </p>
            <p className="text-gray-600 leading-relaxed">
              {data.apropos.histoire}
            </p>
            <div className="bg-neutralBg p-8 rounded-xl border-l-4 border-accent">
              <h3 className="text-xl font-bold mb-2 text-darkText">Notre Mission</h3>
              <p className="text-gray-600">
                {data.apropos.mission}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
           <div className="max-w-3xl mx-auto text-center">
             <h2 className="text-3xl font-bold mb-8">Pourquoi choisir le Cœur de l'Ouest ?</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               <div>
                 <div className="text-accent font-bold text-lg mb-2">Hospitalité</div>
                 <p className="text-sm text-gray-500">Un accueil chaleureux dans la pure tradition togolaise.</p>
               </div>
               <div>
                 <div className="text-accent font-bold text-lg mb-2">Emplacement</div>
                 <p className="text-sm text-gray-500">Calme, sécurité et proximité immédiate avec les centres d'intérêt.</p>
               </div>
               <div>
                 <div className="text-accent font-bold text-lg mb-2">Qualité</div>
                 <p className="text-sm text-gray-500">Des standards de confort internationaux avec une touche locale.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
