import data from '../../data.json';
import { motion } from 'framer-motion';

export default function Forfaits({ lang = 'fr' }) {
  const forfaits = data.forfaits;
  return (
    <section className="py-20 px-4 bg-transparent">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-white drop-shadow-sm">
        {lang === 'fr' ? 'Forfait voyage' : 'Travel Packages'}
      </h2>
      <p className="text-center max-w-2xl mx-auto text-white/90 mb-14 text-lg font-medium">
        {lang === 'fr'
          ? "Vous souhaitez louer une voiture ou un van de Paris à Disney pour une excursion d'une journée ou d'une nuit avec chauffeur, ou juste pour quelques heures ? Trouvez l'option idéale ici."
          : "Want to rent a car or van from Paris to Disney for a day or night tour with a driver, or just for a few hours? Find the ideal option here."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {forfaits.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="bg-white/90 border border-[#0b1d3a]/10 shadow-lg rounded-3xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl hover:bg-[#eaf0fa] hover:border-[#1a2c4e] group backdrop-blur-sm transition-all duration-300"
          >
            <img src={f.image} alt={f.title[lang]} className="h-40 w-full object-cover rounded-xl mb-4 drop-shadow-xl group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            <h3 className="text-2xl font-extrabold text-[#0b1d3a] mb-2 group-hover:text-[#1a2c4e] transition-colors duration-300">
              {f.title[lang]}
            </h3>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-base font-semibold text-gray-700 bg-gray-100 rounded-full px-3 py-1">
                {f.duration[lang]}
              </span>
              <span className="text-xl font-bold text-[#0b1d3a]">{f.price}</span>
            </div>
            <p className="text-gray-700 text-base font-medium mb-6 group-hover:text-gray-900 transition-colors duration-300">
              {f.desc[lang]}
            </p>
            <button className="px-6 py-2 rounded-full bg-[#0b1d3a] text-white font-semibold shadow hover:bg-[#1a2c4e] transition-all duration-200">
              {f.cta[lang]}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 