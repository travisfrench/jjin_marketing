export { appStoreUrl } from "@/lib/site-config";

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
  { label: "Learn Korean", href: "/korean-learning-app" },
  { label: "Phrases", href: "/korean-phrases" },
  { label: "Hangul Basics", href: "/learn-hangul" },
  { label: "Travel", href: "/learn-korean-for-travel" },
  { label: "Listening", href: "/korean-listening-practice" },
  { label: "About", href: "/about" },
];

export const phraseCategoryLinks = [
  { label: "Greetings", href: "/korean-phrases/greeting" },
  { label: "Courtesy", href: "/korean-phrases/courtesy" },
  { label: "Restaurant", href: "/korean-phrases/restaurant" },
  { label: "Cafe", href: "/korean-phrases/cafe" },
  { label: "Transit", href: "/korean-phrases/transit" },
  { label: "Hotel", href: "/korean-phrases/hotel" },
  { label: "Shopping", href: "/korean-phrases/shopping" },
  { label: "Directions", href: "/korean-phrases/directions" },
  { label: "Emergency", href: "/korean-phrases/emergency" },
];

export type SceneContent = {
  id: string;
  label: string;
  categoryHref: string;
  phraseHref?: string;
  title: string;
  phrase: string;
  romanization: string;
  meaning: string;
  pills: string[];
  pillLinks: { label: string; href: string }[];
  copy: string;
  image: string;
  audio: string;
};

export const scenes: SceneContent[] = [
  {
    id: "restaurant",
    label: "Restaurant",
    categoryHref: "/korean-phrases/restaurant",
    title: "Handle your first table interaction with confidence",
    phrase: "메뉴 좀 주세요",
    romanization: "menyu jom juseyo",
    meaning: "Let me look at the menu",
    pills: ["Dining", "Menu", "Confidence"],
    pillLinks: [
      { label: "Dining", href: "/korean-phrases/restaurant" },
      { label: "Menu", href: "/korean-phrases/restaurant" },
      { label: "Confidence", href: "/korean-learning-app" },
    ],
    copy: "Start comfortably the moment you sit down.",
    image: "/marketing/scenes/jjin-kbbq-bg.webp",
    audio: "/marketing/audio/menu.wav",
  },
  {
    id: "cafe",
    label: "Cafe",
    categoryHref: "/korean-phrases/cafe",
    title: "Order naturally in a cafe without overthinking",
    phrase: "포장해 주세요",
    romanization: "pojanghae juseyo",
    meaning: "To go please",
    pills: ["Ordering", "Takeout", "Speed"],
    pillLinks: [
      { label: "Ordering", href: "/korean-phrases/cafe" },
      { label: "Takeout", href: "/korean-phrases/cafe" },
      { label: "Speed", href: "/korean-listening-practice" },
    ],
    copy: "Useful at the counter when you need to order quickly.",
    image: "/marketing/scenes/jjin-cafe-bg.webp",
    audio: "/marketing/audio/pojanghae-juseyo.wav",
  },
  {
    id: "transit",
    label: "Transit",
    categoryHref: "/korean-phrases/transit",
    title: "Move through stations when you need answers fast",
    phrase: "어디에서 타요?",
    romanization: "eodieseo tayo?",
    meaning: "Where do I board?",
    pills: ["Subway", "Directions", "Urgent"],
    pillLinks: [
      { label: "Subway", href: "/korean-phrases/transit" },
      { label: "Directions", href: "/korean-phrases/directions" },
      { label: "Urgent", href: "/korean-phrases/emergency" },
    ],
    copy: "Learn what helps when you need to move and ask fast.",
    image: "/marketing/scenes/jjin-subway-bg.webp",
    audio: "/marketing/audio/eodieseo-tayo.wav",
  },
  {
    id: "hotel",
    label: "Hotel",
    categoryHref: "/korean-phrases/hotel",
    phraseHref: "/phrases/check-in-in-korean",
    title: "Check in smoothly and keep travel interactions simple",
    phrase: "체크인",
    romanization: "Chekeu in",
    meaning: "Check in",
    pills: ["Traveling", "Arrival", "Polite"],
    pillLinks: [
      { label: "Traveling", href: "/learn-korean-for-travel" },
      { label: "Arrival", href: "/korean-phrases/hotel" },
      { label: "Polite", href: "/korean-phrases/courtesy" },
    ],
    copy: "Smooth out the essential parts of travel.",
    image: "/marketing/scenes/jjin-hotel-bg.webp",
    audio: "/marketing/audio/chekeu-in.wav",
  },
  {
    id: "basics",
    label: "Basics",
    categoryHref: "/korean-phrases/courtesy",
    phraseHref: "/phrases/excuse-me-in-korean",
    title: "Build practical confidence for everyday Seoul moments",
    phrase: "실례합니다",
    romanization: "sillyehamnida",
    meaning: "Excuse me",
    pills: ["Conversation", "Everyday", "Respectful"],
    pillLinks: [
      { label: "Conversation", href: "/korean-phrases/courtesy" },
      { label: "Everyday", href: "/korean-learning-app" },
      { label: "Respectful", href: "/korean-phrases/courtesy" },
    ],
    copy: "One of the most useful phrases when you are learning in the real world.",
    image: "/marketing/scenes/jjin-basics-bg.webp",
    audio: "/marketing/audio/sillyehamnida.wav",
  },
];

export const howItWorksItems = [
  {
    stat: "Listen",
    title: "Hear Korean before you need to answer",
    description:
      "Lessons pair spoken Korean with readable text so sound, script, and meaning reinforce each other in one study loop.",
  },
  {
    stat: "Repeat",
    title: "Practice phrases you can actually use",
    description:
      "Jjin is organized around cafes, transit, hotels, courtesy, and everyday interactions instead of broad topic buckets.",
  },
  {
    stat: "Learn",
    title: "Build recall through short review loops",
    description:
      "Short, repeatable phrase study makes it easier to revisit the Korean that keeps coming up in real life.",
  },
];

export const appScreens = [
  // Swap these files with final app screenshots while keeping the same paths.
  {
    title: "Study",
    src: "/marketing/screenshots/study-card-light.webp",
    alt: "Jjin Korean study card screen",
  },
  {
    title: "Categories",
    src: "/marketing/screenshots/category-courtesy-light.webp",
    alt: "Jjin Korean phrase categories screen",
  },
  {
    title: "Hangul Basics",
    src: "/marketing/screenshots/hangul-basics.webp",
    alt: "Jjin Hangul basics learning screen",
  },
  {
    title: "Quiz",
    src: "/marketing/screenshots/quiz-light.webp",
    alt: "Jjin Korean quiz review screen",
  },
  {
    title: "Conversation",
    src: "/marketing/screenshots/conversation-light.webp",
    alt: "Jjin Korean conversation review screen",
  },
];

export const footerLinks = [
  { label: "Korean Learning App", href: "/korean-learning-app" },
  { label: "Korean Phrase Library", href: "/korean-phrases" },
  { label: "Travel Korean", href: "/learn-korean-for-travel" },
  { label: "Listening Practice", href: "/korean-listening-practice" },
  { label: "Hangul Basics", href: "/learn-hangul" },
  { label: "Korean Phrases", href: "/korean-phrases-app" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const footerLinkSections = [
  {
    title: "Learn Korean",
    links: [
      { label: "All Korean Phrases", href: "/korean-phrases" },
      ...phraseCategoryLinks,
    ],
  },
  {
    title: "Study",
    links: [
      { label: "Korean Learning App", href: "/korean-learning-app" },
      { label: "Hangul Basics", href: "/learn-hangul" },
      { label: "Travel Korean", href: "/learn-korean-for-travel" },
      { label: "Listening Practice", href: "/korean-listening-practice" },
      { label: "Korean Phrases App", href: "/korean-phrases-app" },
    ],
  },
  {
    title: "Jjin",
    links: [
      { label: "About", href: "/about" },
      { label: "Support", href: "/support" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
