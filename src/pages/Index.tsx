
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, FileText, MessageSquare, Bell, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "User Management",
      description: "Manage users, roles, and permissions with advanced controls"
    },
    {
      icon: FileText,
      title: "Content Control",
      description: "Create and moderate platform content seamlessly"
    },
    {
      icon: MessageSquare,
      title: "Community Features",
      description: "Build and manage thriving communities"
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Stay updated with instant notifications"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Welcome to the Future</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Tovi Frontend
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive platform for managing users, content, and communities with modern design and powerful features
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link to="/dashboard">
              <Button size="lg" className="px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 lg:mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your platform effectively
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 lg:mt-32">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="py-12">
              <div className="grid gap-8 sm:grid-cols-3 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                  <div className="text-primary-foreground/80 text-lg">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                  <div className="text-primary-foreground/80 text-lg">Content Items</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
                  <div className="text-primary-foreground/80 text-lg">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
