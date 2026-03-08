import { motion } from "framer-motion";
import { t } from "@/lib/i18n";
import platformImg from "@/assets/platform-devices.jpg";

const PlatformSection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient">
            {t("platform.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("platform.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <img
            src={platformImg}
            alt="Baller Score on multiple devices"
            className="w-full rounded-2xl shadow-card"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformSection;
