
import { motion } from "framer-motion";

const Cookies = () => {
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
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Effective Date: May 1, 2025
        </p>
      </motion.div>

      <motion.div 
        className="max-w-4xl mx-auto prose prose-headings:text-foreground prose-p:text-muted-foreground"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2>1. Introduction</h2>
          <p>
            This Cookie Policy explains how SoundBoard ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services (collectively, the "Service"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, SoundBoard) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>3. Why Do We Use Cookies?</h2>
          <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Service to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Service. Third parties serve cookies through our Service for advertising, analytics, and other purposes.</p>
          
          <p>The specific types of first and third-party cookies served through our Service and the purposes they perform include:</p>
          
          <h3>Essential Cookies</h3>
          <p>These cookies are strictly necessary to provide you with services available through our Service and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Service, you cannot refuse them without impacting how our Service functions.</p>
          
          <h3>Performance and Functionality Cookies</h3>
          <p>These cookies are used to enhance the performance and functionality of our Service but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</p>
          
          <h3>Analytics and Customization Cookies</h3>
          <p>These cookies collect information that is used either in aggregate form to help us understand how our Service is being used or how effective our marketing campaigns are, or to help us customize our Service for you.</p>
          
          <h3>Advertising Cookies</h3>
          <p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.</p>
          
          <h3>Social Media Cookies</h3>
          <p>These cookies are used to enable you to share pages and content that you find interesting on our Service through third-party social networking and other websites. These cookies may also be used for advertising purposes.</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>4. How Can You Control Cookies?</h2>
          <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner that appears when you first visit our website.</p>
          
          <p>You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Service though your access to some functionality and areas of our Service may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.</p>
          
          <p>In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-soundboard-accent hover:underline">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-soundboard-accent hover:underline">http://www.youronlinechoices.com</a>.</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>5. Do Not Track</h2>
          <p>
            Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. These features are not yet uniform, so we are not currently set up to respond to those signals.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p>
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2>7. Contact Information</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default Cookies;
