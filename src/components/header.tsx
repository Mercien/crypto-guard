
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <header className="w-full py-4 px-6 relative z-10">
      <div className="container mx-auto flex items-center justify-center md:justify-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">CryptoGuard</span>
        </motion.div>
      </div>
    </header>
  );
};
