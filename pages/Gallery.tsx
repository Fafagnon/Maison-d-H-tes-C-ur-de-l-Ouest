
import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { AppData } from '../types';

const Gallery: React.FC<{ data: AppData | null }> = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('Tous');

  if (!data) return null;

  const categories = ['Tous', ...new Set(data.galerie.map(img => img.categorie))];
  const filteredImages = filter === 'Tous' 
    ? data.galerie 
    : data.galerie.filter(img => img.categorie === filter);

  return (
    <div className="py-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galerie Photo</h1>
          <p className="text-gray-500 italic mb-10">Découvrez l'atmosphère unique du Cœur de l'Ouest</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx} 
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
              onClick={() => setSelectedImage(img.url)}
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 size={40} className="text-white" />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/80 backdrop-blur-sm text-primary text-[10px] uppercase font-bold px-3 py-1 rounded">
                  {img.categorie}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-accent transition-colors">
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Plein écran" 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
