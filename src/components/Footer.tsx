import { ShieldCheck, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold text-lg">CyberGuard</span>
            </Link>
            <p className="text-sm text-foreground/60">Your virtual CISO, simplified.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/#features" className="text-sm text-foreground/60 hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="text-sm text-foreground/60 hover:text-foreground">Pricing</Link></li>
                <li><a href="#contact" className="text-sm text-foreground/60 hover:text-foreground">Request a Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-sm text-foreground/60 hover:text-foreground">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} CyberGuard, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-foreground/60 hover:text-foreground"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-foreground/60 hover:text-foreground"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-foreground/60 hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
