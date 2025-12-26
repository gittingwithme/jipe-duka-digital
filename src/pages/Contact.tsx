import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!formData.email.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully!', {
      description: "We'll get back to you within 24 hours.",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Kimathi Street', 'Nairobi, Kenya 00100'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+254 700 123 456', '+254 20 123 4567'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@kifarucoffee.co.ke', 'orders@kifarucoffee.co.ke'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 8AM - 6PM', 'Sat: 9AM - 4PM'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Kifaru Coffee</title>
        <meta 
          name="description" 
          content="Get in touch with Kifaru Coffee. Visit our store in Nairobi, call us, or send us a message. We'd love to hear from you!" 
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Have a question, feedback, or just want to say hello? 
                We'd love to hear from you. Reach out and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-2xl shadow-card">
                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      Send Us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm">{errors.email}</p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="How can we help you?"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={errors.message ? 'border-destructive' : ''}
                        />
                        {errors.message && (
                          <p className="text-destructive text-sm">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help and answer any questions you might have. 
                    We look forward to hearing from you!
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="p-6 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                        <info.icon className="w-5 h-5 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Map Embed Placeholder */}
                <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                  <iframe
                    title="Kifaru Coffee Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818695685949!2d36.81699231475395!3d-1.2863893990647836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6b6a9c2d1%3A0x8e5f4c5d9f8b7a6c!2sKimathi%20Street%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1625123456789!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
