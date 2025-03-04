import { motion } from "framer-motion";

const partners = [
  {
    name: "Coinbase",
    logo: "https://assets.coinbase.com/assets/cornerstoneLogos/coinbase.f6c7b5c1affdb76417a.svg",
  },
  {
    name: "Metamask",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    name: "Binance",
    logo: "https://cryptologos.cc/logos/binance-usd-busd-logo.png",
  },
  {
    name: "Blockchain.com",
    logo: "https://cryptologos.cc/logos/oasis-network-rose-logo.png",
  },
];

export const Partners = () => {
  return (
    <section className="py-16 bg-accent/20" id="partners">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          Trusted <span className="text-blue-600">Partners</span>
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
