
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-accent py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary">CryptoGuard</span>
          </div>
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} CryptoGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
