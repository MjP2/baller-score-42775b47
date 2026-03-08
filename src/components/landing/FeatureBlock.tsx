import { motion } from "framer-motion";

interface FeatureBlockProps {
  id?: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  reversed?: boolean;
}

const FeatureBlock = ({ id, title, body, image, imageAlt, reversed = false }: FeatureBlockProps) => {
  return (
    <section id={id} className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col ${
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-12 lg:gap-20`}
        >
          {/* Image */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: reversed ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-card glow-purple">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="flex-1 space-y-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{body}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBlock;
