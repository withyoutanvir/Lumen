import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Calendar, 
  Users, 
  TrendingUp, 
  Settings,
  Download,
  Bell,
  ArrowUpRight
} from "lucide-react";

interface SubscriptionData {
  plan: string;
  status: "active" | "cancelled" | "expired";
  renewalDate: string;
  usage: number;
  usageLimit: number;
  monthlyCost: number;
}

export function UserDashboard() {
  const subscriptionData: SubscriptionData = {
    plan: "Professional",
    status: "active",
    renewalDate: "2024-10-15",
    usage: 750,
    usageLimit: 1000,
    monthlyCost: 79
  };

  const usagePercentage = (subscriptionData.usage / subscriptionData.usageLimit) * 100;

  const quickActions = [
    { name: "Upgrade Plan", icon: TrendingUp, color: "bg-success" },
    { name: "Manage Payment", icon: CreditCard, color: "bg-primary" },
    { name: "Download Invoice", icon: Download, color: "bg-secondary" },
    { name: "Settings", icon: Settings, color: "bg-muted" },
  ];

  const recentActivity = [
    { action: "Subscription renewed", date: "2024-09-15", status: "success" },
    { action: "Usage limit alert", date: "2024-09-10", status: "warning" },
    { action: "Payment processed", date: "2024-09-01", status: "success" },
    { action: "Plan upgraded", date: "2024-08-25", status: "info" },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Manage your subscription and monitor usage</p>
          </div>
          <Button variant="outline" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan Card */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Current Plan</span>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      {subscriptionData.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Your {subscriptionData.plan} plan details and usage
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Manage Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">{subscriptionData.plan}</div>
                  <div className="text-sm text-muted-foreground">Current Plan</div>
                </div>
                <div className="text-center p-4 bg-gradient-card rounded-lg border">
                  <div className="text-2xl font-bold text-foreground">${subscriptionData.monthlyCost}</div>
                  <div className="text-sm text-muted-foreground">Monthly Cost</div>
                </div>
                <div className="text-center p-4 bg-gradient-card rounded-lg border">
                  <div className="text-2xl font-bold text-foreground">{subscriptionData.renewalDate}</div>
                  <div className="text-sm text-muted-foreground">Renewal Date</div>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Subscriber Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {subscriptionData.usage} / {subscriptionData.usageLimit}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {usagePercentage < 80 ? "You're within your usage limits" : "Consider upgrading your plan"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your account and subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-12 hover:bg-accent"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span>{action.name}</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3 shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest subscription activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === "success" ? "bg-success" :
                        activity.status === "warning" ? "bg-warning" :
                        activity.status === "info" ? "bg-primary" : "bg-muted"
                      }`}></div>
                      <span className="font-medium">{activity.action}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}