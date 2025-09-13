import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminStats {
  totalSubscribers: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  churnRate: number;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  subscribers: number;
  status: "active" | "inactive";
  revenue: number;
}

export function AdminDashboard() {
  const adminStats: AdminStats = {
    totalSubscribers: 12847,
    monthlyRevenue: 89450,
    activeSubscriptions: 11203,
    churnRate: 2.3
  };

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      subscribers: 3540,
      status: "active",
      revenue: 102660
    },
    {
      id: "professional", 
      name: "Professional",
      price: 79,
      subscribers: 5623,
      status: "active",
      revenue: 444217
    },
    {
      id: "enterprise",
      name: "Enterprise", 
      price: 199,
      subscribers: 2040,
      status: "active",
      revenue: 405960
    },
    {
      id: "legacy",
      name: "Legacy Plan",
      price: 49,
      subscribers: 0,
      status: "inactive",
      revenue: 0
    }
  ];

  const recentSubscriptions = [
    { user: "John Smith", plan: "Professional", date: "2024-09-15", status: "active", amount: 79 },
    { user: "Sarah Johnson", plan: "Enterprise", date: "2024-09-14", status: "active", amount: 199 },
    { user: "Mike Wilson", plan: "Starter", date: "2024-09-14", status: "cancelled", amount: 29 },
    { user: "Lisa Brown", plan: "Professional", date: "2024-09-13", status: "active", amount: 79 },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage plans, subscriptions, and analytics</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Plan
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalSubscribers.toLocaleString()}</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${adminStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeSubscriptions.toLocaleString()}</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.churnRate}%</div>
              <p className="text-xs text-destructive">
                +0.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="plans">Plans Management</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Plans Management Tab */}
          <TabsContent value="plans">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>Manage your subscription plans and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-card">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{plan.name}</h3>
                            <Badge variant={plan.status === "active" ? "default" : "secondary"}>
                              {plan.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${plan.price}/month • {plan.subscribers} subscribers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold">${plan.revenue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Plan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Subscriptions</CardTitle>
                <CardDescription>Latest subscription activities and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSubscriptions.map((subscription, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-card">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-semibold">{subscription.user}</div>
                          <div className="text-sm text-muted-foreground">
                            {subscription.plan} • {subscription.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                          {subscription.status}
                        </Badge>
                        <div className="font-semibold">${subscription.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">
                    Chart Component Placeholder
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Plan Distribution</CardTitle>
                  <CardDescription>Subscriber distribution by plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">
                    Chart Component Placeholder
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}