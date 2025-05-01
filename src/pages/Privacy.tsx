
import { motion } from "framer-motion";

const Privacy = () => {
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
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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
          <h2>1. Introduction</h2>
          <p>
            SoundBoard ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Service").
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, do not use our Service.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>2. Information We Collect</h2>
          <p>
            <strong>Personal Information</strong>: We may collect personal information that you voluntarily provide to us when you register for the Service, express an interest in obtaining information about us or our products and services, or otherwise contact us.
          </p>
          <p>
            This personal information may include:
          </p>
          <ul>
            <li>Contact information (such as name, email address)</li>
            <li>Username and password</li>
            <li>Profile information</li>
            <li>Payment information</li>
            <li>Feedback and correspondence</li>
            <li>Marketing preferences</li>
          </ul>
          
          <p>
            <strong>Audio Content</strong>: As part of our Service, we collect and store the audio content you create, upload, or share on our platform.
          </p>
          
          <p>
            <strong>Usage Information</strong>: We automatically collect certain information about how you interact with our Service, including:
          </p>
          <ul>
            <li>Log and usage data (IP address, browser type, referring/exit pages)</li>
            <li>Device information (hardware model, operating system)</li>
            <li>Location information</li>
            <li>Cookie and tracking technology data</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>3. How We Use Your Information</h2>
          <p>We may use your information for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our Service</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative information, such as updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, offers, promotions, and events</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize your experience on our Service</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>4. How We Share Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li>With service providers who perform services on our behalf</li>
            <li>With other users, when you share collaborative content</li>
            <li>In connection with a business transaction such as a merger or acquisition</li>
            <li>When required to comply with applicable law or legal process</li>
            <li>To protect the rights, property, or safety of our users or others</li>
            <li>With your consent or at your direction</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>5. Your Privacy Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate or incomplete information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to restrict or object to our processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided at the end of this Policy.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on this page with a new effective date.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>8. Contact Information</h2>
          <p>
            If you have questions or comments about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p className="mb-8">
            SoundBoard<br />
            Email: privacy@soundboard.app<br />
            Address: 123 Music Lane, Studio City, CA 91604
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Privacy;
