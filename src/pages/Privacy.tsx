
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Shield, Lock, Eye, FileText, Star } from "lucide-react";
import { useState, useEffect } from "react";
import useAnimatedVariants from "@/hooks/useAnimatedVariants";

const Privacy = () => {
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
          <Shield className="h-8 w-8 text-soundboard-accent" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We value your privacy and are committed to protecting your personal data.
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
              { label: "Introduction", href: "#introduction" },
              { label: "Information We Collect", href: "#information" },
              { label: "How We Use Your Data", href: "#usage" },
              { label: "Data Storage", href: "#storage" },
              { label: "Your Rights", href: "#rights" },
              { label: "Third Parties", href: "#third-parties" },
              { label: "Security", href: "#security" },
              { label: "Policy Updates", href: "#updates" },
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
                id="introduction"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">Introduction</h2>
                </div>
                <p>
                  Last Updated: May 1, 2023
                </p>
                <p>
                  This Privacy Policy explains how SoundBoard ("we", "us", "our") collects, uses, and discloses your personal information when you use our website and services. By accessing or using SoundBoard, you agree to the collection and use of information in accordance with this policy.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="information"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Eye className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">Information We Collect</h2>
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
                <p>
                  We may collect the following personal information when you use our service:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>User account details and profile information</li>
                  <li>Payment and billing information</li>
                  <li>Content you create, upload, or share through our platform</li>
                  <li>Communications with us or other users through our platform</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Usage Data</h3>
                <p>
                  We automatically collect information about how you interact with our service, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Features used and actions taken</li>
                  <li>Error logs and performance data</li>
                </ul>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="usage"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">How We Use Your Data</h2>
                </div>
                <p>
                  We use your personal information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our service</li>
                  <li>To process transactions and manage your account</li>
                  <li>To improve and personalize your experience</li>
                  <li>To communicate with you about updates, security alerts, and support</li>
                  <li>To monitor usage patterns and analyze trends</li>
                  <li>To detect and prevent fraudulent or abusive activity</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="storage"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <Lock className="h-5 w-5 text-soundboard-accent mr-2" />
                  <h2 className="text-2xl font-bold">Data Storage</h2>
                </div>
                <p>
                  Your information may be stored and processed in any country where we operate or maintain facilities. By using our service, you consent to the transfer of your information to countries outside of your country of residence, which may have different data protection rules.
                </p>
                <p className="mt-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                </p>
              </motion.section>

              {/* Additional sections would continue here */}
              <Separator className="my-8" />

              <motion.section 
                id="rights"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access to your personal data</li>
                  <li>Correction of inaccurate or incomplete data</li>
                  <li>Deletion of your personal data</li>
                  <li>Restriction or objection to processing</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us using the information provided in the Contact section.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="security"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </motion.section>

              <Separator className="my-8" />

              <motion.section 
                id="updates"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p className="mt-4">
                  We encourage you to review this Privacy Policy periodically for any changes.
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
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
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

export default Privacy;
