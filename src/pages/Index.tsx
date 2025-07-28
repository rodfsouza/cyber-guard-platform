import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart3, ClipboardList, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <ClipboardList className="h-8 w-8 text-primary" />,
      title: 'Dynamic Assessments',
      description: 'Utilize frameworks like NIST CSF and ISO 27001 to evaluate your security posture.',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: 'Insightful Dashboards',
      description: 'Visualize your compliance status, risk areas, and progress over time with interactive charts.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: 'Actionable Remediation',
      description: 'Get a prioritized action plan to address identified gaps and track remediation tasks.',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Conduct Assessment',
      description: 'Answer guided questionnaires based on industry-leading cybersecurity frameworks.',
    },
    {
      step: 2,
      title: 'View Insights',
      description: 'Receive an automated security score and a visual breakdown of your risk profile.',
    },
    {
      step: 3,
      title: 'Remediate & Improve',
      description: 'Follow a clear action plan to mitigate risks and continuously enhance your security.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Your Virtual CISO, Simplified.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
              Assess, manage, and improve your cybersecurity posture with an all-in-one platform designed for growing businesses.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">Get Started for Free</Button>
              <Button size="lg" variant="outline">Request a Demo</Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">A smarter way to manage cybersecurity</h2>
              <p className="max-w-2xl mx-auto mt-4 text-foreground/60">
                CyberGuard provides the tools you need to build a robust security program without the complexity.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-background/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Get compliant in 3 easy steps</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {howItWorks.map((item) => (
                <div key={item.step}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-foreground/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section className="py-20 bg-secondary">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built on Trusted Frameworks</h2>
            <p className="max-w-2xl mx-auto text-foreground/60 mb-8">
              We support leading industry standards to ensure comprehensive coverage.
            </p>
            <div className="flex justify-center items-center gap-8 md:gap-12 text-foreground/80">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="font-semibold text-lg">NIST CSF</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="font-semibold text-lg">ISO/IEC 27001</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg text-foreground/60">SOC 2 (Coming Soon)</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
