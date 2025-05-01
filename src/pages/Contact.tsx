
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    alert("Message sent! (This is a demo)");
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or need support? We're here to help you with any inquiries about SoundBoard.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-1 block">
                    Your Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-1 block">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium mb-1 block">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help you?" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-1 block">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Write your message here..." 
                    required 
                    className="min-h-[150px]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-soundboard-accent hover:bg-soundboard-secondary"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 h-10 w-10 rounded-full bg-soundboard-accent/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-soundboard-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">shambhu04.kumar@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 h-10 w-10 rounded-full bg-soundboard-accent/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-soundboard-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">9508543598</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 h-10 w-10 rounded-full bg-soundboard-accent/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-soundboard-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">HSR Layout, Bangalore, India</p>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t">
                  <h3 className="font-medium mb-2">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                  <p className="text-muted-foreground">Saturday & Sunday: Closed</p>
                </div>
                
                <div className="pt-6 mt-6 border-t">
                  <h3 className="font-medium mb-2">Support Response Time</h3>
                  <p className="text-muted-foreground">We typically respond to inquiries within 24 hours during business days.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
