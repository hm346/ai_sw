import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface AppStoreButtonProps {
  store: 'apple' | 'google';
  className?: string;
}

export default function AppStoreButton({ store, className = '' }: AppStoreButtonProps) {
  const isApple = store === 'apple';

  return (
    <motion.a
      href="#"
      className={`inline-flex items-center gap-3 px-5 py-3 bg-dark text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isApple ? <FaApple className="text-2xl" /> : <FaGooglePlay className="text-lg" />}
      <div className="text-left leading-tight">
        <div className="text-[10px] opacity-70">{isApple ? 'Download on the' : 'GET IT ON'}</div>
        <div className="text-sm font-bold">{isApple ? 'App Store' : 'Google Play'}</div>
      </div>
    </motion.a>
  );
}
