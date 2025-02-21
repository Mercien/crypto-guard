
import { motion } from "framer-motion";
import { StartScanDialog } from "./start-scan-dialog";

export const Hero = () => {
  return (
    <section className="relative container mx-auto px-4 pt-20 pb-16 overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/10" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            backgroundSize: ["100% 100%", "150% 150%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            background: "radial-gradient(circle at center, #E5E9F0 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
          Secure Your Crypto Assets
        </h1>
        <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto">
          Advanced AI-powered security analysis for your cryptocurrency wallet.
          Identify vulnerabilities before they become threats.
        </p>
        <StartScanDialog />
      </motion.div>
    </section>
  );
};
