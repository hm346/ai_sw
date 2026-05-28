import { FaSearch, FaShoppingBag, FaMotorcycle } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

const steps = [
  {
    icon: <FaSearch className="text-3xl" />,
    title: 'Browse restaurants',
    description: 'Explore hundreds of local restaurants and browse menus with mouthwatering photos and honest reviews.',
  },
  {
    icon: <FaShoppingBag className="text-3xl" />,
    title: 'Order in seconds',
    description: 'Customize your meal, pay securely in one tap, and get instant confirmation. It\'s that simple.',
  },
  {
    icon: <FaMotorcycle className="text-3xl" />,
    title: 'Fast delivery',
    description: 'Track your order in real time as our riders bring your food straight to your door, hot and fresh.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="How it works"
          subtitle="Get your favorite food delivered in three simple steps"
        />

        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-primary-100" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.2}>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center mb-6 shadow-xl shadow-primary/25">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">
                  <span className="text-primary/50 mr-2">{i + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
