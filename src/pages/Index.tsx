import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import FeatureBlock from "@/components/landing/FeatureBlock";
import StatsSection from "@/components/landing/StatsSection";
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
        <FeatureGrid />
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
          subtitle={t("features.dashboard.subtitle")}
          body={t("features.dashboard.body")}
          bullets={[
            t("features.dashboard.bullet1"),
            t("features.dashboard.bullet2"),
            t("features.dashboard.bullet3"),
            t("features.dashboard.bullet4"),
          ]}
          image={featureDashboard}
          imageAlt="Live dashboard on tablet"
          reversed
          badge="Live Feature"
        />
      </div>

      <div id="stats">
        <FeatureBlock
          title={t("features.stats.title")}
          subtitle={t("features.stats.subtitle")}
          body={t("features.stats.body")}
          image={featureStats}
          imageAlt="Post-match statistics on phone"
        />
      </div>

      <StatsSection />
      <PlatformSection />
      <TestimonialsSection />
      <CtaFooter />
    </div>
  );
};

export default Index;
