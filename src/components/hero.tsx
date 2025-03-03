
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, CheckCircle2, Scan, AlertCircle, FileCheck, Key } from "lucide-react";
import { StartScanDialog } from "./start-scan-dialog";

const securityStats = [
  { icon: Shield, value: "500+", label: "Malware Variants Detected" },
  { icon: Lock, value: "10k+", label: "Protected Wallets" },
  { icon: AlertCircle, value: "24/7", label: "Real-time Monitoring" },
];

const animationSequence = [
  "Analyzing smart contracts...",
  "Scanning transaction history...",
  "Checking for vulnerabilities...",
  "Securing your assets...",
];

export const Hero = () => {
  const [currentAnimationText, setCurrentAnimationText] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimationText((prev) => (prev + 1) % animationSequence.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative container mx-auto px-4 pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden min-h-[90vh] flex flex-col justify-center">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <motion.span 
            className="inline-block px-3 py-1 bg-blue-600/10 text-blue-600 font-semibold rounded-full text-sm mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AI-Powered Protection
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Secure Your Crypto <span className="text-blue-600">Assets</span> With AI
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-6">
            Advanced AI-powered security analysis for your cryptocurrency wallet.
            Identify vulnerabilities before they become threats.
          </p>
          
          <div className="h-10 mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnimationText}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center text-blue-600 font-medium"
              >
                <Scan className="mr-2 h-5 w-5" />
                {animationSequence[currentAnimationText]}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <StartScanDialog />
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {securityStats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center bg-white rounded-lg p-4 shadow-sm border border-accent/30 hover:border-blue-600/30 hover:shadow-md transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                <span className="text-sm text-secondary text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10 hidden md:block"
        >
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              
              <div className="relative z-10 flex flex-col space-y-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-primary">Wallet Protection</h3>
                      <p className="text-xs text-secondary">Active monitoring</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                    <Key className="h-6 w-6 text-blue-600 mb-2 self-center" />
                    <h4 className="text-sm font-medium text-center">Private Keys</h4>
                    <span className="text-xs text-green-500 text-center mt-1">Secured</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                    <FileCheck className="h-6 w-6 text-blue-600 mb-2 self-center" />
                    <h4 className="text-sm font-medium text-center">Smart Contracts</h4>
                    <span className="text-xs text-green-500 text-center mt-1">Verified</span>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-primary">Security Score</span>
                    <span className="text-xs font-bold text-blue-600">92/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-10 -bottom-10 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3 border border-accent/30"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-primary">Wallet Secured</h4>
                <p className="text-sm text-secondary">Protection active</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
