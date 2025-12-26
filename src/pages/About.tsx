import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Users, Coffee, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import aboutImage from '@/assets/about-coffee-farm.jpg';

const milestones = [
  { year: '2008', title: 'Founded in Nairobi', description: 'Started as a small coffee roastery in downtown Nairobi.' },
  { year: '2012', title: 'First Tea Collection', description: 'Expanded to include premium Kenyan tea varieties.' },
  { year: '2018', title: 'Direct Farm Partnerships', description: 'Established direct relationships with 50+ local farmers.' },
  { year: '2023', title: 'Going Digital', description: 'Launched online store to serve customers nationwide and globally.' },
];

const values = [
  {
    icon: MapPin,
    title: 'Proudly Kenyan',
    description: 'We celebrate our Kenyan heritage in every product we create.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Supporting local farmers and communities across Kenya.',
  },
  {
    icon: Coffee,
    title: 'Quality Obsessed',
    description: 'Only the finest beans and leaves make it into our collection.',
  },
  {
    icon: Heart,
    title: 'Sustainable Practices',
    description: 'Environmentally conscious sourcing and packaging.',
  },
];

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Kifaru Coffee - Our Story</title>
        <meta 
          name="description" 
          content="Learn about Kifaru Coffee's journey from a small Nairobi roastery to Kenya's trusted source for premium coffee and tea. Our story, values, and commitment to quality." 
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={aboutImage}
              alt="Kenyan Coffee Farm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>

          <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <span className="text-secondary font-medium uppercase tracking-wider text-sm">
                Our Story
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Rooted in Kenya,<br />
                <span className="text-gradient">Loved Worldwide</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Kifaru Coffee was born from a deep love for Kenya's incredible coffee and tea heritage. 
                What started as a passion project has grown into a mission to share the authentic 
                taste of Kenya with the world.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  From the Highlands to Your Cup
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our journey began in 2008 when our founder, a third-generation coffee farmer 
                    from Nyeri, decided to bridge the gap between Kenya's exceptional coffee producers 
                    and coffee lovers everywhere.
                  </p>
                  <p>
                    Kenya is home to some of the world's most sought-after coffee varieties. 
                    The volcanic soils of Mount Kenya, the altitude of our highlands, and generations 
                    of farming expertise create coffee beans with unparalleled flavor profiles.
                  </p>
                  <p>
                    Today, we work directly with over 50 farming cooperatives across Kenya, 
                    ensuring fair prices for farmers and the freshest products for our customers. 
                    Every bag of Kifaru Coffee supports Kenyan communities and preserves our 
                    agricultural heritage.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-card p-8 rounded-2xl shadow-card">
                <h3 className="font-display text-xl font-semibold mb-6">Our Journey</h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                        <span className="font-display font-bold text-secondary">{milestone.year}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-secondary font-medium uppercase tracking-wider text-sm">
                What We Believe
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-soft hover:shadow-card transition-shadow duration-300 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-hero text-primary-foreground">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Taste the Kifaru Difference
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of coffee and tea lovers who've discovered the authentic taste of Kenya. 
              Every purchase supports Kenyan farmers and communities.
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
