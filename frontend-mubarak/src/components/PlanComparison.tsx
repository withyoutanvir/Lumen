import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Star, Zap, Users } from "lucide-react";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: PlanFeature[];
  popular?: boolean;
  icon: React.ElementType;
  buttonVariant: "default" | "premium" | "hero";
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses getting started",
    price: 29,
    period: "month",
    icon: Zap,
    buttonVariant: "default",
    features: [
      { name: "Up to 100 subscribers", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "API access", included: false },
      { name: "Custom integrations", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for growing businesses",
    price: 79,
    period: "month",
    popular: true,
    icon: Users,
    buttonVariant: "premium",
    features: [
      { name: "Up to 1,000 subscribers", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Email & chat support", included: true },
      { name: "API access", included: true },
      { name: "Custom integrations", included: true },
      { name: "Priority support", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large-scale operations",
    price: 199,
    period: "month",
    icon: Star,
    buttonVariant: "hero",
    features: [
      { name: "Unlimited subscribers", included: true },
      { name: "Real-time analytics", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Full API access", included: true },
      { name: "Custom integrations", included: true },
      { name: "Priority support", included: true },
    ],
  },
];

export function PlanComparison() {
  return (
    <section id="plans" className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options designed to scale with your business needs
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative transition-smooth hover:shadow-card-hover ${
                plan.popular 
                  ? "border-primary shadow-primary scale-105" 
                  : "shadow-card hover:scale-105"
              } animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-6 py-1">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 mx-auto">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.popular ? "Start Free Trial" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We've got you covered.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}