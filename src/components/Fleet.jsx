import { motion } from 'framer-motion';
import data from '../../data.json';

export default function Fleet({ lang }) {
  return (
    <section id="fleet" className="py-24 bg-dark-lighter relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">
            {lang === 'fr' ? 'La Flotte' : 'The Fleet'}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {data.fleetTitle[lang]}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {data.fleet.map((vehicle, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="relative h-[300px] md:h-[400px] mb-8 rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={vehicle.image}
                  alt={vehicle.title[lang]}
                  className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{vehicle.title[lang]}</h3>
                  <p className="text-gray-400 max-w-md">{vehicle.desc[lang]}</p>
                </div>
                <button
                  onClick={() => document.getElementById('booking-wizard').scrollIntoView({ behavior: 'smooth' })}
                  className="hidden md:block px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-dark transition-colors"
                >
                  {lang === 'fr' ? 'Réserver' : 'Book'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}