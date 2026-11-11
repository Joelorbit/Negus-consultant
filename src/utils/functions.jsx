// `Icon` is used as a JSX element below; core no-unused-vars cannot see JSX tag usage.
// eslint-disable-next-line no-unused-vars
export const renderStars = (rating, Icon) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Icon
      key={i}
      className={`w-5 h-5 ${
        i < Math.floor(rating)
          ? "text-yellow-400 fill-current"
          : i === Math.floor(rating) && rating % 1 !== 0
          ? "text-yellow-400 fill-current opacity-50"
          : "text-gray-300"
      }`}
    />
  ));
};
export const averageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;

  const total = ratings.reduce((sum, review) => sum + review.rating, 0);
  return total / ratings.length;
};
