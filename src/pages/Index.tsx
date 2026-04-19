import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LAKE_IMAGE = "https://cdn.poehali.dev/projects/a1454682-609c-42ec-aa27-9f39288805db/files/34686b49-e95e-4acc-bbce-70b317c503fa.jpg";

const NAV_LINKS = [
  { id: "about", label: "О базе" },
  { id: "rooms", label: "Номера" },
  { id: "activities", label: "Активности" },
  { id: "booking", label: "Бронирование" },
  { id: "contacts", label: "Контакты" },
];

const ROOMS = [
  {
    title: "Берёзовый домик",
    desc: "Уютный домик на 2–4 человека с видом на лес. Деревянная отделка, камин, все удобства.",
    price: "от 4 500 ₽/сутки",
    icon: "Home",
    tags: ["Камин", "2–4 чел.", "Wi-Fi"],
  },
  {
    title: "Номер «У озера»",
    desc: "Просторный номер с панорамным видом на воду. Выход к собственному причалу.",
    price: "от 6 200 ₽/сутки",
    icon: "Waves",
    tags: ["Вид на озеро", "Причал", "2 чел."],
  },
  {
    title: "Семейный коттедж",
    desc: "Большой коттедж для всей семьи на 6–8 человек. Две спальни, гостиная, терраса.",
    price: "от 9 800 ₽/сутки",
    icon: "Trees",
    tags: ["Терраса", "6–8 чел.", "Барбекю"],
  },
];

const ACTIVITIES = [
  {
    emoji: "🎣",
    title: "Рыбалка",
    desc: "Озеро богато щукой, окунем и карасём. Выдаём снасти, можно с лодки или с берега. Рыбный улов приготовим на ужин.",
  },
  {
    emoji: "🚣",
    title: "Катание на лодках",
    desc: "Деревянные лодки и байдарки в аренду. Тихие заводи, живописные берега — исследуйте озеро в своём темпе.",
  },
  {
    emoji: "🏖️",
    title: "Пляж",
    desc: "Собственный песчаный пляж с пирсом. Оборудованные места для отдыха, шезлонги, чистейшая вода.",
  },
  {
    emoji: "⚽",
    title: "Спорт",
    desc: "Волейбольная и баскетбольная площадки, настольный теннис, футбольное поле. Турниры по вечерам.",
  },
];

function useScrollVisible(threshold = 80) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return visible;
}

function useInView(ref: React.RefObject<Element>, rootMargin = "0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, "-60px");
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const navVisible = useScrollVisible(60);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", checkin: "", checkout: "", room: "", guests: "" });
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-golos bg-[#faf8f3] text-[#2a2016] min-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navVisible ? "bg-[#faf8f3]/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
            <span className="text-2xl">🌲</span>
            <div className="text-left">
              <p className="font-cormorant text-xl font-semibold text-[#2f4a1a] leading-none">Ключи Урала</p>
              <p className="text-[10px] text-[#76a254] tracking-widest uppercase">база отдыха</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-[#3a2710] hover:text-[#4f7a2e] transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("booking")}
            className="hidden md:inline-flex items-center gap-2 bg-[#4f7a2e] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#3d6022] transition-colors duration-200"
          >
            Забронировать
          </button>

          <button
            className="md:hidden p-2 text-[#2f4a1a]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf8f3] border-t border-[#e3edd9] px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-[#3a2710] py-1">
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="mt-2 bg-[#4f7a2e] text-white py-2.5 rounded-full text-sm"
            >
              Забронировать
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
        <img
          src={LAKE_IMAGE}
          alt="Озеро"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: "fadeInSlow 1.6s ease-out forwards" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#17250d]/40 via-[#17250d]/20 to-[#17250d]/60" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p
            className="font-golos text-[#c4d9b0] text-sm tracking-[0.3em] uppercase mb-5"
            style={{ opacity: 0, animation: "fadeInUp 0.8s ease-out 0.2s forwards" }}
          >
            База отдыха на берегу озера
          </p>
          <h1
            className="font-cormorant text-white text-5xl md:text-7xl font-light leading-[1.1] mb-6"
            style={{ opacity: 0, animation: "fadeInUp 0.8s ease-out 0.5s forwards" }}
          >
            Ключи <em className="not-italic text-[#9dc07f]">Урала</em>
          </h1>
          <p
            className="text-[#dfc9a4] text-lg md:text-xl font-light max-w-xl mx-auto mb-10"
            style={{ opacity: 0, animation: "fadeInUp 0.8s ease-out 0.8s forwards" }}
          >
            Тишина леса, живое озеро и чистый воздух — настоящий отдых от городской суеты
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ opacity: 0, animation: "fadeInUp 0.8s ease-out 1.1s forwards" }}
          >
            <button
              onClick={() => scrollTo("booking")}
              className="bg-[#4f7a2e] text-white px-8 py-3.5 rounded-full text-base hover:bg-[#3d6022] transition-colors duration-200"
            >
              Забронировать отдых
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="border border-white/50 text-white px-8 py-3.5 rounded-full text-base hover:bg-white/10 transition-colors duration-200"
            >
              Узнать подробнее
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce"
        >
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#76a254] text-sm tracking-[0.25em] uppercase font-golos mb-4">О нас</p>
                <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2f4a1a] leading-[1.15] mb-6">
                  Место, где природа<br /><em className="not-italic text-[#8f6120]">лечит душу</em>
                </h2>
                <p className="text-[#5a4030] leading-relaxed mb-5">
                  Наша база расположена в живописном сосновом лесу на берегу чистейшего лесного озера. Здесь нет суеты — только шум ветра в кронах, плеск воды и пение птиц.
                </p>
                <p className="text-[#5a4030] leading-relaxed mb-8">
                  Мы принимаем гостей с 2008 года. За это время тысячи семей, пар и компаний нашли здесь настоящий отдых: рыбалку на рассвете, вечерние костры и долгие прогулки по лесным тропам.
                </p>
                <div className="flex flex-wrap gap-8">
                  {[["15+", "лет работы"], ["3 000+", "довольных гостей"], ["5 га", "территория"]].map(([num, label]) => (
                    <div key={label}>
                      <p className="font-cormorant text-3xl text-[#4f7a2e] font-semibold">{num}</p>
                      <p className="text-sm text-[#8f6120]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                  <img src={LAKE_IMAGE} alt="База отдыха" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#f0e6d3] rounded-xl p-5 shadow-lg">
                  <p className="font-cormorant text-2xl text-[#4f7a2e] font-semibold">Открыто</p>
                  <p className="text-sm text-[#8f6120]">круглый год</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#c4d9b0] to-transparent mx-6" />

      {/* ROOMS */}
      <section id="rooms" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#76a254] text-sm tracking-[0.25em] uppercase mb-3">Размещение</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2f4a1a]">Номера и домики</h2>
            <p className="text-[#5a4030] mt-4 max-w-lg mx-auto">
              Каждый вариант размещения создан для комфортного отдыха с ощущением близости к природе
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <AnimatedSection key={room.title}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e3edd9] hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-[#e3edd9] to-[#f0e6d3] h-44 flex items-center justify-center">
                    <Icon name={room.icon as "Home" | "Waves" | "Trees"} size={52} className="text-[#4f7a2e] opacity-60" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-cormorant text-2xl text-[#2f4a1a] font-semibold mb-2">{room.title}</h3>
                    <p className="text-[#5a4030] text-sm leading-relaxed mb-4 flex-1">{room.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {room.tags.map((tag) => (
                        <span key={tag} className="bg-[#e3edd9] text-[#3d6022] text-xs px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-cormorant text-xl text-[#8f6120] font-semibold">{room.price}</span>
                      <button
                        onClick={() => scrollTo("booking")}
                        className="bg-[#4f7a2e] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3d6022] transition-colors"
                      >
                        Выбрать
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities" className="py-24 px-6 bg-[#f3f7f0]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#76a254] text-sm tracking-[0.25em] uppercase mb-3">Досуг</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2f4a1a]">Активности</h2>
            <p className="text-[#5a4030] mt-4 max-w-lg mx-auto">
              У нас есть занятие для каждого — будь то тихая рыбалка или активный спорт на свежем воздухе
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {ACTIVITIES.map((act) => (
              <AnimatedSection key={act.title}>
                <div className="bg-white rounded-2xl p-7 border border-[#e3edd9] hover:border-[#9dc07f] transition-colors duration-300 flex gap-5">
                  <span className="text-4xl flex-shrink-0 mt-1">{act.emoji}</span>
                  <div>
                    <h3 className="font-cormorant text-2xl text-[#2f4a1a] font-semibold mb-2">{act.title}</h3>
                    <p className="text-[#5a4030] text-sm leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#76a254] text-sm tracking-[0.25em] uppercase mb-3">Онлайн</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#2f4a1a]">Забронировать</h2>
            <p className="text-[#5a4030] mt-4">Заполните форму — мы свяжемся с вами в течение часа</p>
          </AnimatedSection>

          <AnimatedSection>
            {submitted ? (
              <div className="bg-[#f3f7f0] border border-[#c4d9b0] rounded-2xl p-12 text-center">
                <span className="text-5xl mb-4 block">🌿</span>
                <h3 className="font-cormorant text-2xl text-[#2f4a1a] font-semibold mb-2">Заявка отправлена!</h3>
                <p className="text-[#5a4030]">Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#e3edd9] p-8 shadow-sm space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#5a4030] mb-1.5">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#dfc9a4] rounded-xl px-4 py-2.5 text-sm text-[#2a2016] placeholder:text-[#c9a46e]/60 focus:outline-none focus:border-[#76a254] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#5a4030] mb-1.5">Телефон</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-[#dfc9a4] rounded-xl px-4 py-2.5 text-sm text-[#2a2016] placeholder:text-[#c9a46e]/60 focus:outline-none focus:border-[#76a254] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#5a4030] mb-1.5">Дата заезда</label>
                    <input
                      type="date"
                      required
                      value={form.checkin}
                      onChange={(e) => setForm({ ...form, checkin: e.target.value })}
                      className="w-full border border-[#dfc9a4] rounded-xl px-4 py-2.5 text-sm text-[#2a2016] focus:outline-none focus:border-[#76a254] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#5a4030] mb-1.5">Дата выезда</label>
                    <input
                      type="date"
                      required
                      value={form.checkout}
                      onChange={(e) => setForm({ ...form, checkout: e.target.value })}
                      className="w-full border border-[#dfc9a4] rounded-xl px-4 py-2.5 text-sm text-[#2a2016] focus:outline-none focus:border-[#76a254] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#5a4030] mb-1.5">Тип размещения</label>
                    <select
                      value={form.room}
                      onChange={(e) => setForm({ ...form, room: e.target.value })}
                      className="w-full border border-[#dfc9a4] rounded-xl px-4 py-2.5 text-sm text-[#2a2016] focus:outline-none focus:border-[#76a254] transition-colors bg-white"
                    >
                      <option value="">Выберите...</option>
                      <option>Берёзовый домик</option>
                      <option>Номер «У озера»</option>
                      <option>Семейный коттедж</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#5a4030] mb-1.5">Количество гостей</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      placeholder="2"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full border border-[#dfc9a4] rounded-xl px-4 py-2.5 text-sm text-[#2a2016] placeholder:text-[#c9a46e]/60 focus:outline-none focus:border-[#76a254] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4f7a2e] text-white py-3.5 rounded-full text-base hover:bg-[#3d6022] transition-colors duration-200 mt-2"
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-center text-[#9dc07f]">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-[#2f4a1a]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[#76a254] text-sm tracking-[0.25em] uppercase mb-3">Связь</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white">Контакты</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00", sub: "ежедневно 8:00–21:00" },
                { icon: "MapPin", label: "Адрес", value: "Лесная обл., пос. Тихие воды", sub: "120 км от города" },
                { icon: "Mail", label: "Email", value: "hello@lesnaya-zavod.ru", sub: "ответим в течение дня" },
              ].map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4f7a2e] flex items-center justify-center">
                    <Icon name={c.icon as "Phone" | "MapPin" | "Mail"} size={20} className="text-white" />
                  </div>
                  <p className="text-[#9dc07f] text-xs tracking-widest uppercase">{c.label}</p>
                  <p className="text-white text-lg font-cormorant font-semibold">{c.value}</p>
                  <p className="text-[#76a254] text-xs">{c.sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#17250d] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌲</span>
            <span className="font-cormorant text-[#9dc07f] text-lg">Ключи Урала</span>
          </div>
          <p className="text-[#4f7a2e] text-xs text-center">
            © 2025 База отдыха «Ключи Урала». Все права защищены.
          </p>
          <div className="flex gap-4">
            {NAV_LINKS.slice(0, 3).map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-[#4f7a2e] text-xs hover:text-[#76a254] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}