export default function LangToggle({ lang, setLang }) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setLang(lang === "fr" ? "en" : "fr")}
        className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full transition-all duration-300 font-medium tracking-wide hover:scale-105"
      >
        {lang === "fr" ? "EN" : "FR"}
      </button>
    </div>
  );
}
