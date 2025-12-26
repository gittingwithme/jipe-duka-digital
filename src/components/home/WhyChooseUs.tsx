import React from 'react';
import { Leaf, Award, Truck, Heart } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Locally Sourced',
    description: 'All our coffee and tea comes directly from Kenyan highlands, supporting local farmers.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-selected beans and leaves, roasted and processed with expert craftsmanship.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Nationwide delivery across Kenya. Fresh products delivered to your doorstep.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. 100% satisfaction guaranteed or your money back.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-medium uppercase tracking-wider text-sm">
            Why Kifaru?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just selling coffee and tea. We're sharing the rich heritage and 
            exceptional quality that Kenya is known for around the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
