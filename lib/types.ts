export interface JourneyEvent {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface Ceremony {
  id: string;
  name: string;
  enabled: boolean;
  date: string;
  time: string;
  venue: string;
  mapUrl: string;
  thumbnailUrl: string;
}

export interface WeddingData {
  opening: {
    thumbnailUrl: string;
    videoUrl: string;
    musicUrl: string;
  };
  hero: {
    groomName: string;
    brideName: string;
    date: string; // YYYY-MM-DD format for countdown
    iconUrl?: string;
  };
  couple: {
    groomParents: string;
    groomIntro: string;
    groomImage: string;
    brideParents: string;
    brideIntro: string;
    brideImage: string;
  };
  journey: JourneyEvent[];
  ceremonies: Ceremony[];
  quranVerse: {
    arabic: string;
    english: string;
    reference: string;
  };
  dua: string;
  family: {
    brideFamily: string[];
    groomFamily: string[];
  };
  gallery: string[];
  venue: {
    name: string;
    address: string;
    mapUrl: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}
