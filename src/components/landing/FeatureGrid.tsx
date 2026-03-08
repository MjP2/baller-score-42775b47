import { motion } from "framer-motion";
import { t } from "@/lib/i18n";
import { Smartphone, Target, Volume2 } from "lucide-react";

const features = [
  { icon: Smartphone, title: "featuregrid.sync.title", body: "featuregrid.sync.body" },
  { icon: Target, title: "featuregrid.scoring.title", body: "featuregrid.scoring.body" },
  { icon: Volume2, title: "featuregrid.voice.title", body: "featuregrid.voice.body" },
];

const FeatureGrid = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">
            {t("featuregrid.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("featuregrid.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gradient-card rounded-2xl border border-border p-8 space-y-4 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                {t(feature.title)}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t(feature.body)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
