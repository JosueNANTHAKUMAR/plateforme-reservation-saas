import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, CalendarDaysIcon, ClockIcon, UserIcon, CheckCircleIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import data from '../../data.json';

// Utility to calculate price (simplified from original)
const getEstimate = (vehicle, passengers) => {
    const p = parseInt(passengers);
    if (p >= 9) return 'Sur devis';

    if (vehicle === 'berline') {
        if (p <= 2) return '80€';
        if (p === 3) return '90€';
        return null; // Not available
    }
    if (vehicle === 'van') {
        if (p <= 3) return '90€';
        if (p === 4) return '100€';
        if (p <= 6) return '110€';
        if (p <= 8) return '120€';
        return 'Sur devis';
    }
    return '-';
};

const steps = [
    { id: 1, title: { fr: 'Trajet', en: 'Ride' } },
    { id: 2, title: { fr: 'Véhicule', en: 'Vehicle' } },
    { id: 3, title: { fr: 'Détails', en: 'Details' } },
    { id: 4, title: { fr: 'Récapitulatif', en: 'Summary' } }
];

export default function BookingWizard({ lang }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        transferType: 'transfer',
        from: '',
        to: '',
        date: '',
        time: '',
        vehicle: null,
        passengers: '1',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div id="booking-wizard" className="w-full max-w-4xl mx-auto px-4 py-20 relative z-10">
            <div className="glass-card rounded-3xl overflow-hidden p-8 md:p-12">
                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                    />

                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= step.id ? 'bg-primary text-dark scale-110' : 'bg-dark-card text-gray-500 border border-white/10'
                                    }`}
                            >
                                {currentStep > step.id ? <CheckCircleIcon className="w-6 h-6" /> : step.id}
                            </div>
                            <span className={`text-sm font-medium ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}>
                                {step.title[lang]}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <StepOne key="step1" formData={formData} updateField={updateField} lang={lang} data={data} />
                        )}
                        {currentStep === 2 && (
                            <StepTwo key="step2" formData={formData} updateField={updateField} lang={lang} />
                        )}
                        {currentStep === 3 && (
                            <StepThree key="step3" formData={formData} updateField={updateField} lang={lang} />
                        )}
                        {currentStep === 4 && (
                            <StepFour key="step4" formData={formData} lang={lang} />
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                        {lang === 'fr' ? 'Retour' : 'Back'}
                    </button>

                    <button
                        onClick={nextStep}
                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-dark font-bold hover:bg-white transition-all shadow-lg hover:shadow-primary/20"
                    >
                        {currentStep === 4 ? (lang === 'fr' ? 'Confirmer' : 'Confirm') : (lang === 'fr' ? 'Suivant' : 'Next')}
                        {currentStep !== 4 && <ChevronRightIcon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

function StepOne({ formData, updateField, lang, data }) {
    // Helper to get locations (simplified)
    const locations = [
        ...data.airports.map(a => ({ id: a.id, label: a.name[lang], type: 'airport' })),
        ...data.stations.map(s => ({ id: s.id, label: s.name[lang], type: 'station' })),
        ...data.places.map(p => ({ id: p.id, label: p.name[lang], type: 'place' }))
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h2 className="text-3xl font-display font-bold text-white mb-8">
                {lang === 'fr' ? 'Où souhaitez-vous aller ?' : 'Where would you like to go?'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">{lang === 'fr' ? 'Départ' : 'Pick-up'}</label>
                    <div className="relative">
                        <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <select
                            value={formData.from}
                            onChange={(e) => updateField('from', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:border-primary focus:outline-none appearance-none"
                        >
                            <option value="" className="bg-dark text-gray-500">{lang === 'fr' ? 'Choisir un lieu' : 'Select location'}</option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id} className="bg-dark">{loc.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">{lang === 'fr' ? 'Destination' : 'Drop-off'}</label>
                    <div className="relative">
                        <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <select
                            value={formData.to}
                            onChange={(e) => updateField('to', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:border-primary focus:outline-none appearance-none"
                        >
                            <option value="" className="bg-dark text-gray-500">{lang === 'fr' ? 'Choisir une destination' : 'Select destination'}</option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id} className="bg-dark">{loc.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Date</label>
                    <div className="relative">
                        <CalendarDaysIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => updateField('date', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:border-primary focus:outline-none [color-scheme:dark]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">{lang === 'fr' ? 'Heure' : 'Time'}</label>
                    <div className="relative">
                        <ClockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => updateField('time', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:border-primary focus:outline-none [color-scheme:dark]"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StepTwo({ formData, updateField, lang }) {
    const vehicles = [
        { id: 'berline', name: { fr: 'Berline Affaires', en: 'Business Sedan' }, img: '/ParisPrivateDriver/img/2.png', seats: 3, bags: 2 },
        { id: 'van', name: { fr: 'Van Prestige', en: 'Prestige Van' }, img: '/ParisPrivateDriver/img/4.png', seats: 7, bags: 7 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <h2 className="text-3xl font-display font-bold text-white mb-8">
                {lang === 'fr' ? 'Choisissez votre véhicule' : 'Choose your vehicle'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map(v => {
                    const price = getEstimate(v.id, formData.passengers);
                    const isSelected = formData.vehicle === v.id;

                    return (
                        <div
                            key={v.id}
                            onClick={() => updateField('vehicle', v.id)}
                            className={`relative group cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${isSelected
                                    ? 'bg-white/10 border-primary shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{v.name[lang]}</h3>
                                    <p className="text-sm text-gray-400 mt-1">Mercedes-Benz Class {v.id === 'berline' ? 'E' : 'V'}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-primary">{price}</span>
                                </div>
                            </div>

                            <div className="relative h-40 mb-4 overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
                                <img src={v.img} alt={v.name[lang]} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="flex gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1"><UserIcon className="w-4 h-4" /> {v.seats}</span>
                                <span className="flex items-center gap-1">Suitcases: {v.bags}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

function StepThree({ formData, updateField, lang }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h2 className="text-3xl font-display font-bold text-white mb-8">
                {lang === 'fr' ? 'Vos coordonnées' : 'Your Details'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">{lang === 'fr' ? 'Prénom' : 'First Name'}</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-primary focus:outline-none"
                        placeholder="John"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">{lang === 'fr' ? 'Nom' : 'Last Name'}</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-primary focus:outline-none"
                        placeholder="Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-primary focus:outline-none"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">{lang === 'fr' ? 'Téléphone' : 'Phone'}</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-primary focus:outline-none"
                        placeholder="+33 6 12 34 56 78"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">{lang === 'fr' ? 'Passagers' : 'Passengers'}</label>
                    <select
                        value={formData.passengers}
                        onChange={(e) => updateField('passengers', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-primary focus:outline-none appearance-none"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <option key={n} value={n} className="bg-dark">{n}</option>
                        ))}
                    </select>
                </div>
            </div>
        </motion.div>
    );
}

function StepFour({ formData, lang }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
        >
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-display font-bold text-white mb-4">
                {lang === 'fr' ? 'Prêt à réserver ?' : 'Ready to book?'}
            </h2>

            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {lang === 'fr'
                    ? 'Vérifiez les détails ci-dessous et confirmez votre réservation. Un chauffeur vous sera attribué sous peu.'
                    : 'Check the details below and confirm your booking. A driver will be assigned to you shortly.'}
            </p>

            <div className="bg-white/5 rounded-2xl p-6 max-w-md mx-auto text-left space-y-4 border border-white/10">
                <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Vehicle</span>
                    <span className="text-white font-medium capitalize">{formData.vehicle}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-xl font-bold text-primary">{getEstimate(formData.vehicle, formData.passengers)}</span>
                </div>
            </div>
        </motion.div>
    );
}
