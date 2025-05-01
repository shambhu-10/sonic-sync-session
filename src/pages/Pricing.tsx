
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    features: [
      { name: "Up to 5 jam sessions per month", included: true },
      { name: "5 participants per room", included: true },
      { name: "30-second recording limit", included: true },
      { name: "Basic audio export (MP3)", included: true },
      { name: "Community support", included: true },
      { name: "Advanced audio effects", included: false },
      { name: "Unlimited recordings", included: false },
      { name: "Priority support", included: false },
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    description: "For serious musicians and creators",
    price: "$9.99",
    period: "/month",
    features: [
      { name: "Unlimited jam sessions", included: true },
      { name: "20 participants per room", included: true },
      { name: "3-minute recording limit", included: true },
      { name: "High-quality audio export (WAV, MP3, OGG)", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Advanced audio effects", included: true },
      { name: "Custom room branding", included: true },
      { name: "Analytics and insights", included: true },
    ],
    buttonText: "Coming Soon",
    popular: true,
    disabled: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Pricing = () => {
  const { user } = useAuth();

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your music collaboration needs.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`h-full flex flex-col ${plan.popular ? "border-soundboard-accent shadow-lg shadow-soundboard-accent/10" : ""}`}>
                {plan.popular && (
                  <div className="bg-soundboard-accent text-white text-center py-2 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className="pb-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button 
                    className={`w-full ${plan.popular ? "bg-soundboard-accent hover:bg-soundboard-secondary" : ""}`}
                    disabled={plan.disabled}
                    asChild={!plan.disabled}
                  >
                    {!plan.disabled ? (
                      <Link to={user ? "/dashboard" : "/auth"}>
                        {plan.buttonText}
                      </Link>
                    ) : (
                      <span>{plan.buttonText}</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-6">
            Looking for special features or higher limits for your music studio, school, or organization? 
            We offer custom solutions tailored to your specific needs.
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us For Custom Pricing</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
