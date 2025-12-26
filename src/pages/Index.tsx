import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { products } from '@/data/products';
import heroImage from '@/assets/hero-coffee.jpg';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Kifaru Coffee | Premium Kenyan Coffee & Tea</title>
        <meta 
          name="description" 
          content="Experience authentic Kenyan coffee and tea. Premium quality beans and leaves sourced directly from Kenya's highlands. Shop now for the best African coffee." 
        />
        <meta name="keywords" content="Kenyan coffee, Kenya tea, African coffee, premium coffee, Nairobi coffee shop" />
      </Helmet>
      
      <Layout>
        <HeroSection heroImage={heroImage} />
        <FeaturedProducts products={products} />
        <WhyChooseUs />
      </Layout>
    </>
  );
};

export default Index;
