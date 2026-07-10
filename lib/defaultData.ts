import { WeddingData } from "./types";

export const defaultWeddingData: WeddingData = {
  opening: {
    thumbnailUrl: "https://picsum.photos/seed/muslim/1920/1080",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  hero: {
    groomName: "Ayaan Ahmed",
    brideName: "Fatima Khan",
    date: "2026-12-12T11:00:00Z",
    iconUrl: "",
  },
  couple: {
    groomParents: "Mr. Tariq Ahmed & Mrs. Aisha Ahmed",
    groomIntro: "A software engineer with a heart of gold. Loves to travel and explore new places.",
    groomImage: "https://picsum.photos/seed/groom/600/800",
    brideParents: "Mr. Salman Khan & Mrs. Zoya Khan",
    brideIntro: "An artist who brings color to everyone's life. Passionate about reading and design.",
    brideImage: "https://picsum.photos/seed/bride/600/800",
  },
  journey: [
    { id: "1", title: "First Meeting", date: "Jan 15, 2025", description: "Our paths crossed at a mutual friend's gathering." },
    { id: "2", title: "Families Meet", date: "May 20, 2025", description: "Our families met and gave us their blessings." },
    { id: "3", title: "Engagement", date: "Aug 10, 2025", description: "We exchanged rings in a beautiful ceremony." },
    { id: "4", title: "The Nikah", date: "Dec 12, 2026", description: "In Sha Allah, we will tie the knot!" },
  ],
  ceremonies: [
    { id: "mehndi", name: "Mehndi", enabled: true, date: "10 Dec 2026", time: "6:00 PM", venue: "Grand Emerald Hall", mapUrl: "https://maps.app.goo.gl/default1", thumbnailUrl: "https://picsum.photos/seed/mehndi/800/600" },
    { id: "haldi", name: "Haldi", enabled: true, date: "11 Dec 2026", time: "10:00 AM", venue: "The Courtyard", mapUrl: "https://maps.app.goo.gl/default2", thumbnailUrl: "https://picsum.photos/seed/haldi/800/600" },
    { id: "nikah", name: "Nikah", enabled: true, date: "12 Dec 2026", time: "11:00 AM", venue: "Masjid Al-Noor", mapUrl: "https://maps.app.goo.gl/default3", thumbnailUrl: "https://picsum.photos/seed/nikah/800/600" },
    { id: "walima", name: "Walima", enabled: true, date: "13 Dec 2026", time: "7:00 PM", venue: "Royal Palace Resort", mapUrl: "https://maps.app.goo.gl/default4", thumbnailUrl: "https://picsum.photos/seed/walima/800/600" },
  ],
  quranVerse: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    english: "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your (hearts).",
    reference: "(Surah Ar-Rum, 30:21)"
  },
  dua: "O Allah, bless this marriage and let it be a means for us to draw closer to You in love and devotion. Grant us happiness, health, and endless blessings.",
  family: {
    brideFamily: ["Ali Khan (Brother)", "Sara Khan (Sister)", "Zara Khan (Aunt)"],
    groomFamily: ["Omar Ahmed (Brother)", "Sana Ahmed (Sister)", "Zaid Ahmed (Uncle)"],
  },
  gallery: [
    "https://picsum.photos/seed/wed1/800/1000",
    "https://picsum.photos/seed/wed2/1000/800",
    "https://picsum.photos/seed/wed3/800/800",
    "https://picsum.photos/seed/wed4/600/800",
    "https://picsum.photos/seed/wed5/1200/800",
    "https://picsum.photos/seed/wed6/800/1200"
  ],
  venue: {
    name: "Masjid Al-Noor",
    address: "123 Serenity Blvd, Peace City",
    mapUrl: "https://maps.google.com"
  },
  theme: {
    primaryColor: "#064e3b", // emerald-900
    secondaryColor: "#d4af37", // metallic gold
  }
};
