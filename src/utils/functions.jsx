export const averageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;

  const total = ratings.reduce((sum, review) => sum + review.rating, 0);
  return total / ratings.length;
};
