import { ShieldCheck, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const Header = () => {
  const navLinks = [
    { title: 'Features', href: '/#features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center mr-6">
          <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold">CyberGuard</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    {link.title}
                  </Link>
                ))}
                 <Link to="/login" className="transition-colors hover:text-foreground/80 text-foreground/60">Log In</Link>
                 <Link to="/signup" className="transition-colors hover:text-foreground/80 text-foreground/60">Sign Up</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
