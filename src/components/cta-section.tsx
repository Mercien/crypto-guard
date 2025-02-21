
import { StartScanDialog } from "./start-scan-dialog";

export const CTASection = () => {
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Secure Your Wallet?
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Start your free security scan today and protect your crypto assets.
        </p>
        <StartScanDialog variant="secondary" />
      </div>
    </section>
  );
};
