import type { Profile } from "./types";

export const profile: Profile = {
  name: "Martin Ignacio Zangl",
  shortName: "Martin Zangl",
  headline: "Senior Android & Mobile Engineer",
  location: "Valencia, Spain",
  summary:
    "I build reliable mobile products and developer-facing SDKs across Android, iOS, Flutter, and React Native.",
  longSummary: [
    "I am a senior software engineer with 15+ years of experience building mobile products and developer-facing SDKs for companies including PayPal, MercadoLibre, Checkout.com, and Swift Medical.",
    "My work sits where architecture, product delivery, and reliability meet: modernizing legacy systems without stopping delivery, improving performance on constrained devices, creating strong testing cultures, and keeping behavior consistent across platforms.",
    "I have delivered products across fintech, healthcare, IoT, education, social platforms, and gaming, while mentoring engineers and leading architecture workshops.",
  ],
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/martinzangl/",
      kind: "linkedin",
    },
    { label: "Primary GitHub", href: "https://github.com/mizangl", kind: "github" },
    {
      label: "Portfolio repository",
      href: "https://github.com/zanglmartin",
      kind: "portfolio",
    },
  ],
  education: {
    degree: "B.S. Information Systems Engineering",
    institution: "National Technological University",
    location: "Córdoba, Argentina",
  },
  spokenLanguages: [
    { language: "Spanish", proficiency: "Native speaker" },
    { language: "English", proficiency: "Full professional proficiency" },
    { language: "German", proficiency: "Limited working proficiency" },
    { language: "Italian", proficiency: "Limited working proficiency" },
  ],
  domains: ["Fintech", "Healthcare", "IoT", "Developer SDKs"],
  businessAreas: [
    { name: "Fintech", focus: "Payments, wallets & credit", detail: "Checkout.com · PayPal · MercadoLibre" },
    { name: "Healthcare", focus: "Clinical imaging & digital care", detail: "Swift Medical" },
    { name: "IoT", focus: "Connected mobility & embedded systems", detail: "E-bike platform · Arduino · GPS" },
    { name: "Consumer", focus: "Social, education & gaming", detail: "Words with Friends · university products" },
  ],
};
