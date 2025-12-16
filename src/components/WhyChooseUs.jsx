import data from '../../data.json';
import { UserIcon, ClockIcon, PhoneIcon, CurrencyEuroIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const iconMap = {
  UserGroupIcon,
  PhoneIcon,
  ClockIcon,
  SparklesIcon,
  UserIcon,
  CurrencyEuroIcon,
};

export default function WhyChooseUs({ lang = 'fr' }) {
  const features = data.whyChooseUs;
  return (
    <section className="py-20 px-4 bg-transparent">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-white drop-shadow-sm">
        {lang === 'fr' ? 'Pourquoi nous choisir ?' : 'Why choose us?'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => {
          const Icon = iconMap[f.icon] || UserIcon;
          return (
            <div
              key={i}
              className="bg-[#f7f9fb] border border-[#0b1d3a]/10 shadow-lg rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#eaf0fa] hover:border-[#1a2c4e] group backdrop-blur-sm"
            >
              <Icon className="w-12 h-12 mx-auto text-[#0b1d3a] mb-2 group-hover:text-[#1a2c4e] transition-colors duration-300" />
              <h3 className="mt-2 mb-2 text-xl font-extrabold text-[#0b1d3a] group-hover:text-[#1a2c4e] transition-colors duration-300 tracking-tight">
                {f.title[lang]}
              </h3>
              <p className="text-gray-700 text-base font-medium group-hover:text-gray-900 transition-colors duration-300">
                {f.desc[lang]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
} 