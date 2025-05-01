
import { motion } from "framer-motion";

const Terms = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Effective Date: May 1, 2025
        </p>
      </motion.div>

      <motion.div 
        className="max-w-4xl mx-auto prose prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using SoundBoard's website and services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you don't agree to these Terms, you may not access or use the Service.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>2. Changes to Terms</h2>
          <p>
            We may modify the Terms at any time. If we make changes, we will provide notice of such changes, such as by sending an email notification, providing notice through the Service, or updating the "Effective Date" at the top of these Terms. Your continued use of the Service following notification of changes will constitute your acceptance of such changes.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>3. Using the Service</h2>
          <p><strong>Eligibility</strong>: You must be at least 13 years of age to use the Service.</p>
          <p><strong>Registration and Account</strong>: To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.</p>
          <p><strong>Account Security</strong>: You are responsible for safeguarding your password and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
          <p><strong>Acceptable Use</strong>: You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable law or regulation</li>
            <li>Infringe the intellectual property rights of others</li>
            <li>Upload or transmit malware or other harmful code</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Send unsolicited communications, promotions, or advertisements</li>
            <li>Attempt to gain unauthorized access to the Service or related systems or networks</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>4. Content and Intellectual Property Rights</h2>
          <p><strong>User Content</strong>: The Service allows you to upload, store, and share content such as audio recordings, text, and other materials ("User Content"). You retain ownership of your User Content.</p>
          <p><strong>License to User Content</strong>: By uploading User Content to the Service, you grant SoundBoard a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify, create derivative works based on, distribute, publicly display, and publicly perform your User Content in connection with operating and providing the Service.</p>
          <p><strong>Content Restrictions</strong>: You may not upload User Content that:</p>
          <ul>
            <li>Infringes any third party's intellectual property or other rights</li>
            <li>Violates any law or regulation</li>
            <li>Is harmful, abusive, obscene, or otherwise objectionable</li>
            <li>Contains personal information of third parties without their consent</li>
          </ul>
          <p><strong>Content Removal</strong>: We reserve the right to remove any User Content for any reason without prior notice.</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>5. Copyright Policy</h2>
          <p>
            We respect the intellectual property rights of others and expect our users to do the same. We respond to notices of alleged copyright infringement according to the Digital Millennium Copyright Act (DMCA).
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>6. Privacy</h2>
          <p>
            Your use of the Service is also subject to our Privacy Policy, which describes how we collect, use, and share your personal information.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service at any time, without prior notice or liability, for any reason, including if you breach the Terms.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>8. Disclaimers</h2>
          <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>9. Limitation of Liability</h2>
          <p>
            IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICE.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the State of California, without respect to its conflict of laws principles.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>11. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-8">
            SoundBoard<br />
            Email: terms@soundboard.app<br />
            Address: 123 Music Lane, Studio City, CA 91604
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Terms;
