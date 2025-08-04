
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, CheckCircle, AlertCircle, MessageSquare, Handshake, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedContactFormProps {
  variant?: 'full' | 'compact';
  defaultFormType?: 'contact' | 'partnership' | 'support';
  className?: string;
}

export function EnhancedContactForm({ 
  variant = 'full',
  defaultFormType = 'contact',
  className = '' 
}: EnhancedContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    formType: defaultFormType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Your message has been sent successfully!');
        
        // Track form submission for analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'contact_form_submit', {
            form_type: formData.formType,
            has_subject: !!formData.subject,
          });
        }
      } else {
        toast.error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formTypes = [
    { value: 'contact', label: 'General Inquiry', icon: MessageSquare },
    { value: 'partnership', label: 'Partnership', icon: Handshake },
    { value: 'support', label: 'Support Request', icon: HelpCircle },
  ];

  if (isSubmitted) {
    return (
      <Card className={`text-center bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 ${className}`}>
        <CardContent className="p-8">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Check your email for confirmation
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Get in Touch</CardTitle>
            <p className="text-muted-foreground">
              We'd love to hear from you. Send us a message and we'll respond within 24 hours.
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {variant === 'full' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Type of Inquiry</label>
              <Select 
                value={formData.formType} 
                onValueChange={(value) => handleChange('formType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  {formTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="w-4 h-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Name *
              </label>
              <Input
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email *
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          {variant === 'full' && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Subject
              </label>
              <Input
                type="text"
                placeholder="Brief subject of your message"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">
              Message *
            </label>
            <Textarea
              placeholder="Tell us about your inquiry..."
              rows={variant === 'full' ? 6 : 4}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              24hr response time
            </div>
            <div className="flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Privacy protected
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
