
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Cookie, Info, Settings, Clock, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";

const Cookies = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { containerVariants, itemVariants } = useAnimatedVariants();

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cookie categories
  const cookieCategories = [
    {
      name: "Essential",
      description: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions you take such as logging in or filling out forms.",
      examples: ["Authentication cookies", "Security cookies", "Load balancing cookies"]
    },
    {
      name: "Functional",
      description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
      examples: ["Language preference cookies", "Theme preference cookies", "Feature preference cookies"]
    },
    {
      name: "Performance",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.",
      examples: ["Analytics cookies", "A/B testing cookies", "Usage statistics cookies"]
    },
    {
      name: "Targeting",
      description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.",
      examples: ["Marketing cookies", "Advertisement cookies", "Social media cookies"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-4 bg-soundboard-accent/10 rounded-full mb-4">
          <Cookie className="h-8 w-8 text-soundboard-accent" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          This Cookie Policy explains how SoundBoard uses cookies and similar technologies to recognize and remember you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        {/* Sidebar with quick links */}
        <motion.aside 
          className="md:col-span-3 lg:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:sticky md:top-24 space-y-2">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            {[
              { label: "What Are Cookies", href: "#what-are-cookies" },
              { label: "How We Use Cookies", href: "#how-we-use" },
              { label: "Cookie Categories", href: "#categories" },
              { label: "Managing Cookies", href: "#managing" },
              { label: "Third-Party Cookies", href: "#third-party" },
              { label: "Cookie Updates", href: "#updates" },
              { label: "Contact Us", href: "#contact" }
            ].map((link, index) => (
              <motion.div key={index} variants={itemVariants}>
                <a 
                  href={link.href}
                  className="block text-sm py-2 px-3 text-muted-foreground hover:text-soundboard-accent hover:bg-soundboard-accent/5 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="md:col-span-9 lg:col-span-10">
          <Card>
            <CardContent className="pt-6 prose dark:prose-invert max-w-none">
              <motion.section 
                id="what-are-cookies"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Info className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">What Are Cookies</h2>
                </div>
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                </p>
                <p className="mt-4">
                  Cookies serve various purposes, such as enabling certain website functions, helping us understand how our website is being used, remembering your preferences, and serving more relevant content to you.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="how-we-use"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Settings className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">How We Use Cookies</h2>
                </div>
                <p>
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    <strong>Authentication:</strong> To recognize you when you sign in and maintain your session.
                  </li>
                  <li>
                    <strong>Preferences:</strong> To remember your settings and preferences, such as language or theme choice.
                  </li>
                  <li>
                    <strong>Performance:</strong> To collect information about how users interact with our site, which helps us improve its functionality.
                  </li>
                  <li>
                    <strong>Analytics:</strong> To understand how visitors use our website and which pages are most frequently visited.
                  </li>
                  <li>
                    <strong>Security:</strong> To help detect and prevent fraud and unauthorized access to user accounts.
                  </li>
                </ul>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="categories"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">Cookie Categories</h2>
                </div>
                <p className="mb-6">
                  We use the following categories of cookies:
                </p>
                
                {cookieCategories.map((category, index) => (
                  <motion.div 
                    key={index}
                    className="mb-8 border-l-4 border-soundboard-accent/50 pl-6 py-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{category.name} Cookies</h3>
                    <p className="mb-3">{category.description}</p>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Examples:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {category.examples.map((example, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{example}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="managing"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                <p>
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience and some parts of the website may not work properly.
                </p>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">How to manage cookies in different browsers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                    </li>
                    <li>
                      <strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                    </li>
                    <li>
                      <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                    </li>
                    <li>
                      <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies
                    </li>
                  </ul>
                </div>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="third-party"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
                <p>
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service and enhance the user experience.
                </p>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Some of our third-party partners include:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Google Analytics:</strong> For website analytics and performance monitoring
                    </li>
                    <li>
                      <strong>Stripe:</strong> For payment processing
                    </li>
                    <li>
                      <strong>Intercom:</strong> For customer support functionality
                    </li>
                  </ul>
                </div>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="updates"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">Cookie Policy Updates</h2>
                </div>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date.
                </p>
                <p className="mt-4">
                  We encourage you to periodically review this Cookie Policy to stay informed about our use of cookies.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p>
                  If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact us at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> privacy@soundboard.app
                </p>
                <p>
                  <strong>Address:</strong> 123 Music Avenue, Suite 456, Audioville, CA 94123, USA
                </p>
              </motion.section>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 bg-soundboard-accent hover:bg-soundboard-secondary text-white p-3 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
};

export default Cookies;
