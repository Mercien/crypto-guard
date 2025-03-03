
import { motion } from "framer-motion";

const partners = [
  {
    name: "Coinbase",
    logo: "https://images.unsplash.com/photo-1622012075988-5417f78568ce?auto=format&fit=crop&w=200&h=200",
  },
  {
    name: "Metamask",
    logo: "https://images.unsplash.com/photo-1640832884929-54e7796c8c48?auto=format&fit=crop&w=200&h=200",
  },
  {
    name: "Binance",
    logo: "https://images.unsplash.com/photo-1671431678431-c6dd24b6daa6?auto=format&fit=crop&w=200&h=200",
  },
  {
    name: "Blockchain.com",
    logo: "https://images.unsplash.com/photo-1609564484737-576bb6699caf?auto=format&fit=crop&w=200&h=200",
  },
];

export const Partners = () => {
  return (
    <section className="py-16 bg-accent/20" id="partners">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          Trusted Partners
        </h2>
        <p className="text-center text-secondary mb-12 max-w-3xl mx-auto">
          Working with industry leaders to provide the best security solutions
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center"
              style={{ width: '180px', height: '120px' }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
