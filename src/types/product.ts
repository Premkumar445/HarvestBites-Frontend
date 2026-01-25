// src/types/product.ts

export interface FAQ {
  question: string;
  answer: string;
}

export type Product = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  benefit: string;
  tags: string[];
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  mrp?: number;
  discount?: number;
  premiumPrice?: number;
  
  image?: string;        // main image (already there)
  images?: string[]; 
  productReviews?: Array<{
    name: string;
    rating: number;
    comment: string;
    productAspect: string;
    timeAgo: string;
  }>;
  
  ratingData?: Array<{
    stars: number;
    count: number;
    percentage: number;
  }>;
  
  totalReviews?: number;
  avgRating?: number;

  // 🔥 ADD FAQ FIELD
  faqs?: FAQ[];
}    // new: gallery images
;
