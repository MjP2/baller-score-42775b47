import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "@/lib/i18n";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { quote: "testimonials.card1.quote", author: "testimonials.card1.author", desc: "testimonials.card1.desc" },
  { quote: "testimonials.card2.quote", author: "testimonials.card2.author", desc: "testimonials.card2.desc" },
  { quote: "testimonials.card3.quote", author: "testimonials.card3.author", desc: "testimonials.card3.desc" },
  { quote: "testimonials.card4.quote", author: "testimonials.card4.author", desc: "testimonials.card4.desc" },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-card rounded-2xl p-8 sm:p-12 border border-border shadow-card text-center"
            >
              <Quote className="mx-auto mb-6 text-primary opacity-50" size={40} />
              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                "{t(testimonials[current].quote)}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display font-bold text-sm">
                  {t(testimonials[current].author).charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-foreground">
                    {t(testimonials[current].author)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(testimonials[current].desc)}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
