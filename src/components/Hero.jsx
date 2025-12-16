import { motion } from "framer-motion";

export default function Hero({ data, lang }) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark z-10" />
        <img
          src="/ParisPrivateDriver/img/hero_bg_premium.png"
          alt="Luxury Background"
          className="w-full h-full object-cover scale-105 animate-slow-spin"
          style={{ animationDuration: '60s', animationDirection: 'alternate' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary-light text-sm font-medium tracking-wider mb-6 backdrop-blur-md">
            JOSUÉ PRIVATE DRIVER
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {lang === 'fr' ? (
            <>
              L'Élégance en <br />
              <span className="text-gradient-gold">Mouvement</span>
            </>
          ) : (
            <>
              Elegance in <br />
              <span className="text-gradient-gold">Motion</span>
            </>
          )}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {data.subtitle[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => document.getElementById('booking-wizard').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-primary text-dark font-bold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            {lang === 'fr' ? 'Réserver un Chauffeur' : 'Book a Chauffeur'}
          </button>
          <button
            onClick={() => document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
          >
            {lang === 'fr' ? 'Voir la Flotte' : 'View Fleet'}
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}