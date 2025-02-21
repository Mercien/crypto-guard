
import { motion } from "framer-motion";

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

export const Testimonials = () => {
  return (
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
  );
};
