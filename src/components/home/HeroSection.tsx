import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Greeting from './Greeting';

interface HeroSectionProps {
  heroImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroImage }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium Kenyan Coffee"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-20">
          {/* Greeting */}
          <div className="mb-8 animate-fade-in">
            <Greeting />
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Experience the 
            <span className="text-gradient block mt-2">Authentic Taste</span>
            of Kenya
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-lg animate-slide-up stagger-1">
            Premium coffee and tea sourced directly from Kenya's finest highlands. 
            Every cup tells a story of tradition, quality, and the rich Kenyan heritage.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-up stagger-2">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 px-8"
            >
              <Link to="/products">
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-foreground/20 hover:bg-foreground/5 gap-2"
            >
              <Link to="/about">
                <Coffee className="w-4 h-4" />
                Our Story
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 animate-slide-up stagger-3">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '100%', label: 'Kenyan Grown' },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <p className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
