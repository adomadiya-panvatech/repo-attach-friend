
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-4">
              Welcome to Tovi Frontend
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground">
              A comprehensive platform for managing users, content, and communities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">User Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage users, roles, and permissions
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Content Control</h3>
                <p className="text-sm text-muted-foreground">
                  Create and moderate platform content
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Community Features</h3>
                <p className="text-sm text-muted-foreground">
                  Build and manage communities
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Real-time Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Stay updated with instant notifications
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="px-8">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
