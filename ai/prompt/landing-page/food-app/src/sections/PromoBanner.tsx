import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';
import Button from '../components/Button';

export default function PromoBanner() {
  return (
    <section className="py-16 md:py-20 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 text-white mb-6"
        >
          <FaGift className="text-3xl" />
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-black text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Free delivery on your first order
        </motion.h2>

        <motion.p
          className="text-white/80 text-lg mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          New to Foodiez? We'll waive the delivery fee on your very first order. No minimum, no strings attached.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="secondary" size="lg" href="#download">
            Claim your free delivery
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
