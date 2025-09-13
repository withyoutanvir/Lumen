import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PlanComparison } from "@/components/PlanComparison";
import { UserDashboard } from "@/components/UserDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  Zap, 
  BarChart3, 
  CheckCircle,
  ArrowRight 
} from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'user' | 'admin'>('landing');

  const features = [
    {
      icon: Users,
      title: "User Management",
      description: "Complete subscriber lifecycle management with intuitive dashboards"
    },
    {
      icon: Shield,
      title: "Enterprise Security", 
      description: "Bank-grade security with comprehensive audit trails and compliance"
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Live insights into subscription performance and user behavior"
    },
    {
      icon: BarChart3,
      title: "Advanced Reporting",
      description: "Detailed analytics with AI-powered recommendations for optimization"
    }
  ];

  if (currentView === 'user') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <UserDashboard />
        <div className="fixed bottom-6 right-6 space-x-2">
          <Button onClick={() => setCurrentView('landing')} variant="outline">
            Back to Home
          </Button>
          <Button onClick={() => setCurrentView('admin')} variant="secondary">
            Admin View
          </Button>
        </div>
      </div>
    );
  }

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <AdminDashboard />
        <div className="fixed bottom-6 right-6 space-x-2">
          <Button onClick={() => setCurrentView('landing')} variant="outline">
            Back to Home
          </Button>
          <Button onClick={() => setCurrentView('user')} variant="secondary">
            User View
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PlanComparison />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for telecommunications companies with comprehensive tools for subscription management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center shadow-card hover:shadow-card-hover transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gradient-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Experience the Platform
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our subscription management system from both user and administrator perspectives
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth group cursor-pointer"
                  onClick={() => setCurrentView('user')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-smooth">
                  <Users className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  View the end-user experience for managing subscriptions
                </p>
                <Button variant="success" className="group">
                  Explore User View
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth group cursor-pointer"
                  onClick={() => setCurrentView('admin')}>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Experience the administrative interface for managing plans and analytics
                </p>
                <Button variant="default" className="group">
                  Explore Admin View
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold">Lumen Subscriptions</span>
            </div>
            <p className="text-primary-foreground/80 max-w-md mx-auto">
              Enterprise subscription management system built for telecommunications companies
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Built for Enterprise Scale</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
