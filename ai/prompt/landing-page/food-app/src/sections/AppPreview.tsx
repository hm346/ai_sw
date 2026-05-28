import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import PhoneMockup from '../components/PhoneMockup';

const screens = [
  {
    image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&h=900&fit=crop',
    label: 'Browse restaurants',
  },
  {
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=900&fit=crop',
    label: 'Explore menus',
  },
  {
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=900&fit=crop',
    label: 'Quick checkout',
  },
  {
    image: 'https://images.unsplash.com/photo-1526367790997-0150788496a4?w=600&h=900&fit=crop',
    label: 'Track delivery',
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=900&fit=crop',
    label: 'Rate & review',
  },
];

export default function AppPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -360 : 360,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading
            title="Explore the app"
            subtitle="Take a peek at what Foodiez looks like inside"
          />
        </ScrollReveal>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all border border-gray-100"
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all border border-gray-100"
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>

          {/* Gradient fades on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-gray-50 z-10 pointer-events-none" />

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="hide-scrollbar overflow-x-auto flex gap-8 py-8 px-16"
          >
            {screens.map((screen, i) => (
              <motion.div
                key={screen.label}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <PhoneMockup imageSrc={screen.image} alt={screen.label} />
                <p className="text-center mt-4 font-semibold text-dark">{screen.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
