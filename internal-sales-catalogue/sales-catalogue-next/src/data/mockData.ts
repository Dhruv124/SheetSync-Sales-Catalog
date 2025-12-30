export interface Product {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  image: string;
  images?: string[]; // Array of multiple images
  description?: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Luxury Bath Towel Set",
    category: "Towels",
    size: "Set of 3",
    price: 89.99,
    image: "",
    description: "Premium Egyptian cotton towels with superior absorbency and softness. Set includes 1 bath towel, 1 hand towel, and 1 washcloth."
  },
  {
    id: "2",
    name: "Premium Hand Towel",
    category: "Towels",
    size: "Single",
    price: 24.99,
    image: "",
    description: "Soft and absorbent hand towel made from 100% combed cotton. Perfect for daily use in bathrooms and kitchens."
  },
  {
    id: "3",
    name: "Egyptian Cotton Bath Sheet",
    category: "Towels",
    size: "King Size",
    price: 45.99,
    image: "",
    description: "Extra-large bath sheet crafted from premium Egyptian cotton. Luxuriously soft and highly absorbent for a spa-like experience."
  },
  {
    id: "4",
    name: "Silk Bed Sheet Set",
    category: "Bedsheets",
    size: "Queen",
    price: 299.99,
    image: "",
    description: "Luxurious 100% mulberry silk sheet set. Includes flat sheet, fitted sheet, and two pillowcases. Temperature regulating and hypoallergenic."
  },
  {
    id: "5",
    name: "Linen Duvet Cover",
    category: "Bedsheets",
    size: "King",
    price: 189.99,
    image: "",
    description: "Breathable Belgian linen duvet cover with hidden button closure. Naturally wrinkle-resistant and gets softer with each wash."
  },
  {
    id: "6",
    name: "Cotton Pillowcase Set",
    category: "Pillow Cushion",
    size: "Set of 2",
    price: 39.99,
    image: "",
    description: "Premium long-staple cotton pillowcases with envelope closure. Soft, durable, and machine washable."
  },
  {
    id: "7",
    name: "Plush Bathrobe",
    category: "Towels",
    size: "One Size",
    price: 79.99,
    image: "",
    description: "Ultra-soft microfiber bathrobe with shawl collar and two pockets. Hotel-quality comfort for everyday luxury."
  },
  {
    id: "8",
    name: "Waffle Kimono Robe",
    category: "Towels",
    size: "Medium",
    price: 64.99,
    image: "",
    description: "Lightweight waffle weave robe with kimono sleeves. Quick-drying and perfect for spa days or poolside lounging."
  },
  {
    id: "9",
    name: "Luxury Spa Robe",
    category: "Towels",
    size: "Large",
    price: 94.99,
    image: "",
    description: "Premium terry cloth spa robe with belt loop and two pockets. Thick, absorbent, and exceptionally comfortable."
  },
  {
    id: "10",
    name: "Insulated Water Bottle",
    category: "Bottles",
    size: "1L",
    price: 699,
    image: "",
    description: "Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof."
  },
  {
    id: "11",
    name: "Designer Accent Chair",
    category: "Chairs",
    size: "Standard",
    price: 14999,
    image: "",
    description: "Modern Scandinavian-inspired accent chair with premium fabric upholstery. Solid wood legs and ergonomic design."
  },
  {
    id: "12",
    name: "Cushion Cover Set",
    category: "Pillow Cushion",
    size: "Set of 3",
    price: 1299,
    image: "",
    description: "Set of 3 decorative cushion covers with hidden zipper closure. Premium cotton blend fabric with elegant patterns."
  }
];

export const categories = ["All", "Bottles", "Towels", "Chairs", "Bedsheets", "Pillow Cushion"];
