import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const assessments = [
  {
    title: 'NIST Cybersecurity Framework (CSF)',
    description: 'A popular framework to help organizations better understand, manage, and reduce their cybersecurity risk.',
    status: 'Not Started',
  },
  {
    title: 'ISO/IEC 27001',
    description: 'An international standard on how to manage information security.',
    status: 'In Progress (34% complete)',
  },
];

const Assessments = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assessments</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Assessment
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {assessments.map((assessment) => (
          <Card key={assessment.title}>
            <CardHeader>
              <CardTitle>{assessment.title}</CardTitle>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground">Status: <span className="text-foreground">{assessment.status}</span></p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                {assessment.status === 'Not Started' ? 'Start Assessment' : 'Continue Assessment'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Assessments;
