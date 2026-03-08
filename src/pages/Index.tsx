import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureBlock from "@/components/landing/FeatureBlock";
import PlatformSection from "@/components/landing/PlatformSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CtaFooter from "@/components/landing/CtaFooter";
import { t } from "@/lib/i18n";

import featureScoring from "@/assets/feature-scoring.jpg";
import featureDashboard from "@/assets/feature-dashboard.jpg";
import featureStats from "@/assets/feature-stats.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />

      <div id="features">
        <FeatureBlock
          title={t("features.scoring.title")}
          body={t("features.scoring.body")}
          image={featureScoring}
          imageAlt="Baller Score on iPhone and Apple Watch"
        />
      </div>

      <div id="dashboard">
        <FeatureBlock
          title={t("features.dashboard.title")}
          body={t("features.dashboard.body")}
          image={featureDashboard}
          imageAlt="Live dashboard on tablet"
          reversed
        />
      </div>

      <div id="stats">
        <FeatureBlock
          title={t("features.stats.title")}
          body={t("features.stats.body")}
          image={featureStats}
          imageAlt="Post-match statistics on phone"
        />
      </div>

      <PlatformSection />
      <TestimonialsSection />
      <CtaFooter />
    </div>
  );
};

export default Index;
