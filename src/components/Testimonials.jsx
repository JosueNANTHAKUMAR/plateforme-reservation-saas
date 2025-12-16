import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import data from '../../data.json';

export default function Testimonials({ lang }) {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-lighter -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          {lang === 'fr' ? 'Ils nous font ' : 'They trust '}
          <span className="text-gradient-gold">{lang === 'fr' ? 'Confiance' : 'Us'}</span>
        </h2>
      </div>

      {/* Infinite Marquee */}
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex gap-8 py-4 animate-marquee whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...data.testimonials, ...data.testimonials, ...data.testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[350px] md:w-[450px] flex-shrink-0 glass-card p-8 rounded-2xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, starI) => (
                  <StarIcon key={starI} className="w-5 h-5 text-primary" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6 whitespace-normal italic">"{t.text[lang]}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center font-bold text-dark">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}