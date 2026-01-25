import type { Product } from "../types/product";

// Single pack main images (cards)
import ProductImg11 from "@/assets/products/ProductImg11.png";
import ProductImg22 from "@/assets/products/ProductImg22.png";
import ProductImg33 from "@/assets/products/ProductImg33.png";
import ProductImg44 from "@/assets/products/ProductImg44.png";
import ProductImg55 from "@/assets/products/ProductImg55.png";

// Single pack extra gallery images
import ragi1 from "@/assets/products/ragi-1.png";
import ragi2 from "@/assets/products/ragi-2.png";
import ragi3 from "@/assets/products/ragi-3.png";
import ragi4 from "@/assets/products/ragi-4.png";

import jowar1 from "@/assets/products/jowar-1.png";
import jowar2 from "@/assets/products/jowar-2.png";
import jowar3 from "@/assets/products/jowar-3.png";
import jowar4 from "@/assets/products/jowar-4.png";

import bajra1 from "@/assets/products/bajra-1.png";
import bajra2 from "@/assets/products/bajra-2.png";
import bajra3 from "@/assets/products/bajra-3.png";
import bajra4 from "@/assets/products/bajra-4.png";

import multi1 from "@/assets/products/multi-1.png";
import multi2 from "@/assets/products/multi-2.png";
import multi3 from "@/assets/products/multi-3.png";
import multi4 from "@/assets/products/multi-4.png";

import foxtail1 from "@/assets/products/foxtail-1.png";
import foxtail2 from "@/assets/products/foxtail-2.png";
import foxtail3 from "@/assets/products/foxtail-3.png";
import foxtail4 from "@/assets/products/foxtail-4.png";

// Combo pack main images
import ComboImg from "@/assets/combos/ComboImg.png";
import Combo1 from "@/assets/combos/Combo1.png";
import Combo2 from "@/assets/combos/Combo2.png";
import Combo3 from "@/assets/combos/Combo3.png";
import Combo4 from "@/assets/combos/Combo4.png";

export const products: Product[] = [
  // 🔥 GUT (Ragi) - ID: 1
  {
    id: 1,
    name: "Gut",
    subtitle: "Functional Millet Cookies",
    price: 249,
    rating: 4.9,
    reviews: 128,
    benefit: "Digestion . Microbiome . Comfort",
    description: "Good for health",
    tags: ["Kids Favorite", "High Calcium"],
    ingredients: [
      "Organic Ragi (Finger Millet) Flour",
      "Jaggery",
      "Desi Ghee",
      "Almonds",
      "Cardamom",
      "Rock Salt",
    ],
    nutrition: [
      { label: "Calories", value: "120 kcal" },
      { label: "Protein", value: "3g" },
      { label: "Fibre", value: "4g" },
      { label: "Iron", value: "15% DV" },
      { label: "Calcium", value: "20% DV" },
    ],
    mrp: 299,
    discount: 17,
    premiumPrice: 239,
    image: ProductImg11,
    images: [ragi1, ragi2, ragi3, ragi4],
    
    // 🔥 GUT SPECIFIC FAQs
    faqs: [
      { question: "How many cookies per day?", answer: "2-3 cookies daily as evening snack." },
      { question: "Safe for kids?", answer: "Yes! Perfect for kids above 3 years." },
      { question: "Helps with constipation?", answer: "Yes, high fibre content aids digestion." },
      { question: "Storage instructions?", answer: "Cool dry place. Shelf life: 4 months." },
      { question: "Is it gluten free?", answer: "100% gluten free - pure ragi flour." },
      { question: "Can diabetics eat?", answer: "Yes, low GI with jaggery sweetener." }
    ],
    
    productReviews: [
      { name: "Siddharth", rating: 5, comment: "Gut cookies digestion super!", productAspect: "Packaging", timeAgo: "2 months ago" },
      { name: "Shankar", rating: 5, comment: "Best for microbiome health!", productAspect: "Digestion", timeAgo: "1 month ago" },
      { name: "Lakshmi", rating: 4, comment: "Kids love the taste!", productAspect: "Taste", timeAgo: "3 weeks ago" }
    ],
    ratingData: [
      { stars: 5, count: 110, percentage: 86 },
      { stars: 4, count: 12, percentage: 9 },
      { stars: 3, count: 4, percentage: 3 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 }
    ],
    totalReviews: 128,
    avgRating: 4.9
  },

  // 🔥 BRAIN (Jowar) - ID: 2
  {
    id: 2,
    name: "Brain",
    subtitle: "Functional Millet Cookies",
    price: 229,
    rating: 4.8,
    reviews: 96,
    benefit: "Heart Friendly",
    description: "Low GI, high fibre cookies ideal for maintaining steady energy levels.",
    tags: ["Low GI", "High Fibre"],
    ingredients: [
      "Organic Jowar (Sorghum) Flour",
      "Coconut Sugar",
      "Cold-Pressed Coconut Oil",
      "Cashews",
      "Cinnamon",
      "Pink Salt",
    ],
    nutrition: [
      { label: "Calories", value: "115 kcal" },
      { label: "Protein", value: "2.5g" },
      { label: "Fibre", value: "5g" },
      { label: "Carbs", value: "18g" },
      { label: "Sugar", value: "6g" },
    ],
    mrp: 279,
    discount: 18,
    premiumPrice: 219,
    image: ProductImg22,
    images: [jowar1, jowar2, jowar3, jowar4],
    
    // 🔥 BRAIN SPECIFIC FAQs
    faqs: [
      { question: "Helps with focus?", answer: "Yes! Jowar provides steady energy for brain." },
      { question: "Best time to eat?", answer: "Morning breakfast or afternoon snack." },
      { question: "Memory improvement?", answer: "Regular consumption supports cognitive health." },
      { question: "No refined sugar?", answer: "Uses coconut sugar - natural low GI." },
      { question: "How many daily?", answer: "2-4 cookies depending on activity level." },
      { question: "Shelf life?", answer: "4 months in cool dry place." }
    ],
    
    productReviews: [
      { name: "Jai", rating: 4, comment: "Brain cookies focus improve!", productAspect: "Energy", timeAgo: "3 weeks ago" },
      { name: "Pakkiya", rating: 5, comment: "Husband ku perfect!", productAspect: "Memory", timeAgo: "2 weeks ago" },
      { name: "Ravi", rating: 5, comment: "Study time boost!", productAspect: "Concentration", timeAgo: "1 week ago" }
    ],
    ratingData: [
      { stars: 5, count: 75, percentage: 78 },
      { stars: 4, count: 15, percentage: 16 },
      { stars: 3, count: 4, percentage: 4 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 }
    ],
    totalReviews: 96,
    avgRating: 4.8
  },

  // 🔥 HEART (Bajra) - ID: 3
  {
    id: 3,
    name: "Heart",
    subtitle: "Functional Millet Cookies",
    price: 259,
    rating: 4.7,
    reviews: 84,
    benefit: "Gut Health",
    description: "Traditional bajra goodness for digestive balance and sustained energy.",
    tags: ["Digestive Health", "Energy Boost"],
    ingredients: [
      "Organic Bajra (Pearl Millet) Flour",
      "Date Syrup",
      "Desi Ghee",
      "Walnuts",
      "Fennel Seeds",
      "Black Salt",
    ],
    nutrition: [
      { label: "Calories", value: "125 kcal" },
      { label: "Protein", value: "3.5g" },
      { label: "Fibre", value: "6g" },
      { label: "Iron", value: "12% DV" },
      { label: "Magnesium", value: "18% DV" },
    ],
    mrp: 309,
    discount: 16,
    premiumPrice: 245,
    image: ProductImg33,
    images: [bajra1, bajra2, bajra3, bajra4],
    
    // 🔥 HEART SPECIFIC FAQs
    faqs: [
      { question: "Good for heart?", answer: "Yes! Bajra helps maintain healthy cholesterol." },
      { question: "Helps digestion?", answer: "Excellent! High fibre prevents constipation." },
      { question: "BP patients can eat?", answer: "Yes, magnesium helps blood pressure control." },
      { question: "How many daily?", answer: "2-3 cookies daily with meals." },
      { question: "Natural sweetener?", answer: "100% date syrup - no refined sugar." },
      { question: "Storage?", answer: "Cool dry place away from sunlight." }
    ],
    
    productReviews: [
      { name: "Ajay", rating: 5, comment: "Heart health improved!", productAspect: "Cholesterol", timeAgo: "4 months ago" },
      { name: "Ravi", rating: 5, comment: "Daily energy boost!", productAspect: "Heart", timeAgo: "1 month ago" },
      { name: "Suresh", rating: 4, comment: "Good for BP control!", productAspect: "Blood Pressure", timeAgo: "2 weeks ago" }
    ],
    ratingData: [
      { stars: 5, count: 65, percentage: 77 },
      { stars: 4, count: 14, percentage: 17 },
      { stars: 3, count: 3, percentage: 4 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 }
    ],
    totalReviews: 84,
    avgRating: 4.7
  },

  // 🔥 BONE DENSITY (Multi Millet) - ID: 4
  {
    id: 4,
    name: "Bone Density",
    subtitle: "Functional Millet Cookies",
    price: 299,
    rating: 4.9,
    reviews: 156,
    benefit: "Complete Nutrition",
    description: "A harmonious blend of five ancient millets for comprehensive daily nutrition.",
    tags: ["Bestseller", "All Ages"],
    ingredients: [
      "Ragi, Jowar, Bajra, Foxtail, Little Millet Flour Blend",
      "Jaggery",
      "Desi Ghee",
      "Mixed Dry Fruits",
      "Vanilla",
      "Rock Salt",
    ],
    nutrition: [
      { label: "Calories", value: "130 kcal" },
      { label: "Protein", value: "4g" },
      { label: "Fibre", value: "5.5g" },
      { label: "Iron", value: "18% DV" },
      { label: "B Vitamins", value: "20% DV" },
    ],
    mrp: 349,
    discount: 14,
    premiumPrice: 279,
    image: ProductImg44,
    images: [multi1, multi2, multi3, multi4],
    
    // 🔥 BONE DENSITY SPECIFIC FAQs
    faqs: [
      { question: "Good for bones?", answer: "Yes! High calcium from multiple millets." },
      { question: "Complete meal replacement?", answer: "Balanced nutrition for daily snack." },
      { question: "All age groups?", answer: "Yes! Kids to elders - everyone benefits." },
      { question: "5 millets mix?", answer: "Ragi+Jowar+Bajra+Foxtail+Little Millet." },
      { question: "Daily consumption?", answer: "2-4 cookies daily for complete nutrition." },
      { question: "Taste variation?", answer: "Balanced sweet taste all love." }
    ],
    
    productReviews: [
      { name: "Suresh", rating: 5, comment: "Complete family nutrition!", productAspect: "Nutrition", timeAgo: "3 months ago" },
      { name: "Manoj", rating: 5, comment: "Kids love this multi-millet!", productAspect: "Taste", timeAgo: "2 weeks ago" },
      { name: "Priya", rating: 5, comment: "Bone density improved!", productAspect: "Bone Health", timeAgo: "1 month ago" }
    ],
    ratingData: [
      { stars: 5, count: 135, percentage: 87 },
      { stars: 4, count: 15, percentage: 10 },
      { stars: 3, count: 4, percentage: 2 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 }
    ],
    totalReviews: 156,
    avgRating: 4.9
  },

  // 🔥 PCOS/PCOD (Foxtail) - ID: 5
  {
    id: 5,
    name: "Pocd / Pcos",
    subtitle: "Functional Millet Cookies",
    price: 269,
    rating: 4.8,
    reviews: 72,
    benefit: "Blood Sugar Support",
    description: "Specifically crafted to support balanced blood sugar levels naturally.",
    tags: ["Diabetic Friendly", "Low Sugar"],
    ingredients: [
      "Organic Foxtail Millet Flour",
      "Stevia & Dates",
      "Cold-Pressed Sesame Oil",
      "Pistachios",
      "Turmeric",
      "Himalayan Salt",
    ],
    nutrition: [
      { label: "Calories", value: "105 kcal" },
      { label: "Protein", value: "3g" },
      { label: "Fibre", value: "4.5g" },
      { label: "Sugar", value: "3g" },
      { label: "GI Index", value: "Low" },
    ],
    mrp: 319,
    discount: 16,
    premiumPrice: 259,
    image: ProductImg55,
    images: [foxtail1, foxtail2, foxtail3, foxtail4],
    
    // 🔥 PCOS/PCOD SPECIFIC FAQs
    faqs: [
      { question: "Helps PCOS symptoms?", answer: "Yes! Low GI millet helps hormonal balance." },
      { question: "Safe for diabetics?", answer: "Perfect! Lowest GI millet + stevia." },
      { question: "Weight management?", answer: "High fibre helps control hunger." },
      { question: "Turmeric benefits?", answer: "Anti-inflammatory - helps PCOS inflammation." },
      { question: "How many daily?", answer: "2-3 cookies before meals." },
      { question: "No white sugar?", answer: "Stevia + dates only - zero refined sugar." }
    ],
    
    productReviews: [
      { name: "Priya", rating: 5, comment: "Blood sugar stable pannuthu!", productAspect: "Sugar Control", timeAgo: "1 month ago" },
      { name: "Lakshmi", rating: 5, comment: "PCOS symptoms reduced!", productAspect: "Hormonal Balance", timeAgo: "3 weeks ago" },
      { name: "Deepa", rating: 4, comment: "Weight management help!", productAspect: "Weight Control", timeAgo: "1 week ago" }
    ],
    ratingData: [
      { stars: 5, count: 58, percentage: 81 },
      { stars: 4, count: 10, percentage: 14 },
      { stars: 3, count: 2, percentage: 3 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 }
    ],
    totalReviews: 72,
    avgRating: 4.8
  }
];

// 🔥 COMBO PACK - ID: 101
export const comboPacks: Product[] = [
  {
    ...products[1],
    id: 101,
    name: "All-in-One Wellness Combo",
    subtitle: "All your wellness needs in one pack",
    price: 999,
    mrp: 1528,
    discount: 35,
    premiumPrice: 849,
    image: ComboImg,
    images: [Combo1, Combo2, Combo3, Combo4],
    
    // 🔥 COMBO SPECIFIC FAQs
    faqs: [
      { question: "Combo la enna 5 products irukku?", answer: "Gut + Brain + Heart + Bone Density + PCOS cookies." },
      { question: "Total savings?", answer: "Save ₹529 (35% OFF) + Free insulated bag." },
      { question: "Same expiry date?", answer: "All manufactured same week - same expiry." },
      { question: "Separate packaging?", answer: "Premium combo box with individual sealed packs." },
      { question: "1 month supply?", answer: "Yes! Each pack has 15 cookies = 30 days." },
      { question: "Delivery time?", answer: "2-3 days pan India. Free delivery on combo." },
      { question: "Family use?", answer: "Perfect for family of 4 - complete nutrition." }
    ],
    
    productReviews: [
      { name: "Kumar", rating: 5, comment: "All 5 packs perfect combo!", productAspect: "Value", timeAgo: "1 month ago" },
      { name: "Anita", rating: 5, comment: "Family ku complete nutrition!", productAspect: "Variety", timeAgo: "2 weeks ago" },
      { name: "Ramesh", rating: 4, comment: "Great deal but heavy pack!", productAspect: "Packaging", timeAgo: "3 days ago" }
    ],
    ratingData: [
      { stars: 5, count: 45, percentage: 82 },
      { stars: 4, count: 8, percentage: 15 },
      { stars: 3, count: 1, percentage: 2 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 1 }
    ],
    totalReviews: 54,
    avgRating: 4.8
  },
];

export const allProducts: Product[] = [...products, ...comboPacks];
