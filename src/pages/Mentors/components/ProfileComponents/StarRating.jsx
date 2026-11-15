const StarRating = ({ rating, max = 5 }) => {
  return (
    <span className="text-sm text-muted-foreground" aria-label={`${rating} out of ${max}`}>
      {Number(rating).toFixed(1)} / {max}
    </span>
  );
};
export default StarRating;
