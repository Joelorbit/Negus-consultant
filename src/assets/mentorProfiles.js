const profileAsset = "/assets/mentor-profiles";

export const mentorProfiles = [
  {
    name: "Leulseged Tafere",
    location: "Bahir Dar, Ethiopia",
    cardImage: `${profileAsset}/sessions/leulseged-menen-speaking.jpg`,
    cardImageAlt: "Leulseged speaking during a scholarship session at Menen School",
    summary:
      "Leulseged applied to liberal arts colleges, business schools, and research universities, earning offers from all three. He now teaches scholarship sessions in Ethiopian high schools, covering where to apply, how the Common App works, and how to choose the right universities.",
    admissions: [
      "Howard University · Mathematics, Fall 2026",
      "Sarah Lawrence College · Class of 2029, Early Action",
      "Hult International Business School · BBA (conditional)",
      "Also admitted to Georgetown and four other schools",
    ],
    letters: [
      {
        title: "Sarah Lawrence College",
        image: `${profileAsset}/letters/leulseged-sarah-lawrence.jpg`,
      },
      {
        title: "Hult International Business School",
        image: `${profileAsset}/letters/leulseged-hult.jpg`,
      },
      {
        title: "Howard University",
        image: `${profileAsset}/letters/leulseged-howard.jpg`,
      },
    ],
    sessions: [
      {
        title: "Menen Secondary Female Boarding School · Scholarship session",
        image: `${profileAsset}/sessions/leulseged-menen-speaking.jpg`,
      },
      {
        title: "Menen Secondary Female Boarding School · Student audience",
        image: `${profileAsset}/sessions/leulseged-menen-audience.jpg`,
      },
      {
        title: "Seattle Academy · Classroom lesson",
        image: `${profileAsset}/sessions/leulseged-seattle-academy-lesson.jpg`,
      },
      {
        title: "Seattle Academy · Student audience",
        image: `${profileAsset}/sessions/leulseged-seattle-academy-audience.jpg`,
      },
    ],
  },
  {
    name: "Abrham Sinshaw",
    location: "Merawi, Ethiopia",
    cardImage: `${profileAsset}/letters/abrham-howard.jpg`,
    cardImageAlt: "Abrham Sinshaw's Howard University admission letter",
    cardImageIsDocument: true,
    summary:
      "Abrham got into computer science programs in the United States and at NYU Shanghai. He writes Negus Consultants' guides on financial aid forms, application portals, and building a realistic college list.",
    admissions: [
      "Howard University · Computer Science, Fall 2024, merit scholarship",
      "NYU Shanghai · Class of 2028",
    ],
    letters: [
      {
        title: "Howard University",
        image: `${profileAsset}/letters/abrham-howard.jpg`,
      },
      {
        title: "NYU Shanghai",
        image: `${profileAsset}/letters/abrham-nyu-shanghai.jpg`,
      },
    ],
    sessions: [],
  },
];
