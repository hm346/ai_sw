import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} />);
  }
  if (hasHalf) {
    stars.push(<FaStarHalfAlt key="half" />);
  }
  while (stars.length < 5) {
    stars.push(<FaStar key={`empty-${stars.length}`} className="text-gray-300" />);
  }

  return <div className="flex gap-1 text-yellow-400 text-lg">{stars}</div>;
}
