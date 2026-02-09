
import React, { useState } from 'react';
import { Send, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import { AppData } from '../types';

const Contact: React.FC<{ data: AppData | null }> = ({ data }) => {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire envoyé:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ nom: '', telephone: '', message: '' });
  };

  return (
    <div className="py-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-accent font-bold uppercase tracking-widest text-sm">Nous sommes à votre écoute</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Informations Pratiques</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Adresse</h4>
                    <p className="text-gray-500">{data.contact.adresse}</p>
                    <p className="text-primary font-bold text-sm mt-1">Quartier AVEPOZO</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Téléphone</h4>
                    <p className="text-gray-500">{data.contact.telephone}</p>
                    <p className="text-gray-400 text-sm">Disponible de 8h à 21h</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-gray-500">{data.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 p-8 rounded-3xl border-2 border-accent/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="text-accent" /> Réservation Rapide
              </h3>
              <p className="text-gray-600 mb-6">
                Pour une réponse immédiate et une réservation simplifiée, contactez-nous directement via WhatsApp.
              </p>
              <a 
                href={`https://wa.me/${data.contact.whatsapp}`}
                target="_blank"
                className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
              >
                Ouvrir WhatsApp
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative">
            <h2 className="text-2xl font-bold mb-8">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Nom complet</label>
                <input 
                  type="text" 
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full bg-neutralBg border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Téléphone</label>
                <input 
                  type="tel" 
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full bg-neutralBg border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all"
                  placeholder="+228 XX XX XX XX"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  rows={5} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-neutralBg border-0 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Votre demande..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-lg group"
              >
                Envoyer le message <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {submitted && (
              <div className="absolute inset-0 bg-white/95 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300 z-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
                <p className="text-gray-500">Merci {formData.nom}, nous vous répondrons dans les plus brefs délais.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary font-bold underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Map Full Width */}
        <div className="mt-24 rounded-[3rem] overflow-hidden h-[450px] shadow-2xl border-8 border-white">
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
  );
};

export default Contact;
