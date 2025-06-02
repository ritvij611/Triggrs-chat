const PAYMENT_FREQUENCIES = ["monthly", "halfyearly", "yearly"];
const TIERS = [
  {
    id: "individuals",
    name: "Individuals",
    price: {
      monthly: "Free",
      halfyearly: "Free",
      yearly: "Free",
    },
    description: "For your hobby projects",
    features: [
      "Free email alerts",
      "3-minute checks",
      "Automatic data enrichment",
      "10 monitors",
      "Up to 3 seats",
    ],
    cta: "Get started",
  },
  {
    id: "teams",
    name: "Teams",
    price: {
      monthly: 90,
      halfyearly: 80,
      yearly: 75,
    },
    description: "Great for small businesses",
    features: [
      "Unlimited phone calls",
      "30 second checks",
      "Single-user account",
      "20 monitors",
      "Up to 6 seats",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    id: "organizations",
    name: "Organizations",
    price: {
      monthly: 120,
      halfyearly: 110,
      yearly: 100,
    },
    description: "Great for large businesses",
    features: [
      "Unlimited phone calls",
      "15 second checks",
      "Single-user account",
      "50 monitors",
      "Up to 10 seats",
    ],
    cta: "Get started",
  }
  // {
  //   id: "enterprise",
  //   name: "Enterprise",
  //   price: {
  //     monthly: "Custom",
  //     halfyearly: "Custom",
  //     yearly: "Custom",
  //   },
  //   description: "For multiple teams",
  //   features: [
  //     "Everything in Organizations",
  //     "Up to 5 team members",
  //     "100 monitors",
  //     "15 status pages",
  //     "200+ integrations",
  //   ],
  //   cta: "Contact Us",
  //   highlighted: true,
  // },
];


export {TIERS, PAYMENT_FREQUENCIES};