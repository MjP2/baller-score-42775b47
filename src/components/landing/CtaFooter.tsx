import { motion } from "framer-motion";
import { t } from "@/lib/i18n";
import { Apple } from "lucide-react";

const CtaFooter = () => {
  return (
    <>
      {/* CTA */}
      <section id="cta" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("cta.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                <Apple size={22} />
                <div className="text-left">
                  <div className="text-[10px] opacity-70 leading-none">Download on the</div>
                  <div className="text-sm leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.834 1.639a1 1 0 0 1 0 1.74l-2.834 1.64-2.532-2.533 2.532-2.486zM5.864 2.658L16.8 9.291l-2.302 2.302-8.634-8.935z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-70 leading-none">Get it on</div>
                  <div className="text-sm leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.contact")}
            </a>
            {/* Social icons */}
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CtaFooter;
