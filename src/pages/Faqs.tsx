
import { motion } from "framer-motion";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, 
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

// FAQ data
const faqsList = [
  {
    question: "How does collaborative jamming work?",
    answer: "Once you join a jam room, you can record audio loops up to 30 seconds long. These loops automatically sync with other participants' recordings in real-time, allowing seamless collaboration regardless of location."
  },
  {
    question: "What equipment do I need?",
    answer: "Just a computer or mobile device with a microphone and internet connection. For best results, we recommend using headphones and an external microphone if available."
  },
  {
    question: "Can I export my collaborations?",
    answer: "Yes! After you've created a jam session, you can export the combined audio as a high-quality audio file to use in your projects or share with others."
  },
  {
    question: "Is there a limit to how many people can join a jam room?",
    answer: "Free accounts can have up to 5 people in a jam room simultaneously. Pro accounts can host up to 20 participants for larger collaborative sessions."
  },
  {
    question: "What audio file formats are supported for export?",
    answer: "Currently, you can export your sessions as WAV, MP3, or OGG files. We're always working to add support for more formats based on user feedback."
  },
  {
    question: "How do I invite others to my jam session?",
    answer: "After creating a jam room, you can share the unique room link via email, messaging apps, or social media. Anyone with the link can join your session, so be careful who you share it with!"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const Faqs = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions about SoundBoard? We've got answers to help you get the most out of your music collaboration experience.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <Card className="p-6 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              {faqsList.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-medium hover:text-soundboard-accent transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Still have questions? Feel free to <a href="/contact" className="text-soundboard-accent hover:underline">contact our support team</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Faqs;
