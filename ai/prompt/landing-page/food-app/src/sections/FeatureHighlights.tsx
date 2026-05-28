import { FaMapMarkerAlt, FaHeart, FaBolt, FaStoreAlt } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

const features = [
  {
    icon: <FaMapMarkerAlt className="text-3xl" />,
    title: 'Real-time order tracking',
    description: 'Know exactly where your food is from restaurant to doorstep. Live GPS tracking keeps you updated every step of the way.',
    image: 'https://images.unsplash.com/photo-1526367790997-0150788496a4?w=600&h=400&fit=crop',
    alt: 'Real-time order tracking map on phone',
  },
  {
    icon: <FaHeart className="text-3xl" />,
    title: 'Personalized recommendations',
    description: 'Our smart algorithm learns your tastes and suggests dishes you\'ll love. Discover new favorites tailored just for you.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    alt: 'Personalized food recommendations',
    reverse: true,
  },
  {
    icon: <FaBolt className="text-3xl" />,
    title: 'Lightning-fast checkout',
    description: 'Reorder favorites in one tap with saved payment methods and addresses. From craving to order in under 10 seconds.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    alt: 'Fast checkout on mobile app',
  },
  {
    icon: <FaStoreAlt className="text-3xl" />,
    title: 'Exclusive local restaurants',
    description: 'Access hidden gems and local favorites that don\'t appear on other delivery platforms. Support your local food scene.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    alt: 'Local restaurant dining',
    reverse: true,
  },
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Everything you need"
          subtitle="Powerful features that make ordering food a delightful experience"
        />

        <div className="flex flex-col gap-20">
          {features.map((feature) => (
            <ScrollReveal key={feature.title} delay={0.1}>
              <div
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  feature.reverse ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={feature.reverse ? 'md:order-2' : 'md:order-1'}>
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="rounded-3xl shadow-xl w-full h-[320px] object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className={feature.reverse ? 'md:order-1' : 'md:order-2'}>
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
