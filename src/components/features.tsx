
import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Contract Analysis",
    description: "Deep scan of smart contract vulnerabilities",
    icon: Shield,
  },
  {
    title: "Transaction Monitoring",
    description: "Real-time monitoring of suspicious activities",
    icon: Lock,
  },
  {
    title: "AI-Powered Insights",
    description: "Advanced AI analysis of wallet security",
    icon: CheckCircle2,
  },
];

export const Features = () => {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Comprehensive Security Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
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
