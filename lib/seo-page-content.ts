export type LandingFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type LandingScreenshot = {
  title: string;
  description: string;
  src: string;
  alt: string;
};

export type LandingPhrase = {
  label: string;
  phrase: string;
  romanization: string;
  meaning: string;
  note: string;
  audioSrc: string;
};

export type LandingFaq = {
  question: string;
  answer: string;
};

export type LandingPageContent = {
  slug: string;
  path: string;
  navLabel: string;
  linkLabel: string;
  metadataTitle: string;
  metadataDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroHighlights: string[];
  heroImage: string;
  heroImageAlt: string;
  heroScreen: LandingScreenshot;
  audienceTitle: string;
  audience: LandingFeature[];
  featureTitle: string;
  features: LandingFeature[];
  screenshotsTitle: string;
  screenshotsDescription: string;
  screenshots: LandingScreenshot[];
  phraseTitle: string;
  phraseDescription: string;
  phrases: LandingPhrase[];
  methodTitle: string;
  methodDescription: string;
  methodPoints: LandingFeature[];
  trustEyebrow: string;
  trustTitle: string;
  trustDescription: string;
  trustImage: string;
  trustImageAlt: string;
  trustQuote: string;
  faqs: LandingFaq[];
};

export const landingPages: LandingPageContent[] = [
  {
    slug: "korean-learning-app",
    path: "/korean-learning-app",
    navLabel: "Learn Korean",
    linkLabel: "Korean Learning App",
    metadataTitle: "Korean Learning App for Real-Life Conversations | Jjin",
    metadataDescription:
      "Jjin is a Korean learning app for iPhone focused on practical phrases, listening practice, Hangul support, and real-life conversations in Korea.",
    heroEyebrow: "Practical Korean for everyday life",
    heroTitle: "A Korean learning app built for real-life conversations",
    heroDescription:
      "Jjin helps you practice the Korean that shows up in cafes, restaurants, transit, hotels, and family visits instead of burying useful phrases inside generic classroom units.",
    heroHighlights: [
      "iPhone app for practical Korean",
      "Listening practice with readable Hangul",
      "Useful phrases for real moments in Korea",
    ],
    heroImage: "/marketing/screenshots/study-card-small.webp",
    heroImageAlt: "Jjin Korean learning app in a Korea street scene",
    heroScreen: {
      title: "Study screen",
      description:
        "Phrase practice pairs Hangul, romanization, and meaning so learners can hear and read together.",
      src: "/marketing/about/hangul-statue-seoul.webp",
      alt: "Jjin Korean learning app study screen",
    },
    audienceTitle: "Who this page is for",
    audience: [
      {
        title: "Beginners who want useful Korean",
        icon: "TbAlphabetKorean",
        description:
          "The app is designed for people who need phrases they can recognize and use quickly, not just broad topic coverage.",
      },
      {
        title: "Travelers preparing for Korea",
        icon: "MdAirplaneTicket",
        description:
          "Lessons cover transit, check-in, ordering, and the polite Korean that comes up repeatedly while traveling.",
      },
      {
        title: "Learners staying connected to family",
        icon: "FaEarListen",
        description:
          "Jjin is shaped around the pressure of hearing fast Korean and wanting to respond with more confidence.",
      },
    ],
    featureTitle: "What makes Jjin different",
    features: [
      {
        title: "Useful Korean comes first",
        icon: "CheckCircle2",
        description:
          "Content is organized around moments like ordering coffee, asking where to board, or getting through a hotel interaction.",
      },
      {
        title: "Listening and reading stay together",
        icon: "CheckCircle2",
        description:
          "You hear the phrase, see the Hangul, and review the meaning together so pronunciation and recognition support each other.",
      },
      {
        title: "The flow is built for recall",
        icon: "CheckCircle2",
        description:
          "Instead of long abstract lessons, the app emphasizes short loops that are easier to revisit and remember later.",
      },
    ],
    screenshotsTitle: "Inside the Korean learning experience",
    screenshotsDescription:
      "Jjin combines phrase study, category-based browsing, Hangul support, and conversation-oriented review instead of forcing one rigid learning path.",
    screenshots: [
      {
        title: "Categories",
        description:
          "Browse phrase groups by context so it is easy to practice the Korean you need next.",
        src: "/marketing/screenshots/categories-cards.webp",
        alt: "Jjin Korean learning categories screen",
      },
      {
        title: "Hangul basics",
        description:
          "Use the Hangul screen to get more comfortable reading Korean while you build phrase recall.",
        src: "/marketing/screenshots/hangul-basics.webp",
        alt: "Jjin Hangul basics screen",
      },
      {
        title: "Conversation review",
        description:
          "Conversation-focused practice keeps the app grounded in usable language instead of trivia.",
        src: "/marketing/screenshots/conversation-light.webp",
        alt: "Jjin Korean conversation review screen",
      },
    ],
    phraseTitle: "Examples of the Korean you can practice",
    phraseDescription:
      "The app is built around phrases that lower friction in real situations, especially when you need to hear quickly and respond politely.",
    phrases: [
      {
        label: "Basics",
        phrase: "안녕하세요",
        romanization: "annyeonghaseyo",
        meaning: "Hello",
        note: "A core polite greeting that belongs in every beginner’s first set.",
        audioSrc: "/marketing/audio/hello.wav",
      },
      {
        label: "Restaurant",
        phrase: "메뉴 좀 주세요",
        romanization: "menyu jom juseyo",
        meaning: "Please give me the menu",
        note: "Useful right away if you want practical dining phrases instead of generic food vocabulary lists.",
        audioSrc: "/marketing/audio/menu.wav",
      },
      {
        label: "Transit",
        phrase: "어디에서 타요?",
        romanization: "eodieseo tayo?",
        meaning: "Where do I board?",
        note: "A good example of the kind of Korean that matters when you are moving fast.",
        audioSrc: "/marketing/audio/eodieseo-tayo.wav",
      },
    ],
    methodTitle: "How the learning flow works",
    methodDescription:
      "Jjin is not trying to simulate a full classroom. It is designed to help you hear, recognize, and remember useful Korean with less friction.",
    methodPoints: [
      {
        title: "Start with a real scenario",
        icon: "FaMugHot",
        description:
          "Pick a category such as cafes, transit, or everyday courtesy instead of guessing what to study next.",
      },
      {
        title: "Pair audio with text",
        icon: "LuAudioLines",
        description:
          "Review the spoken phrase together with Hangul and a clear meaning so your ear and eye reinforce each other.",
      },
      {
        title: "Come back to the phrase later",
        icon: "TiArrowLoop",
        description:
          "Short repeated review helps turn a phrase from something you recognize once into something you can retrieve again.",
      },
    ],
    trustEyebrow: "Built from lived experience",
    trustTitle: "Designed around real Korean moments, not abstract lesson plans",
    trustDescription:
      "Jjin started from tracking which phrases kept coming up in Korea and which moments caused hesitation. That is why the app centers practical listening, useful phrase sets, and confidence in everyday interactions.",
    trustImage: "/marketing/about/travis-airport-incheon.webp",
    trustImageAlt: "Family moment in Korea that inspired the Jjin Korean learning app",
    trustQuote:
      "I built the app I wanted when broad, game-like language apps did not match the pressure of real conversations in Korea.",
    faqs: [
      {
        question: "Is Jjin a good Korean learning app for beginners?",
        answer:
          "Yes. Jjin is especially useful for beginners who want practical Korean and listening support instead of starting with broad curriculum coverage.",
      },
      {
        question: "Does Jjin only teach travel Korean?",
        answer:
          "No. Travel scenarios are a strong use case, but the app also supports everyday courtesy, basic conversation, and phrases useful during family visits or daily life in Korea.",
      },
      {
        question: "Does Jjin include Hangul support?",
        answer:
          "Yes. Hangul is part of the learning experience so learners can connect sound, script, and meaning together.",
      },
    ],
  },
  {
    slug: "learn-korean-for-travel",
    path: "/learn-korean-for-travel",
    navLabel: "Travel Korean",
    linkLabel: "Learn Korean for Travel",
    metadataTitle: "Learn Korean for Travel in Korea | Jjin",
    metadataDescription:
      "Use Jjin to learn Korean for travel in Korea with practical phrases for transit, hotels, cafes, restaurants, and polite everyday interactions.",
    heroEyebrow: "Travel Korean without the filler",
    heroTitle: "Learn Korean for travel in Korea with phrases you will actually use",
    heroDescription:
      "If your goal is to feel less lost at the airport, on the subway, at the hotel desk, or while ordering food, Jjin is built around those exact moments.",
    heroHighlights: [
      "Transit, hotels, cafes, and restaurants",
      "Polite Korean for first interactions",
      "Listening support for fast real-world speech",
    ],
    heroImage: "/marketing/screenshots/category-courtesy-light.webp",
    heroImageAlt: "Korean subway travel scene for a travel Korean landing page",
    heroScreen: {
      title: "Travel-friendly categories",
      description:
        "Browse into the practical situations most travelers want to study before and during a trip.",
      src: "/marketing/about/subway-station-seoul.webp",
      alt: "Jjin app categories for travel Korean phrases",
    },
    audienceTitle: "Best for learners who are getting ready for Korea",
    audience: [
      {
        title: "First-time visitors",
        icon: "MdAirplaneTicket",
        description:
          "Practice essential Korean before the trip so common interactions feel less intimidating once you arrive.",
      },
      {
        title: "Frequent travelers",
        icon: "FaPersonWalkingLuggage",
        description:
          "Revisit core phrases before each trip instead of rebuilding your memory from scratch.",
      },
      {
        title: "Travelers who care about politeness",
        icon: "LuSpeech",
        description:
          "Jjin focuses on usable phrases and respectful everyday Korean that help conversations start smoothly.",
      },
    ],
    featureTitle: "What this travel-focused page emphasizes",
    features: [
      {
        title: "Transit phrases you need quickly",
        icon: "CheckCircle2",
        description:
          "The app covers the kind of Korean that matters when you are trying to move through stations and ask for help fast.",
      },
      {
        title: "Ordering without overthinking",
        icon: "CheckCircle2",
        description:
          "Study phrases for cafes and restaurants so you can get through counters and table interactions more naturally.",
      },
      {
        title: "Hotel and arrival basics",
        icon: "CheckCircle2",
        description:
          "Keep travel logistics simple with phrases for check-in and polite first exchanges.",
      },
    ],
    screenshotsTitle: "What travel learners can expect inside the app",
    screenshotsDescription:
      "Jjin is structured so you can move from category selection to quick phrase review without feeling buried in broad curriculum content.",
    screenshots: [
      {
        title: "Conversation practice",
        description:
          "Review short phrases that matter in public and fast-moving situations.",
        src: "/marketing/screenshots/convo-snippet.webp",
        alt: "Jjin travel Korean conversation screen",
      },
      {
        title: "Study cards",
        description:
          "Listen, read, and revisit the phrase before you need it in the real world.",
        src: "/marketing/screenshots/study-card-small.webp",
        alt: "Jjin travel Korean study card screen",
      },
      {
        title: "Quiz review",
        description:
          "Use active review to check whether the phrase is sticking before your trip.",
        src: "/marketing/screenshots/quiz-light.webp",
        alt: "Jjin travel Korean quiz screen",
      },
    ],
    phraseTitle: "Travel Korean examples",
    phraseDescription:
      "These are the kinds of travel phrases that make a difference because they reduce stress at the exact moment you need them.",
    phrases: [
      {
        label: "Transit",
        phrase: "어디에서 타요?",
        romanization: "eodieseo tayo?",
        meaning: "Where do I board?",
        note: "A useful phrase when directions matter more than perfect grammar recall.",
        audioSrc: "/marketing/audio/eodieseo-tayo.wav",
      },
      {
        label: "Cafe",
        phrase: "포장해 주세요",
        romanization: "pojanghae juseyo",
        meaning: "To go, please",
        note: "One of those short cafe phrases that saves time immediately.",
        audioSrc: "/marketing/audio/pojanghae-juseyo.wav",
      },
      {
        label: "Hotel",
        phrase: "체크인",
        romanization: "chekeu in",
        meaning: "Check in",
        note: "Travel Korean often begins with confidence in the simplest interactions.",
        audioSrc: "/marketing/audio/chekeu-in.wav",
      },
    ],
    methodTitle: "How Jjin helps before and during a trip",
    methodDescription:
      "Travel learners usually need confidence, recall speed, and listening support more than a huge amount of theory. Jjin is designed around that reality.",
    methodPoints: [
      {
        title: "Study the likely situations first",
        icon: "FaMugHot",
        description:
          "Focus on travel categories before the trip and tighten the phrases that are most likely to come up.",
      },
      {
        title: "Use short listening loops",
        icon: "TiArrowLoop",
        description:
          "Replay phrases enough times to make them feel familiar before you hear them in context.",
      },
      {
        title: "Return to the app between outings",
        icon: "FaEarListen",
        description:
          "Travel learners can use quick review sessions to refresh the Korean they will need again later in the day.",
      },
    ],
    trustEyebrow: "Why the travel angle exists",
    trustTitle: "The phrase sets come from repeated moments in Korea",
    trustDescription:
      "The app’s travel value comes from narrowing in on what repeatedly matters in Korea rather than trying to simulate a perfect tourist phrasebook.",
    trustImage: "/marketing/about/kbbq-gwangju.webp",
    trustImageAlt: "Seoul subway station as a reference for travel Korean content",
    trustQuote:
      "The goal was never to cover every travel phrase. It was to surface the phrases that actually reduce hesitation when you are out in the world.",
    faqs: [
      {
        question: "Can Jjin help me learn Korean for a Korea trip?",
        answer:
          "Yes. Jjin is especially useful for visitors who want practical Korean for transit, hotels, ordering, and everyday courtesy.",
      },
      {
        question: "Is this better than a generic phrase list?",
        answer:
          "It can be. The app keeps phrases inside a learning flow with audio and repeated review instead of leaving them as a flat list to memorize once.",
      },
      {
        question: "Do I need to know Hangul first?",
        answer:
          "No. Hangul support is part of the app, so you can begin with practical phrase study while becoming more comfortable reading Korean over time.",
      },
    ],
  },
  {
    slug: "korean-listening-practice",
    path: "/korean-listening-practice",
    navLabel: "Listening",
    linkLabel: "Korean Listening Practice",
    metadataTitle: "Korean Listening Practice App for Beginners | Jjin",
    metadataDescription:
      "Jjin helps beginners practice Korean listening with audio-first phrase study, readable Hangul, and short review loops built for real conversations.",
    heroEyebrow: "Audio-first phrase learning",
    heroTitle: "Korean listening practice that stays grounded in useful phrases",
    heroDescription:
      "Jjin is for learners who freeze because they cannot catch spoken Korean fast enough. The app pairs audio, Hangul, and meaning so listening practice feels connected to real situations.",
    heroHighlights: [
      "Hear Korean before you have to say it",
      "Pair sound with Hangul and meaning",
      "Practice with short repeatable phrase sets",
    ],
    heroImage: "/marketing/screenshots/quiz-light.webp",
    heroImageAlt: "Night street scene in Korea representing listening practice in real environments",
    heroScreen: {
      title: "Audio-led study cards",
      description:
        "The core flow is built around hearing the phrase and recognizing it alongside the text.",
      src: "/marketing/about/gwangju-walking-night.webp",
      alt: "Jjin Korean listening practice study card screen",
    },
    audienceTitle: "Who this listening page is for",
    audience: [
      {
        title: "Learners who can read more than they can hear",
        icon: "TbAlphabetKorean",
        description:
          "If written Korean feels easier than spoken Korean, Jjin helps connect the two instead of isolating them.",
      },
      {
        title: "Beginners building pronunciation confidence",
        icon: "LuSpeech",
        description:
          "Audio-first review helps new learners become more familiar with how useful phrases sound in the wild.",
      },
      {
        title: "People preparing for real conversation pressure",
        icon: "FaEarListen",
        description:
          "The content is practical enough to matter when speech is fast and confidence is thin.",
      },
    ],
    featureTitle: "Why this listening approach works well",
    features: [
      {
        title: "Audio is part of the core experience",
        icon: "LuAudioLines",
        description:
          "Listening is not treated like an add-on. It is one of the first things the learner interacts with.",
      },
      {
        title: "Short phrases are easier to repeat",
        icon: "PiUserSoundBold",
        description:
          "You are not forced through long dialogues before building comfort with the sounds of everyday Korean.",
      },
      {
        title: "Useful context improves recall",
        icon: "FaMugHot",
        description:
          "Practicing a phrase for a cafe or subway station makes it easier to remember why the words matter.",
      },
    ],
    screenshotsTitle: "Listening practice inside Jjin",
    screenshotsDescription:
      "The app gives listening context through phrase cards, conversation screens, and guided review rather than dropping you into random audio clips.",
    screenshots: [
      {
        title: "Conversation review",
        description:
          "Hear phrases that fit everyday interaction patterns instead of isolated textbook examples.",
        src: "/marketing/screenshots/convo-snippet.webp",
        alt: "Jjin Korean listening conversation screen",
      },
      {
        title: "Quiz mode",
        description:
          "Check whether the phrase is becoming recognizable after repeated listening.",
        src: "/marketing/screenshots/quiz-light.webp",
        alt: "Jjin Korean listening quiz review screen",
      },
      {
        title: "Hangul support",
        description:
          "Reading support helps learners attach sounds to the written form instead of guessing.",
        src: "/marketing/screenshots/hangul-basics.webp",
        alt: "Jjin Hangul support for Korean listening practice",
      },
    ],
    phraseTitle: "Useful phrases for listening practice",
    phraseDescription:
      "Jjin uses short everyday phrases because they are easier to hear repeatedly and more likely to show up in real conversations.",
    phrases: [
      {
        label: "Basics",
        phrase: "실례합니다",
        romanization: "sillyehamnida",
        meaning: "Excuse me",
        note: "A polite phrase that becomes more useful the moment you can recognize it quickly by ear.",
        audioSrc: "/marketing/audio/sillyehamnida.wav",
      },
      {
        label: "Basics",
        phrase: "안녕하세요",
        romanization: "annyeonghaseyo",
        meaning: "Hello",
        note: "A foundational listening phrase that helps learners get comfortable with spoken Korean rhythm.",
        audioSrc: "/marketing/audio/hello.wav",
      },
      {
        label: "Cafe",
        phrase: "포장해 주세요",
        romanization: "pojanghae juseyo",
        meaning: "To go, please",
        note: "Short, high-frequency phrases are strong listening practice because they recur in real life.",
        audioSrc: "/marketing/audio/pojanghae-juseyo.wav",
      },
    ],
    methodTitle: "A simple listening-first method",
    methodDescription:
      "Jjin uses a lightweight pattern that keeps the learning loop short enough to repeat and relevant enough to remember.",
    methodPoints: [
      {
        title: "Hear the phrase clearly",
        icon: "GiSoundWaves",
        description:
          "Start by listening instead of relying on reading alone to do all the work.",
      },
      {
        title: "Anchor it with text",
        icon: "FaAnchorLock",
        description:
          "Use Hangul and translation to reinforce what you heard and reduce ambiguity.",
      },
      {
        title: "Review in a real-life category",
        icon: "IoSubway",
        description:
          "The surrounding context gives the sound a place to live, which makes it easier to retrieve later.",
      },
    ],
    trustEyebrow: "Why listening matters here",
    trustTitle: "Jjin was shaped by the moment hearing breaks confidence first",
    trustDescription:
      "A lot of language tools feel easier while reading than they do in actual interaction. Jjin was built around the gap between recognizing a phrase on the screen and understanding it when someone says it quickly.",
    trustImage: "/marketing/about/starfield-coex-library.webp",
    trustImageAlt: "Quiet Korea interior used for a Korean listening practice trust section",
    trustQuote:
      "Listening loops became the center of Jjin because hearing Korean quickly was the first place confidence usually fell apart.",
    faqs: [
      {
        question: "Is Jjin good for Korean listening practice?",
        answer:
          "Yes. The app is designed to pair audio, text, and meaning so spoken Korean becomes easier to catch and review.",
      },
      {
        question: "Is this only for advanced learners?",
        answer:
          "No. The app is intentionally useful for beginners who want to build listening confidence around shorter practical phrases.",
      },
      {
        question: "Does listening practice include Hangul support?",
        answer:
          "Yes. Hangul support helps learners connect what they hear with what they see, which is especially useful early on.",
      },
    ],
  },
  {
    slug: "learn-hangul",
    path: "/learn-hangul",
    navLabel: "Hangul",
    linkLabel: "Learn Hangul",
    metadataTitle: "Learn Hangul with an Audio Consonant and Vowel Chart | Jjin",
    metadataDescription:
      "Learn Hangul with Jjin's interactive Korean consonant and vowel chart, audio syllable practice, reading support, and beginner-friendly phrase lessons.",
    heroEyebrow: "Hangul chart plus practical study",
    heroTitle: "Learn Hangul sounds before they turn into useful Korean phrases",
    heroDescription:
      "Jjin helps learners connect Korean consonants, vowels, and syllable blocks with audio, then carry that reading confidence into practical phrase study.",
    heroHighlights: [
      "Interactive Hangul consonant and vowel chart",
      "Audio for each beginner syllable pairing",
      "Phrase study that connects script, sound, and meaning",
    ],
    heroImage: "/marketing/screenshots/hangul-basics.webp",
    heroImageAlt: "Hangul statue in Seoul for a learn Hangul page",
    heroScreen: {
      title: "Hangul basics screen",
      description:
        "The Hangul section helps learners get more comfortable with reading while still staying connected to useful language.",
      src: "/marketing/about/hangul-statue-seoul.webp",
      alt: "Jjin learn Hangul screen",
    },
    audienceTitle: "Who this page is for",
    audience: [
      {
        title: "Learners who want to stop depending only on romanization",
        icon: "RiEnglishInput",
        description:
          "Jjin helps bridge the gap between romanized text and reading actual Hangul with more confidence.",
      },
      {
        title: "Beginners who want script and phrases together",
        icon: "TbAlphabetKorean",
        description:
          "The app is useful if you do not want Hangul study to live in a completely separate lane from speaking and listening.",
      },
      {
        title: "People preparing to interact in Korea",
        icon: "LuSpeech",
        description:
          "Reading even a little Hangul makes signage, menus, and phrase recognition easier once you are in context.",
      },
    ],
    featureTitle: "Why Hangul support matters in Jjin",
    features: [
      {
        title: "Reading becomes less abstract",
        icon: "FaMugHot",
        description:
          "Seeing Hangul inside useful phrase study helps learners understand why the script matters beyond memorization drills.",
      },
      {
        title: "Audio reinforces what the script represents",
        icon: "LuAudioLines",
        description:
          "When script and sound are linked together, beginners can build more stable recognition.",
      },
      {
        title: "It supports long-term independence",
        icon: "PiUserSoundBold",
        description:
          "Hangul familiarity reduces dependence on romanization and makes it easier to notice patterns later on.",
      },
    ],
    screenshotsTitle: "What learning Hangul looks like in the app",
    screenshotsDescription:
      "Jjin gives Hangul space to be learned through consonants, vowels, and audio syllable blocks, but keeps it connected to real phrase practice so progress feels usable early.",
    screenshots: [
      {
        title: "Hangul basics chart",
        description:
          "Begin with consonants and vowels in a format that feels approachable instead of overwhelming.",
        src: "/marketing/screenshots/hangul-snippet.webp",
        alt: "Jjin Hangul basics learning screen",
      },
      {
        title: "Study cards",
        description:
          "Move from script support into phrase practice without changing tools.",
        src: "/marketing/screenshots/study-card-light.webp",
        alt: "Jjin Hangul and phrase study card screen",
      },
      {
        title: "Categories",
        description:
          "Use category-based navigation to practice Hangul inside everyday Korean contexts.",
        src: "/marketing/screenshots/category-courtesy-light.webp",
        alt: "Jjin categories screen for Hangul-supported phrase learning",
      },
    ],
    phraseTitle: "Hangul in useful context",
    phraseDescription:
      "A script is easier to care about when it is attached to phrases you can actually use or recognize later.",
    phrases: [
      {
        label: "Greeting",
        phrase: "안녕하세요",
        romanization: "annyeonghaseyo",
        meaning: "Hello",
        note: "A strong beginner phrase because it makes Hangul immediately relevant.",
        audioSrc: "/marketing/audio/hello.wav",
      },
      {
        label: "Courtesy",
        phrase: "실례합니다",
        romanization: "sillyehamnida",
        meaning: "Excuse me",
        note: "Seeing and hearing the phrase together helps learners move beyond only memorizing letters.",
        audioSrc: "/marketing/audio/sillyehamnida.wav",
      },
      {
        label: "Restaurant",
        phrase: "메뉴 좀 주세요",
        romanization: "menyu jom juseyo",
        meaning: "Please give me the menu",
        note: "Practical phrase study gives Hangul a real-world anchor.",
        audioSrc: "/marketing/audio/menu.wav",
      },
    ],
    methodTitle: "A gentler way to start reading Korean",
    methodDescription:
      "The goal is not to force script drills in isolation. It is to make Hangul easier to revisit through audio pairings, useful lessons, and repeatable practice.",
    methodPoints: [
      {
        title: "Learn the script in an approachable way",
        icon: "TbAlphabetKorean",
        description:
          "Use Hangul basics to start recognizing common forms and sounds without needing a full textbook sequence first.",
      },
      {
        title: "See Hangul inside phrases",
        icon: "TbBowlChopsticks",
        description:
          "Apply the script to useful Korean so reading feels connected to communication instead of detached from it.",
      },
      {
        title: "Reduce reliance on romanization over time",
        icon: "RiEnglishInput",
        description:
          "The app gives a path toward more direct recognition as comfort with Hangul grows.",
      },
    ],
    trustEyebrow: "Why Hangul is part of Jjin",
    trustTitle: "Reading support exists because hearing and seeing Korean work better together",
    trustDescription:
      "Jjin treats Hangul as a support layer for confidence, not as a box to check before practical Korean begins. That makes it easier for beginners to keep going.",
    trustImage: "/marketing/about/hanok-village-seoul.webp",
    trustImageAlt: "Seoul cafe scene for a learn Hangul page",
    trustQuote:
      "The best early Hangul practice is the kind that stays connected to phrases you genuinely care about using.",
    faqs: [
      {
        question: "Can I use Jjin to learn Hangul as a beginner?",
        answer:
          "Yes. The app includes Hangul support and an audio chart for core Korean consonant and vowel pairings, then makes reading part of the broader learning flow.",
      },
      {
        question: "Does the Hangul chart include audio?",
        answer:
          "Yes. Each visible syllable tile can be played on its own, and autoplay reads the current consonant or vowel set in order.",
      },
      {
        question: "Do I need to finish Hangul before learning phrases?",
        answer:
          "No. Jjin is designed so script familiarity and practical phrase study can support each other from the start.",
      },
      {
        question: "Is romanization still available?",
        answer:
          "Yes. Jjin can help learners transition gradually rather than expecting immediate comfort with Hangul alone.",
      },
    ],
  },
  {
    slug: "korean-phrases-app",
    path: "/korean-phrases-app",
    navLabel: "Phrases",
    linkLabel: "Korean Phrases App",
    metadataTitle: "Korean Phrases App for Everyday Situations | Jjin",
    metadataDescription:
      "Jjin is a Korean phrases app for iPhone with practical Korean for cafes, restaurants, transit, hotels, and everyday conversations in Korea.",
    heroEyebrow: "Phrase practice with real context",
    heroTitle: "A Korean phrases app for everyday situations in Korea",
    heroDescription:
      "Jjin is built around phrase sets that are actually useful when you are ordering, asking for help, moving through a station, or trying to speak more naturally with family and locals.",
    heroHighlights: [
      "Everyday phrases, not random lists",
      "Useful categories for real situations",
      "Audio support for better recall",
    ],
    heroImage: "/marketing/screenshots/conversation-light.webp",
    heroImageAlt: "Cafe scene in Korea representing an everyday Korean phrases app",
    heroScreen: {
      title: "Phrase categories",
      description:
        "The app is organized around phrase sets that make sense in real life, so review is easier to aim.",
      src: "/marketing/scenes/jjin-cafe-bg.webp",
      alt: "Jjin Korean phrases categories screen",
    },
    audienceTitle: "Who wants a Korean phrases app like this",
    audience: [
      {
        title: "Learners who want fast practical value",
        icon: "CheckCircle2",
        description:
          "This page is for people who care more about useful phrase recall than completing a huge language syllabus.",
      },
      {
        title: "Travelers and everyday learners",
        icon: "CheckCircle2",
        description:
          "Phrase categories help both short-term travel prep and longer-term practical study.",
      },
      {
        title: "People who need context, not just vocabulary",
        icon: "CheckCircle2",
        description:
          "Jjin keeps phrases inside scenes that are easier to imagine and remember later.",
      },
    ],
    featureTitle: "What makes these phrase sets useful",
    features: [
      {
        title: "They map to repeatable situations",
        icon: "CheckCircle2",
        description:
          "Restaurants, cafes, transit, hotels, and courtesy all come up often enough to justify repeated practice.",
      },
      {
        title: "They are short enough to review quickly",
        icon: "CheckCircle2",
        description:
          "A phrase app works best when the review is light enough to fit into real life, not just ideal study sessions.",
      },
      {
        title: "They support listening and speaking confidence",
        icon: "CheckCircle2",
        description:
          "Audio review helps the phrase feel more usable when it finally comes up in conversation.",
      },
    ],
    screenshotsTitle: "How the phrase app is organized",
    screenshotsDescription:
      "Jjin combines category browsing, phrase cards, and review screens so useful Korean does not stay trapped as passive reading.",
    screenshots: [
      {
        title: "Phrase study",
        description:
          "Focus on one useful phrase at a time with clear reading support and meaning.",
        src: "/marketing/screenshots/subway-card-related.webp",
        alt: "Jjin Korean phrases study screen",
      },
      {
        title: "Conversation screen",
        description:
          "Phrase practice stays close to how Korean is actually used in everyday interactions.",
        src: "/marketing/screenshots/conversation-light.webp",
        alt: "Jjin Korean phrases conversation practice screen",
      },
      {
        title: "Quiz review",
        description:
          "Use active review to move a phrase from familiar to retrievable.",
        src: "/marketing/screenshots/quiz-light.webp",
        alt: "Jjin Korean phrases quiz review screen",
      },
    ],
    phraseTitle: "Sample phrase sets inside Jjin",
    phraseDescription:
      "These examples show the kind of Korean the app prioritizes: short, polite, and tied to situations that happen often enough to matter.",
    phrases: [
      {
        label: "Cafe",
        phrase: "포장해 주세요",
        romanization: "pojanghae juseyo",
        meaning: "To go, please",
        note: "A short phrase that is genuinely useful when ordering quickly.",
        audioSrc: "/marketing/audio/pojanghae-juseyo.wav",
      },
      {
        label: "Restaurant",
        phrase: "메뉴 좀 주세요",
        romanization: "menyu jom juseyo",
        meaning: "Please give me the menu",
        note: "A practical phrase that makes it obvious why scene-based learning works.",
        audioSrc: "/marketing/audio/menu.wav",
      },
      {
        label: "Courtesy",
        phrase: "실례합니다",
        romanization: "sillyehamnida",
        meaning: "Excuse me",
        note: "Courtesy phrases do a lot of work in real life and belong near the top of a useful phrase app.",
        audioSrc: "/marketing/audio/sillyehamnida.wav",
      },
    ],
    methodTitle: "How to use a Korean phrases app well",
    methodDescription:
      "The best phrase practice is targeted, repeated, and tied to context. Jjin is structured around those three ideas.",
    methodPoints: [
      {
        title: "Choose a context first",
        icon: "CheckCircle2",
        description:
          "Start with the phrases that match your next real situation instead of browsing endless ungrouped lists.",
      },
      {
        title: "Repeat the phrases out loud or by ear",
        icon: "CheckCircle2",
        description:
          "Use audio support to improve familiarity, especially if spoken Korean is still hard to catch.",
      },
      {
        title: "Review the same phrase later",
        icon: "CheckCircle2",
        description:
          "Quick return visits matter more than a single long memorization session.",
      },
    ],
    trustEyebrow: "Why phrase sets lead Jjin",
    trustTitle: "Phrase-first design came from tracking what kept coming up",
    trustDescription:
      "Instead of pretending every topic matters equally, Jjin leans into the Korean that repeatedly shows up in ordinary life. That is what makes a phrases app actually useful.",
    trustImage: "/marketing/about/sundae-seoul.webp",
    trustImageAlt: "Everyday Seoul dining scene used on a Korean phrases app page",
    trustQuote:
      "A phrase set becomes valuable when it matches a moment that keeps happening. That is the filter the app uses.",
    faqs: [
      {
        question: "Is Jjin mainly a Korean phrases app?",
        answer:
          "Yes. Jjin is especially strong for learners who want practical Korean phrase practice organized around real situations.",
      },
      {
        question: "Does the app include audio for phrases?",
        answer:
          "Yes. Audio is part of the learning flow so phrases are easier to recognize and review by ear.",
      },
      {
        question: "Are the phrase categories useful for travel too?",
        answer:
          "Yes. Many of the categories are directly useful for visitors in Korea, including cafes, restaurants, transit, hotels, and courtesy.",
      },
    ],
  },
];

export const landingPageSummaries = landingPages.map((page) => ({
  path: page.path,
  title: page.linkLabel,
  navLabel: page.navLabel,
  description: page.metadataDescription,
  heroImage: page.heroImage,
  heroImageAlt: page.heroImageAlt,
}));

export function getLandingPageBySlug(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}

export function getRequiredLandingPageBySlug(slug: string): LandingPageContent {
  const page = getLandingPageBySlug(slug);

  if (!page) {
    throw new Error(`Missing content for landing page slug: ${slug}`);
  }

  return page;
}
