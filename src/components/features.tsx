
import { Shield, Link2Off, FileWarning, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Web3 Malware Detector",
    description: "Advanced detection of malicious code in web3 applications and smart contracts",
    icon: Shield,
  },
  {
    title: "Phishing Sites Blocking",
    description: "Proactive identification and blocking of crypto phishing attempts",
    icon: Link2Off,
  },
  {
    title: "Malware Smart Contracts Blocking",
    description: "Automatic blocking of interactions with potentially harmful smart contracts",
    icon: FileWarning,
  },
  {
    title: "Smart Contract Risk Score",
    description: "Comprehensive risk assessment of smart contracts before interaction",
    icon: BarChart3,
  },
];

export const Features = () => {
  return (
    <section className="bg-muted py-20" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          Advanced Protection Features
        </h2>
        <p className="text-center text-secondary mb-12 max-w-3xl mx-auto">
          Our AI-powered platform offers comprehensive security features to protect your digital assets
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-accent/30"
            >
              <div className="bg-primary/5 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
