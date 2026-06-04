import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import StarRating from '../components/StarRating';
import ScrollReveal from '../components/ScrollReveal';

const partnerLogos = [
  { name: 'Burger King', emoji: '🍔' },
  { name: 'Subway', emoji: '🥪' },
  { name: 'Pizza Hut', emoji: '🍕' },
  { name: 'Starbucks', emoji: '☕' },
  { name: 'KFC', emoji: '🍗' },
  { name: 'McDonald\'s', emoji: '🍟' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    quote: 'Foodiez has completely changed how I order food. The delivery is incredibly fast and the app is so easy to use!',
  },
  {
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    quote: 'I love the real-time tracking feature. No more guessing when my food will arrive — I can see exactly where my order is.',
  },
  {
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 4.5,
    quote: 'The personalized recommendations are spot on. I\'ve discovered so many amazing local restaurants I never knew existed!',
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Partner logos */}
        <ScrollReveal>
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
            Trusted by top restaurants
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 mb-24">
            {partnerLogos.map((partner) => (
              <motion.div
                key={partner.name}
                className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-3xl">{partner.emoji}</span>
                <span className="font-bold text-gray-400 hidden sm:inline">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <SectionHeading
          title="Loved by food lovers"
          subtitle="Join thousands of happy customers who get their meals delivered every day"
        />

        <div className="grid md:grid-cols-3 gap-8" id="reviews">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.15}>
              <motion.div
                className="bg-gray-50 rounded-3xl p-8 h-full flex flex-col"
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.3 }}
              >
                <StarRating rating={t.rating} />
                <p className="text-gray-600 mt-4 mb-6 flex-1 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <h4 className="font-bold text-dark">{t.name}</h4>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
