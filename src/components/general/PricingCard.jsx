import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { BadgeCheck } from "lucide-react";
import { Badge } from "../ui/badge";

export const PricingCard = ({tier, paymentFrequency}) => {
  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;

  return (
    <div
      className={cn(
        "relative flex flex-col gap-8 overflow-hidden rounded-2xl border p-6 shadow",
        isHighlighted
          ? "bg-gradient-to-br from-neutral-800 to-neutral-900 text-background"
          : "bg-background text-foreground",
        isPopular && "outline-2 outline-emerald-600",
      )}
    >
      {/* Background Decoration */}

      {/* Card Header */}
      <h2 className="flex items-center gap-3 text-xl font-medium capitalize">
        {tier.name}
        {isPopular && (
          <Badge className="mt-1 bg-orange-900 px-1 py-0 text-white hover:bg-orange-900">🔥 Most Popular</Badge>
        )}
      </h2>

      {/* Price Section */}
      <div className="relative h-12">
        {typeof price === "number" ? (
          <>
            <NumberFlow
              format={{
                style: "currency",
                currency: "USD",
                trailingZeroDisplay: "stripIfInteger",
              }}
              value={price}
              className="text-4xl font-medium"
            />
            <p className="-mt-2 text-xs font-medium">Per month/user</p>
          </>
        ) : (
          <h2 className="text-4xl font-medium">{price}</h2>
        )}
      </div>

      {/* Features */}
      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium">{tier.description}</h3>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                isHighlighted ? "text-background" : "text-foreground/60",
              )}
            >
              <BadgeCheck strokeWidth={1} size={16} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action Button */}
      <button type="button" className={cn("h-fit w-full bg-gradient-to-br from-emerald-700 to-emerald-900 py-1 text-white rounded-lg",isHighlighted && "bg-accent text-foreground hover:bg-accent/95",)}>{tier.cta}</button>
    </div>
  );
};