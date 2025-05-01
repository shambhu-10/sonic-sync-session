
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, FileText, Scale, AlertTriangle, BookOpen, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";

const Terms = () => {
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

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-4 bg-soundboard-accent/10 rounded-full mb-4">
          <Scale className="h-8 w-8 text-soundboard-accent" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          By using SoundBoard, you agree to these terms that outline your rights and responsibilities.
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
              { label: "Agreement", href: "#agreement" },
              { label: "Using Our Service", href: "#using-service" },
              { label: "Account Terms", href: "#account-terms" },
              { label: "Content & Copyright", href: "#content" },
              { label: "Limitations", href: "#limitations" },
              { label: "Termination", href: "#termination" },
              { label: "Pricing & Payments", href: "#payments" },
              { label: "Changes to Terms", href: "#changes" },
              { label: "Contact Information", href: "#contact" }
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
                id="agreement"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">1. Terms of Agreement</h2>
                </div>
                <p>
                  Last Updated: May 1, 2023
                </p>
                <p>
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and SoundBoard ("we", "us", "our") governing your access to and use of the SoundBoard website, applications, and services (collectively, the "Service").
                </p>
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="using-service"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">2. Using Our Service</h2>
                </div>
                <p>
                  SoundBoard provides a platform for musicians to collaborate, record, and share audio content online. You are responsible for your use of the Service and for any content you provide, including compliance with applicable laws, rules, and regulations.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Eligibility</h3>
                <p>
                  To use the Service, you must be at least 13 years old. If you are under 18, you must have permission from a parent or legal guardian.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Service Changes</h3>
                <p>
                  We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="account-terms"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">3. Account Terms</h2>
                </div>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for all activities that occur under your account.
                </p>
                <p className="mt-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Share your account with anyone else</li>
                  <li>Create more than one account per person</li>
                  <li>Create an account for someone other than yourself</li>
                  <li>Use another user's account without permission</li>
                  <li>Provide false or misleading information when registering</li>
                </ul>
                
                <p className="mt-4">
                  We reserve the right to suspend or terminate your account if any of these conditions are violated.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="content"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">4. Content & Copyright</h2>
                <p>
                  You retain ownership rights to any content you upload to the Service. However, by uploading content, you grant SoundBoard a worldwide, non-exclusive, royalty-free license to use, reproduce, process, adapt, modify, publish, transmit, and display that content for the purpose of providing the Service.
                </p>
                <p className="mt-4">
                  You represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You own or have the right to use and authorize SoundBoard to use your content</li>
                  <li>Your content does not violate any copyright, trademark, or other intellectual property rights</li>
                  <li>Your content does not violate any third-party rights or applicable laws</li>
                </ul>
              </motion.section>

              {/* Additional sections would continue here */}
              <Separator className="my-8" />

              <motion.section 
                id="limitations"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">5. Limitations & Restrictions</h2>
                </div>
                <p>
                  When using our Service, you agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Distribute malware or other harmful content</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Use the Service for unauthorized commercial purposes</li>
                  <li>Harass, abuse, or harm another person</li>
                  <li>Interfere with or disrupt the Service</li>
                </ul>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="termination"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">6. Termination</h2>
                <p>
                  We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                </p>
                <p className="mt-4">
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="payments"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">7. Pricing & Payments</h2>
                <p>
                  Some aspects of the Service may be offered for a fee. You agree to pay all applicable fees and taxes associated with your use of such features.
                </p>
                <p className="mt-4">
                  Payment terms will be specified at the time you sign up for a paid feature or plan. Failure to make timely payments may result in suspension or termination of your access to paid features.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="changes"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p>
                  We reserve the right to update or change these Terms at any time. We will provide notice of significant changes by posting the new Terms on the Service and updating the "Last Updated" date.
                </p>
                <p className="mt-4">
                  Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> legal@soundboard.app
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

export default Terms;
