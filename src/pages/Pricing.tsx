import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Basic',
    price: '$299',
    priceSuffix: '/ month',
    description: 'For small teams getting started with security compliance.',
    features: [
      '1 User included',
      'NIST CSF Framework',
      'Basic Dashboard & Analytics',
      'Standard Remediation Tasks',
      'Email Support',
    ],
    isMostPopular: false,
  },
  {
    name: 'Advanced',
    price: '$599',
    priceSuffix: '/ month',
    description: 'For growing businesses that need more power and automation.',
    features: [
      '5 Users included',
      'NIST CSF & ISO 27001 Frameworks',
      'Advanced Dashboard & Analytics',
      'Prioritized Action Plan',
      'Kanban Board for Tasks',
      'Priority Email & Chat Support',
    ],
    isMostPopular: true,
  },
  {
    name: 'Pro',
    price: '$1,099',
    priceSuffix: '/ month',
    description: 'For enterprises requiring comprehensive security management.',
    features: [
      '25 Users included',
      'All Frameworks (NIST, ISO, SOC 2, etc.)',
      'Customizable Reports & Analytics',
      'API Access & Integrations (Jira, Slack)',
      'Dedicated Account Manager',
      '24/7 Phone Support',
    ],
    isMostPopular: false,
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-20 md:py-28">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Find the perfect plan for your business
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80">
              Start for free, then get more power and features as you grow.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`flex flex-col ${tier.isMostPopular ? 'border-primary ring-2 ring-primary' : ''}`}
                >
                  {tier.isMostPopular && (
                    <div className="py-1 px-4 bg-primary text-primary-foreground text-sm font-semibold text-center rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div>
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.priceSuffix}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={tier.isMostPopular ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
