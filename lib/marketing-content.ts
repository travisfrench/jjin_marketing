export const appStoreUrl = "https://apps.apple.com/us/app/jjin-learn-korean/id6760714406";

export const heroContent = {
  eyebrow: "Listen. Repeat. Learn.",
  title: "Learn Korean for real Korea moments",
  description:
    "Audio driven, repetition-first Korean learning.",
  ctaPrimary: "Download on the App Store",
  ctaSecondary: "See how it works",
  sceneTags: ["Restaurants", "Cafes", "Transit", "Hotels", "Basics"],
  heroArt: "/marketing/hero/jjin-hero-full-sky.webp",
};

export const navigationLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "/support" },
];

export type SceneContent = {
  id: string;
  label: string;
  title: string;
  phrase: string;
  romanization: string;
  meaning: string;
  pills: string[];
  copy: string;
  image: string;
  audio: string;
};

export const scenes: SceneContent[] = [
  {
    id: "restaurant",
    label: "Restaurant",
    title: "Handle your first table interaction with confidence",
    phrase: "메뉴 좀 주세요",
    romanization: "menyu jom juseyo",
    meaning: "Let me look at the menu",
    pills: ["Dining", "Menu", "Confidence"],
    copy: "Start comfortably the moment you sit down.",
    image: "/marketing/scenes/jjin-kbbq-bg.webp",
    audio: "/marketing/audio/menu.wav",
  },
  {
    id: "cafe",
    label: "Cafe",
    title: "Order naturally in a cafe without overthinking",
    phrase: "포장해 주세요",
    romanization: "pojanghae juseyo",
    meaning: "To go please",
    pills: ["Ordering", "Takeout", "Speed"],
    copy: "Useful at the counter when you need to order quickly.",
    image: "/marketing/scenes/jjin-cafe-bg.webp",
    audio: "/marketing/audio/pojanghae-juseyo.wav",
  },
  {
    id: "transit",
    label: "Transit",
    title: "Move through stations when you need answers fast",
    phrase: "어디에서 타요?",
    romanization: "eodieseo tayo?",
    meaning: "Where do I board?",
    pills: ["Subway", "Directions", "Urgent"],
    copy: "Learn what helps when you need to move and ask fast.",
    image: "/marketing/scenes/jjin-subway-bg.webp",
    audio: "/marketing/audio/eodieseo-tayo.wav",
  },
  {
    id: "hotel",
    label: "Hotel",
    title: "Check in smoothly and keep travel interactions simple",
    phrase: "체크인",
    romanization: "Chekeu in",
    meaning: "Check in",
    pills: ["Traveling", "Arrival", "Polite"],
    copy: "Smooth out the essential parts of travel.",
    image: "/marketing/scenes/jjin-hotel-bg.webp",
    audio: "/marketing/audio/chekeu-in.wav",
  },
  {
    id: "basics",
    label: "Basics",
    title: "Build practical confidence for everyday Seoul moments",
    phrase: "실례합니다",
    romanization: "sillyehamnida",
    meaning: "Excuse me",
    pills: ["Conversation", "Everyday", "Respectful"],
    copy: "One of the most useful phrases when you are learning in the real world.",
    image: "/marketing/scenes/jjin-basics-bg.webp",
    audio: "/marketing/audio/sillyehamnida.wav",
  },
];

export const howItWorksItems = [
  {
    stat: "2x",
    title: "Higher phrase retention",
    description:
      "Learners retained roughly twice as many target phrases when audio and text were reviewed together.",
  },
  {
    stat: "38%",
    title: "Better pronunciation confidence",
    description:
      "Paired listening + reading reduced hesitation and improved confidence before speaking in real situations.",
  },
  {
    stat: "72%",
    title: "Faster first-response speed",
    description:
      "Most learners responded faster after repeated listen-while-read loops compared with reading-only drills.",
  },
];

export const appScreens = [
  // Swap these files with final app screenshots while keeping the same paths.
  {
    title: "Study",
    src: "/marketing/screenshots/study-card-light.webp",
    alt: "Jjin app home screen",
  },
  {
    title: "Categories",
    src: "/marketing/screenshots/category-courtesy-light.webp",
    alt: "Jjin study screen",
  },
  {
    title: "Hangul Basics",
    src: "/marketing/screenshots/hangul-basics.webp",
    alt: "Jjin Hangul basics screen",
  },
  {
    title: "Quiz",
    src: "/marketing/screenshots/quiz-light.webp",
    alt: "Jjin browse screen",
  },
  {
    title: "Conversation",
    src: "/marketing/screenshots/conversation-light.webp",
    alt: "Jjin favorites screen",
  },
];

export const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "/support" },
];
