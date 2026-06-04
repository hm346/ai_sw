import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';

export default function FinalCTA() {
  return (
    <section
      id="download"
      className="py-24 md:py-32 bg-gradient-to-br from-dark via-gray-900 to-dark relative overflow-hidden"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Download Foodiez and get your food faster than ever
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join millions of happy customers. Available on iOS and Android — free to download.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-dark rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaApple className="text-2xl" />
              <div className="text-left leading-tight">
                <div className="text-[10px] opacity-50">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-dark rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGooglePlay className="text-xl" />
              <div className="text-left leading-tight">
                <div className="text-[10px] opacity-50">GET IT ON</div>
                <div className="font-bold">Google Play</div>
              </div>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
