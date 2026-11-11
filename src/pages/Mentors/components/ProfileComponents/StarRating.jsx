import { Star } from "lucide-react";

const StarRating = ({ rating, max = 5, size = 16 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? "fill-amber-400 text-amber-400"
                : partial
                  ? "fill-amber-400/50 text-amber-400/50"
                  : "text-border"
            }
          />
        );
      })}
    </div>
  );
};
export default StarRating;
