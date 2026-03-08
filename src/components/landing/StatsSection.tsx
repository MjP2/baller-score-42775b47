import { motion } from "framer-motion";
import { t } from "@/lib/i18n";

const stats = [
  { value: "stats.matches.value", label: "stats.matches" },
  { value: "stats.players.value", label: "stats.players" },
  { value: "stats.countries.value", label: "stats.countries" },
  { value: "stats.rating.value", label: "stats.rating" },
];

const StatsSection = () => {
  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="text-3xl sm:text-4xl font-display font-bold text-gradient">
                {t(stat.value)}
              </div>
              <div className="text-sm text-muted-foreground">{t(stat.label)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
