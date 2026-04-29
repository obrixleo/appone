export type Product = {
  id: string;
  category: "single" | "sealed";
  name: string;
  set: string;
  type: string;
  rarity: string;
  condition: string;
  quantity: number;
  marketPrice: number;
  shopPrice: number;
  image: string;
  featured?: boolean;
};
