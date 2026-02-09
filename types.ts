
export interface SiteInfo {
  nom: string;
  ville: string;
  description: string;
  slogan: string;
  heroImage: string;
}

export interface Chambre {
  id: number;
  nom: string;
  image: string;
  description: string;
  prix: string;
  commodites: string[];
}

export interface Service {
  nom: string;
  icone: string;
  description: string;
}

export interface Photo {
  url: string;
  alt: string;
  categorie: string;
}

export interface ContactInfo {
  whatsapp: string;
  telephone: string;
  email: string;
  adresse: string;
  mapUrl: string;
}

export interface AppData {
  site: SiteInfo;
  chambres: Chambre[];
  services: Service[];
  galerie: Photo[];
  contact: ContactInfo;
  apropos: {
    histoire: string;
    mission: string;
    image: string;
  };
}
