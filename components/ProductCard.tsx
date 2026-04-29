import { currency } from "@/data/products";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
  onView: (product: Product) => void;
};

type BadgeProps = {
  children: React.ReactNode;
  color?: "coral" | "navy" | "gold" | "default";
};

type ButtonProps = {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
};

const typeColors: Record<string, string> = {
  Fire: "bg-orange-100 text-orange-700",
  Water: "bg-blue-100 text-blue-700",
  Grass: "bg-green-100 text-green-700",
  Electric: "bg-yellow-100 text-yellow-700",
  Psychic: "bg-purple-100 text-purple-700",
  Fighting: "bg-red-100 text-red-700",
  Dark: "bg-gray-800 text-gray-100",
  Metal: "bg-slate-200 text-slate-700",
  Dragon: "bg-indigo-100 text-indigo-700",
  Fairy: "bg-pink-100 text-pink-700",
  Normal: "bg-stone-100 text-stone-600",
  default: "bg-stone-100 text-stone-600",
};

function Badge({ children, color = "default" }: BadgeProps) {
  const styles = {
    coral: "bg-[#FDECEA] text-[#C73E2A]",
    navy: "bg-[#EEF2F9] text-[#1B3A6B]",
    gold: "bg-[#FEF6E0] text-[#C68F0A]",
    default: "bg-stone-100 text-stone-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[color]}`}
    >
      {children}
    </span>
  );
}

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function ProductCard({ product, onAdd, onView }: ProductCardProps) {
  const savings = product.marketPrice - product.shopPrice;
  const savingsPercent = Math.round((savings / product.marketPrice) * 100);
  const typeColor = typeColors[product.type] ?? typeColors.default;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-stone-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col">
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-[#EEF2F9] to-[#FEF6E0] p-4 h-52 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full max-w-full rounded-xl object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105"
        />

        {product.quantity <= 2 && (
          <div className="absolute right-3 top-3 rounded-full bg-[#E8503A] px-1 py-0.5 text-xs font-bold text-white shadow">
            Only {product.quantity} left!
          </div>
        )}

        {product.featured && (
          <div className="absolute left-3 top-3 rounded-full bg-[#F0B429] px-1 py-0.1 text-xs font-bold text-[#0F1F3D] shadow">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 gap-3 p-4">
        {/* Name + condition */}
        <div>
          <h3 className="text-base font-bold text-[#0F1F3D] leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-stone-400 line-clamp-1">
            {product.set}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColor}`}
          >
            {product.type}
          </span>
          <Badge color="navy">{product.condition}</Badge>
          {product.rarity !== "Sealed Product" && (
            <Badge>{product.rarity}</Badge>
          )}
        </div>

        {/* Pricing */}
        <div className="mt-auto rounded-xl bg-[#FAFAF7] border border-stone-100 p-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                Our Price
              </p>
              <p className="text-2xl font-black text-[#0F1F3D] leading-none">
                {currency.format(product.shopPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                Market
              </p>
              <p className="text-sm text-stone-400 line-through">
                {currency.format(product.marketPrice)}
              </p>
              {savings > 0 && (
                <p className="text-xs font-bold text-[#E8503A]">
                  Save {savingsPercent}%
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onView(product)}
            className="rounded-xl border border-stone-200 bg-white py-2.5 text-sm font-semibold text-[#1B3A6B] hover:bg-[#EEF2F9] transition"
          >
            View
          </Button>
          <Button
            onClick={() => onAdd(product)}
            className="rounded-xl bg-[#E8503A] py-2.5 text-sm font-bold text-white hover:bg-[#C73E2A] transition shadow-sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
