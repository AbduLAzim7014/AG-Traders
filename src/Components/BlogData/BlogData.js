// Import all product images
import yellow from "../../assets/Images/yellow.png";
import whitebelan from "../../assets/Images/whiteBelan.png";
import whiteLine from "../../assets/Images/whiteLine.png";
import neemCakla from "../../assets/Images/neemCakla.png";
import Specialbelan from "../../assets/Images/Specialbelan.png";
import sarmika from "../../assets/Images/sarmika.png";
import belan14inch from "../../assets/Images/14inchbelan.png";
import babol2 from "../../assets/Images/babol2.png";
import goolbelan from "../../assets/Images/goolbelan.png";
import akandCakala from "../../assets/Images/akandCakala.png";
import goolgotani from "../../assets/Images/goolgotani.png";
import babolgool from "../../assets/Images/babolgool.png";

export const CATEGORIES = ["All", "Chakla", "Belan", "Matani"];

const imageMap = {
  "yellow.png": yellow,
  "whitebelan.png": whitebelan,
  "whiteLine.png": whiteLine,
  "neemCakla.png": neemCakla,
  "Specialbelan.png": Specialbelan,
  "sarmika.png": sarmika,
  "14inchbelan.png": belan14inch,
  "babol2.png": babol2,
  "goolbelan.png": goolbelan,
  "akandCakala.png": akandCakala,
  "goolgotani.png": goolgotani,
  "babolgool.png": babolgool,
};

const getImageUrl = (filename) => imageMap[filename] || yellow;

export const products = [
  {
    id: 1,
    name: "Premium Yellow Polished Chakla",
    slug: "premium-yellow-chakla",
    category: "Chakla",
    price: 55,
    oldPrice: 80,
    discount: 31,
    stock: 45,
    rating: 4.8,
    reviews: 128,
    brand: "AG Traders",
    material: "Hardwood",
    description:
      "Classic yellow polished wooden chakla. Handcrafted for maximum stability and a smooth rolling surface.",
    features: ["Mirror Finish", "Anti-skid Base", "Heavy Weight"],
    image: getImageUrl("yellow.png"),
  },
  {
    id: 2,
    name: "Traditional White Natural Belan",
    slug: "white-natural-belan",
    category: "Belan",
    price: 16,
    oldPrice: 25,
    discount: 36,
    stock: 120,
    rating: 4.6,
    reviews: 94,
    brand: "AG Traders",
    material: "Natural Wood",
    description:
      "Lightweight and eco-friendly white belan. Perfect for thin chapatis and daily kitchen use.",
    features: ["Natural Texture", "Easy Grip", "Splinter-free"],
    image: getImageUrl("whitebelan.png"),
  },
  {
    id: 3,
    name: "Designer White Line Belan",
    slug: "white-line-belan",
    category: "Belan",
    price: 18,
    oldPrice: 30,
    discount: 40,
    stock: 85,
    rating: 4.7,
    reviews: 110,
    brand: "AG Traders",
    material: "Premium Polish Wood",
    description:
      "Elegant white line designer belan. Adds a modern aesthetic to your traditional kitchen tools.",
    features: ["Modern Design", "Smooth Rotation", "Waterproof Polish"],
    image: getImageUrl("whiteLine.png"),
  },
  {
    id: 4,
    name: "Herbal Neem Wood Chakla",
    slug: "neem-wood-chakla",
    category: "Chakla",
    price: 65,
    oldPrice: 95,
    discount: 31,
    stock: 30,
    rating: 4.9,
    reviews: 215,
    brand: "AG Traders",
    material: "Pure Neem Wood",
    description:
      "Naturally anti-bacterial neem wood chakla. Best for hygiene-conscious households and healthy cooking.",
    features: ["Medicinal Neem", "Chemical Free", "Deep Brown Grain"],
    image: getImageUrl("neemCakla.png"),
  },
  {
    id: 5,
    name: "Special Double-Polish Belan",
    slug: "special-double-polish-belan",
    category: "Belan",
    price: 65,
    oldPrice: 85,
    discount: 23,
    stock: 55,
    rating: 4.8,
    reviews: 142,
    brand: "AG Traders",
    material: "Seasoned Wood",
    description:
      "Extra smooth double-polished belan. Reduces dough sticking and provides a professional rolling feel.",
    features: ["Zero Stick", "High Gloss", "Ergonomic Handles"],
    image: getImageUrl("Specialbelan.png"),
  },
  {
    id: 6,
    name: "Professional Sarmika Chakla",
    slug: "sarmika-chakla",
    category: "Chakla",
    price: 34,
    oldPrice: 50,
    discount: 32,
    stock: 200,
    rating: 4.5,
    reviews: 88,
    brand: "AG Traders",
    material: "Sarmika Composite Wood",
    description:
      "Durable sarmika wood chakla designed for high-frequency use. Lightweight yet extremely tough.",
    features: ["Lightweight", "Budget Friendly", "Scratch Resistant"],
    image: getImageUrl("sarmika.png"),
  },
  {
    id: 7,
    name: "King Size 14-Inch Polish Belan",
    slug: "king-size-belan",
    category: "Belan",
    price: 22,
    oldPrice: 40,
    discount: 45,
    stock: 150,
    rating: 4.7,
    reviews: 75,
    brand: "AG Traders",
    material: "Hardwood",
    description:
      "Extra-long 14-inch belan for professional chefs and large family meals. Ideal for big parathas.",
    features: ["Extra Length", "Pro-Chef Series", "Balanced Weight"],
    image: getImageUrl("14inchbelan.png"),
  },
  {
    id: 8,
    name: "Babool Wood Heavy Duty Belan",
    slug: "babool-heavy-belan",
    category: "Belan",
    price: 22,
    oldPrice: 35,
    discount: 37,
    stock: 95,
    rating: 4.6,
    reviews: 63,
    brand: "AG Traders",
    material: "Babool Wood",
    description:
      "Solid Babool wood rolling pin. Known for its strength and heavy-duty performance in Indian homes.",
    features: ["Heavy Duty", "Natural Strength", "Rustic Look"],
    image: getImageUrl("babol2.png"),
  },
  {
    id: 9,
    name: "Gool Designer Babool Belan",
    slug: "gool-babool-belan",
    category: "Belan",
    price: 24,
    oldPrice: 45,
    discount: 46,
    stock: 110,
    rating: 4.8,
    reviews: 55,
    brand: "AG Traders",
    material: "A-Grade Babool",
    description:
      "Unique round-finish (Gool) designer belan. Hand-turned on lathes for perfect symmetry.",
    features: ["Perfect Symmetry", "Lathe Turned", "Silk Finish"],
    image: getImageUrl("goolbelan.png"),
  },
  {
    id: 10,
    name: "Akand Single-Piece Premium Chakla",
    slug: "akand-single-piece-chakla",
    category: "Chakla",
    price: 95,
    oldPrice: 150,
    discount: 36,
    stock: 25,
    rating: 4.9,
    reviews: 310,
    brand: "AG Traders",
    material: "Akand Wood",
    description:
      "The masterpiece of our collection. Carved from a single block of Akand wood with zero joints.",
    features: ["Zero Joints", "Luxury Edition", "Heirloom Quality"],
    image: getImageUrl("akandCakala.png"),
  },
  {
    id: 11,
    name: "Traditional Gool Gotani (Churner)",
    slug: "traditional-gool-gotani",
    category: "Matani",
    price: 17,
    oldPrice: 25,
    discount: 32,
    stock: 500,
    rating: 4.9,
    reviews: 420,
    brand: "AG Traders",
    material: "Raw Wood",
    description:
      "Authentic wooden Matani for whisking curd, lassi, and buttermilk. Traditional kitchen essential.",
    features: ["Hand Carved", "Traditional Whisk", "Easy to Wash"],
    image: getImageUrl("goolgotani.png"),
  },
  {
    id: 12,
    name: "Babool Gool Premium Polish Belan",
    slug: "babool-gool-premium",
    category: "Belan",
    price: 26,
    oldPrice: 45,
    discount: 42,
    stock: 60,
    rating: 4.7,
    reviews: 89,
    brand: "AG Traders",
    material: "Polished Babool",
    description:
      "Premium grade Babool Gool belan with protective polish. Combines beauty with long-term durability.",
    features: ["Premium Polish", "Dense Wood", "Water Resistant"],
    image: getImageUrl("babolgool.png"),
  },
];

// Services aur Testimonials ka data aapka original rahega.
export const services = [
  /* ... apka purana data ... */
];
export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Professional Chef",
    location: "Jaipur, Rajasthan",
    image: "👨‍🍳", // Ya Image URL
    rating: 5,
    comment:
      "AG Traders ka Sheesham Chakla best hai. Stability aur finish kamal ki hai, roti belna ab bahut aasan ho gaya hai.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Home Maker",
    location: "Delhi",
    image: "👩‍🍳",
    rating: 4.8,
    comment:
      "Maine Neem wood ka chakla order kiya tha. Delivery fast thi aur packing export quality ki thi. Highly recommended!",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Wholesaler",
    location: "Surat, Gujarat",
    image: "🏢",
    rating: 5,
    comment:
      "Bulk orders ke liye AG Traders se behtar koi nahi. Inki manufacturing quality consistent rehti hai.",
  },
  // Aur 3-4 entries add karein...
];
