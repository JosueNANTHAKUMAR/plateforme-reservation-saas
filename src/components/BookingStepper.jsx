import { useState } from 'react';
import { MapPinIcon, BuildingLibraryIcon, ArrowPathIcon, ClockIcon, CalendarDaysIcon, FlagIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import data from '../../data.json';

const steps = [
  { key: 'type', label: 'Service' },
  { key: 'from', label: 'Départ' },
  { key: 'to', label: 'Destination' },
  { key: 'datetime', label: 'Date & Heure' },
  { key: 'options', label: 'Options' },
  { key: 'summary', label: 'Résumé' }
];

const hourOptions = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
const minuteOptions = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
const durationOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}`);

function getLocationGroups(data, lang) {
  return [
    {
      label: 'Aéroports',
      icon: <MapPinIcon className="w-5 h-5 text-[#0b1d3a]" />,
      options: data.airports.map(a => ({
        id: a.id,
        icon: <MapPinIcon className="w-5 h-5 text-[#0b1d3a] inline-block mr-2" />, 
        label: a.name[lang]
      }))
    },
    {
      label: 'Gares',
      icon: <BuildingLibraryIcon className="w-5 h-5 text-[#0b1d3a]" />,
      options: data.stations.map(s => ({
        id: s.id,
        icon: <BuildingLibraryIcon className="w-5 h-5 text-[#0b1d3a] inline-block mr-2" />, 
        label: s.name[lang]
      }))
    }
  ];
}

export default function BookingStepper({ lang }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: 'transfer',
    from: '',
    to: '',
    date: '',
    hour: '',
    minute: '',
    roundTrip: false,
    address: '',
    duration: '1'
  });
  const [showSummary, setShowSummary] = useState(false);

  const goNext = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const goPrev = () => setStep(s => Math.max(s - 1, 0));

  // Stepper header
  const Stepper = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-base border-2 transition-all duration-200 
            ${i < step ? 'bg-[#0b1d3a] text-white border-[#0b1d3a]' : i === step ? 'bg-white text-[#0b1d3a] border-[#0b1d3a]' : 'bg-gray-200 text-gray-400 border-gray-200'}`}>{i < step ? <CheckCircleIcon className="w-6 h-6" /> : i + 1}</div>
          {i < steps.length - 1 && <div className="w-8 h-1 bg-gray-200 mx-1 rounded" />}
        </div>
      ))}
    </div>
  );

  // Step 1: Type de service
  const StepType = () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex gap-4">
        <button
          className={`flex flex-col items-center px-8 py-4 rounded-2xl border-2 shadow transition-all duration-200 text-lg font-semibold 
            ${form.type === 'transfer' ? 'bg-[#0b1d3a] text-white border-[#0b1d3a]' : 'bg-white text-[#0b1d3a] border-[#0b1d3a] hover:bg-[#1b2a46] hover:text-white'}`}
          onClick={() => setForm(f => ({ ...f, type: 'transfer' }))}
        >
          <ArrowPathIcon className="w-8 h-8 mb-2 text-[#0b1d3a]" />
          {lang === 'fr' ? 'Transfert' : 'Transfer'}
        </button>
        <button
          className={`flex flex-col items-center px-8 py-4 rounded-2xl border-2 shadow transition-all duration-200 text-lg font-semibold 
            ${form.type === 'hourly' ? 'bg-[#0b1d3a] text-white border-[#0b1d3a]' : 'bg-white text-[#0b1d3a] border-[#0b1d3a] hover:bg-[#1b2a46] hover:text-white'}`}
          onClick={() => setForm(f => ({ ...f, type: 'hourly' }))}
        >
          <ClockIcon className="w-8 h-8 mb-2 text-[#0b1d3a]" />
          {lang === 'fr' ? 'À l\'heure' : 'Hourly'}
        </button>
      </div>
      <button onClick={goNext} className="mt-8 px-8 py-3 rounded-full bg-[#0b1d3a] text-white font-bold text-lg shadow hover:bg-[#1b2a46] transition">{lang === 'fr' ? 'Suivant' : 'Next'}</button>
    </div>
  );

  // Step 2: Lieu de départ
  const StepFrom = () => {
    const groups = getLocationGroups(data, lang);
    return (
      <div className="flex flex-col gap-6 items-center">
        <div className="w-full">
          <label className="block text-[#0b1d3a] font-semibold mb-2 text-lg flex items-center gap-2"><MapPinIcon className="w-6 h-6" />{lang === 'fr' ? 'Lieu de départ' : 'Departure location'}</label>
          <select
            name="from"
            value={form.from}
            onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0b1d3a] focus:outline-none appearance-none bg-white text-gray-900 text-base pr-10"
          >
            <option value="" disabled>{lang === 'fr' ? 'Choisissez un lieu' : 'Choose a location'}</option>
            {groups.map((group, i) => (
              <optgroup key={i} label={group.label}>
                {group.options.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <button onClick={goNext} className="mt-8 px-8 py-3 rounded-full bg-[#0b1d3a] text-white font-bold text-lg shadow hover:bg-[#1b2a46] transition">{lang === 'fr' ? 'Suivant' : 'Next'}</button>
        <button onClick={goPrev} className="mt-2 text-[#0b1d3a] underline">{lang === 'fr' ? 'Précédent' : 'Back'}</button>
      </div>
    );
  };

  // Step 3: Destination
  const StepTo = () => {
    const groups = getLocationGroups(data, lang);
    return (
      <div className="flex flex-col gap-6 items-center">
        <div className="w-full">
          <label className="block text-[#0b1d3a] font-semibold mb-2 text-lg flex items-center gap-2"><FlagIcon className="w-6 h-6" />{lang === 'fr' ? 'Destination' : 'Destination'}</label>
          <select
            name="to"
            value={form.to}
            onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0b1d3a] focus:outline-none appearance-none bg-white text-gray-900 text-base pr-10"
          >
            <option value="" disabled>{lang === 'fr' ? 'Choisissez une destination' : 'Choose a destination'}</option>
            {groups.map((group, i) => (
              <optgroup key={i} label={group.label}>
                {group.options.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <button onClick={goNext} className="mt-8 px-8 py-3 rounded-full bg-[#0b1d3a] text-white font-bold text-lg shadow hover:bg-[#1b2a46] transition">{lang === 'fr' ? 'Suivant' : 'Next'}</button>
        <button onClick={goPrev} className="mt-2 text-[#0b1d3a] underline">{lang === 'fr' ? 'Précédent' : 'Back'}</button>
      </div>
    );
  };

  // Step 4: Date & Heure
  const StepDatetime = () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full flex gap-2">
        <div className="flex-1">
          <label className="block text-[#0b1d3a] font-semibold mb-2 text-lg flex items-center gap-2"><CalendarDaysIcon className="w-6 h-6" />{lang === 'fr' ? 'Date' : 'Date'}</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0b1d3a] focus:outline-none bg-white text-gray-900 text-base"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[#0b1d3a] font-semibold mb-2 text-lg flex items-center gap-2"><ClockIcon className="w-6 h-6" />{lang === 'fr' ? 'Heure' : 'Hour'}</label>
          <select
            name="hour"
            value={form.hour}
            onChange={e => setForm(f => ({ ...f, hour: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0b1d3a] focus:outline-none bg-white text-gray-900 text-base"
          >
            <option value="" disabled>{lang === 'fr' ? 'Heure' : 'Hour'}</option>
            {hourOptions.map(opt => (
              <option key={opt} value={opt}>{opt} h</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#0b1d3a] font-semibold mb-2 text-lg flex items-center gap-2"><ClockIcon className="w-6 h-6" />{lang === 'fr' ? 'Minute' : 'Minute'}</label>
          <select
            name="minute"
            value={form.minute}
            onChange={e => setForm(f => ({ ...f, minute: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0b1d3a] focus:outline-none bg-white text-gray-900 text-base"
          >
            <option value="" disabled>{lang === 'fr' ? 'Minute' : 'Minute'}</option>
            {minuteOptions.map(opt => (
              <option key={opt} value={opt}>{opt} min</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={goNext} className="mt-8 px-8 py-3 rounded-full bg-[#0b1d3a] text-white font-bold text-lg shadow hover:bg-[#1b2a46] transition">{lang === 'fr' ? 'Suivant' : 'Next'}</button>
      <button onClick={goPrev} className="mt-2 text-[#0b1d3a] underline">{lang === 'fr' ? 'Précédent' : 'Back'}</button>
    </div>
  );

  // Step 5: Options
  const StepOptions = () => (
    <div className="flex flex-col gap-6 items-center">
      {form.type === 'transfer' ? (
        <div className="w-full">
          <label className="block text-[#0b1d3a] font-semibold mb-2 text-lg flex items-center gap-2"><FlagIcon className="w-6 h-6" />{lang === 'fr' ? 'Adresse de destination' : 'Destination address'}</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0b1d3a] focus:outline-none bg-white text-gray-900 text-base"
            placeholder={lang === 'fr' ? 'Saisissez l\'adresse de destination' : 'Enter destination address'}
          />
        </div>
      ) : (
        <div className="w-full">
          <label className="block text-[#0b1d3a] font-semibold mb-2 text-lg flex items-center gap-2"><ClockIcon className="w-6 h-6" />{lang === 'fr' ? 'Nombre d\'heures' : 'Number of hours'}</label>
          <select
            name="duration"
            value={form.duration}
            onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0b1d3a] focus:outline-none bg-white text-gray-900 text-base"
          >
            {durationOptions.map(opt => (
              <option key={opt} value={opt}>{opt} {lang === 'fr' ? 'Heure' : 'Hour'}{opt !== '1' ? 's' : ''}</option>
            ))}
          </select>
        </div>
      )}
      <div className="flex items-center gap-2 mt-2 w-full">
        <input
          type="checkbox"
          id="roundTrip"
          name="roundTrip"
          checked={form.roundTrip}
          onChange={e => setForm(f => ({ ...f, roundTrip: e.target.checked }))}
          className="accent-[#0b1d3a] w-4 h-4"
        />
        <label htmlFor="roundTrip" className="text-[#0b1d3a] font-medium flex items-center gap-1">
          {lang === 'fr' ? 'Aller/retour' : 'Round trip'}
        </label>
      </div>
      <button onClick={goNext} className="mt-8 px-8 py-3 rounded-full bg-[#0b1d3a] text-white font-bold text-lg shadow hover:bg-[#1b2a46] transition">{lang === 'fr' ? 'Voir le résumé' : 'See summary'}</button>
      <button onClick={goPrev} className="mt-2 text-[#0b1d3a] underline">{lang === 'fr' ? 'Précédent' : 'Back'}</button>
    </div>
  );

  // Step 6: Résumé
  const StepSummary = () => (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full bg-gray-50 rounded-xl p-6 shadow text-[#0b1d3a]">
        <h3 className="text-xl font-bold mb-4">{lang === 'fr' ? 'Résumé de la réservation' : 'Booking summary'}</h3>
        <ul className="space-y-2">
          <li><b>{lang === 'fr' ? 'Service' : 'Service'} :</b> {form.type === 'transfer' ? (lang === 'fr' ? 'Transfert' : 'Transfer') : (lang === 'fr' ? 'À l\'heure' : 'Hourly')}</li>
          <li><b>{lang === 'fr' ? 'Départ' : 'From'} :</b> {form.from}</li>
          <li><b>{lang === 'fr' ? 'Destination' : 'To'} :</b> {form.to}</li>
          <li><b>{lang === 'fr' ? 'Date' : 'Date'} :</b> {form.date}</li>
          <li><b>{lang === 'fr' ? 'Heure' : 'Hour'} :</b> {form.hour}h{form.minute}</li>
          {form.type === 'transfer' ? (
            <li><b>{lang === 'fr' ? 'Adresse' : 'Address'} :</b> {form.address}</li>
          ) : (
            <li><b>{lang === 'fr' ? 'Durée' : 'Duration'} :</b> {form.duration} {lang === 'fr' ? 'heure(s)' : 'hour(s)'}</li>
          )}
          <li><b>{lang === 'fr' ? 'Aller/retour' : 'Round trip'} :</b> {form.roundTrip ? 'Oui / Yes' : 'Non / No'}</li>
        </ul>
      </div>
      <button className="mt-8 px-8 py-3 rounded-full bg-[#0b1d3a] text-white font-bold text-lg shadow hover:bg-[#1b2a46] transition">{lang === 'fr' ? 'Réserver' : 'Book now'}</button>
      <button onClick={goPrev} className="mt-2 text-[#0b1d3a] underline">{lang === 'fr' ? 'Précédent' : 'Back'}</button>
    </div>
  );

  return (
    <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl mx-auto text-gray-900 mt-8 mb-12">
      <Stepper />
      {step === 0 && <StepType />}
      {step === 1 && <StepFrom />}
      {step === 2 && <StepTo />}
      {step === 3 && <StepDatetime />}
      {step === 4 && <StepOptions />}
      {step === 5 && <StepSummary />}
    </div>
  );
} 