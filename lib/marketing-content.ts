export const appStoreUrl = "https://apps.apple.com";

export const heroContent = {
  eyebrow: "Repetition-first Korean learning",
  title: "Learn Korean for real moments in Korea",
  description:
    "Study real phrases for cafes, restaurants, transit, hotels, and everyday life in Korea.",
  ctaPrimary: "Download on the App Store",
  ctaSecondary: "See how it works",
  sceneTags: ["Restaurants", "Cafes", "Transit", "Hotels", "Basics"],
  heroArt: "/marketing/hero/hero-desktop-iphone-light.webp",
};

export const navigationLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Scenes", href: "#scenes" },
  { label: "Download", href: "#download" },
];

export type SceneContent = {
  id: string;
  label: string;
  title: string;
  phrase: string;
  romanization: string;
  meaning: string;
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
    meaning: "Please give me the menu",
    copy: "Start comfortably the moment you sit down.",
    image: "/marketing/scenes/jinjja-kbbq-bg.webp",
    audio: "/marketing/audio/menu.wav",
  },
  {
    id: "cafe",
    label: "Cafe",
    title: "Order naturally in a cafe without overthinking",
    phrase: "따뜻한 거 주세요",
    romanization: "ttatteuthan geo juseyo",
    meaning: "A hot one, please",
    copy: "Useful at the counter when you need to order quickly.",
    image: "/marketing/scenes/jinjja-cafe-bg.webp",
    audio: "/marketing/audio/thank-you.wav",
  },
  {
    id: "transit",
    label: "Transit",
    title: "Move through stations when you need answers fast",
    phrase: "이거 어디로 가요?",
    romanization: "igeo eodiro gayo",
    meaning: "Where does this go?",
    copy: "Learn what helps when you need to move and ask fast.",
    image: "/marketing/scenes/jinjja-subway-bg.webp",
    audio: "/marketing/audio/take-photo.wav",
  },
  {
    id: "hotel",
    label: "Hotel",
    title: "Check in smoothly and keep travel interactions simple",
    phrase: "체크인하고 싶어요",
    romanization: "chekeuinhago sipeoyo",
    meaning: "I'd like to check in",
    copy: "Smooth out the essential parts of travel.",
    image: "/marketing/scenes/jinjja-hotel-bg.webp",
    audio: "/marketing/audio/reservation.wav",
  },
  {
    id: "basics",
    label: "Basics",
    title: "Build practical confidence for everyday Seoul moments",
    phrase: "이거 뭐예요?",
    romanization: "igeo mwoyeyo",
    meaning: "What is this?",
    copy: "One of the most useful phrases when you are learning in the real world.",
    image: "/marketing/scenes/jinjja-basics-bg.webp",
    audio: "/marketing/audio/hello.wav",
  },
];

export const howItWorksItems = [
  {
    stat: "2x",
    title: "Higher phrase recall",
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
    title: "Home",
    src: "/marketing/app/screen-home.png",
    alt: "Jinjja app home screen",
  },
  {
    title: "Study",
    src: "/marketing/app/screen-study.png",
    alt: "Jinjja study screen",
  },
  {
    title: "Browse",
    src: "/marketing/app/screen-browse.png",
    alt: "Jinjja browse screen",
  },
  {
    title: "Favorites",
    src: "/marketing/app/screen-favorites.png",
    alt: "Jinjja favorites screen",
  },
];

export const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "/support" },
];
