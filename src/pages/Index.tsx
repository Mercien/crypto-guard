
import { Shield, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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

const testimonials = [
  {
    content: "This tool helped me identify and fix critical security issues in my crypto wallet.",
    author: "Alex Thompson",
    role: "Crypto Investor",
  },
  {
    content: "The most comprehensive wallet security solution I've used. Highly recommended!",
    author: "Sarah Chen",
    role: "DeFi Developer",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    navigate("/scan");
    toast({
      title: "Welcome!",
      description: "Let's secure your crypto wallet.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Secure Your Crypto Assets
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Advanced AI-powered security analysis for your cryptocurrency wallet.
            Identify vulnerabilities before they become threats.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-accent p-6 rounded-lg"
              >
                <p className="text-lg mb-4 text-primary">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-secondary text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Secure Your Wallet?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start your free security scan today and protect your crypto assets.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300"
          >
            Start Free Scan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
