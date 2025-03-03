
import { motion } from "framer-motion";

const chains = [
  {
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Binance Smart Chain",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  },
  {
    name: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "Polygon",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  {
    name: "Avalanche",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  },
  {
    name: "More Coming Soon...",
    logo: null,
  },
];

export const SupportedChains = () => {
  return (
    <section className="py-20 bg-white" id="chains">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          Supported <span className="text-blue-600">Blockchains</span>
        </h2>
        <p className="text-center text-secondary mb-12 max-w-3xl mx-auto">
          Our security tools work across multiple chains to provide comprehensive protection
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {chains.map((chain, index) => (
            <motion.div
              key={chain.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              {chain.logo ? (
                <img src={chain.logo} alt={chain.name} className="w-12 h-12 mb-3 object-contain" />
              ) : (
                <div className="w-12 h-12 mb-3 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-xl">+</div>
              )}
              <h3 className="text-primary font-medium text-center text-sm">{chain.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
