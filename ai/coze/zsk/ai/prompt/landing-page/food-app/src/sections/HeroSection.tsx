import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaStar, FaClock, FaStore } from 'react-icons/fa';
import PhoneMockup from '../components/PhoneMockup';
import ScrollReveal from '../components/ScrollReveal';

const floatingCards = [
  { emoji: '🍕', label: 'Pizza', delay: 0, x: -80, y: -40 },
  { emoji: '🍔', label: 'Burger', delay: 0.5, x: 80, y: -80 },
  { emoji: '🍣', label: 'Sushi', delay: 1, x: -60, y: 60 },
  { emoji: '🥗', label: 'Salad', delay: 1.5, x: 70, y: 40 },
];

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50">
      {/* Floating food cards */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingCards.map((card) => (
          <motion.div
            key={card.label}
            className="absolute left-1/2 top-1/2"
            initial={{ x: 0, y: 0 }}
            animate={{ x: card.x, y: card.y }}
            transition={{ delay: card.delay, duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 text-lg font-semibold"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
            >
              <span className="text-2xl">{card.emoji}</span>
              <span className="text-sm text-dark">{card.label}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text */}
        <div>
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-dark mb-6">
              Your favorite food,
              <br />
              <span className="text-primary">delivered fast</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Order from hundreds of local restaurants, track your delivery in real time, and enjoy
              hot fresh meals at your doorstep in 30 minutes or less.
            </p>
          </ScrollReveal>

          {/* App store buttons */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-dark text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
              >
                <FaApple className="text-2xl" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] opacity-70">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-dark text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
              >
                <FaGooglePlay className="text-lg" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] opacity-70">GET IT ON</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Trust indicators */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <FaStar className="text-primary text-lg" />
                <div>
                  <div className="font-bold text-dark">4.8</div>
                  <div className="text-sm text-gray-500">App rating</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-primary text-lg" />
                <div>
                  <div className="font-bold text-dark">30 min</div>
                  <div className="text-sm text-gray-500">Avg delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaStore className="text-primary text-lg" />
                <div>
                  <div className="font-bold text-dark">500+</div>
                  <div className="text-sm text-gray-500">Restaurants</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Phone mockup */}
        <div className="flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <PhoneMockup
              imageSrc="https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&h=900&fit=crop"
              alt="Foodiez app showing restaurant listings"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-auto">
          <path d="M0 50C240 0 480 100 720 50s480 0 720 50v50H0V50z" fill="#fff" />
        </svg>
      </div>
    </section>
  );
}
