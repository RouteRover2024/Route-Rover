import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      title: "Real-time Route Optimization",
      description: "Advanced algorithms analyze traffic patterns and transport availability to suggest the most efficient routes"
    },
    {
      title: "Personalized Experience",
      description: "Customized suggestions based on your preferences and travel history"
    },
    {
      title: "Comprehensive Information",
      description: "Detailed breakdowns of travel times, costs, and available transportation options"
    },
    {
      title: "Live Updates",
      description: "Dynamic route adjustments based on real-time traffic and transport conditions"
    },
    {
      title: "Community-Driven",
      description: "User feedback system to continuously improve route recommendations"
    },
    {
      title: "Secure & Private",
      description: "Enterprise-grade security measures to protect your personal data"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Revolutionizing Your Daily Commute
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Our intelligent navigation platform combines real-time data analysis with 
          user-centric design to make your journey smoother, faster, and more reliable.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              About the Project
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our navigation app represents a breakthrough in modern travel assistance, 
              analyzing multiple factors including traffic patterns and public transport 
              reliability to deliver optimal route suggestions. Through our intuitive 
              interface, users can easily input destinations and receive comprehensive 
              journey information, including precise timing estimates, cost breakdowns, 
              and available transport options for each segment.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Transform Your Daily Commute?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied users who have already discovered a better way to navigate their city.
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default About;