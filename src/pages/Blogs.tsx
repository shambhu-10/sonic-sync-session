
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Blog data
const blogPosts = [
  {
    id: "1",
    title: "5 Tips for Better Online Jam Sessions",
    excerpt: "Learn how to optimize your setup for the best collaborative music experience online. From microphone placement to internet connection optimization, these tips will transform your virtual jam sessions.",
    author: "Sarah Johnson",
    date: "May 1, 2025",
    readTime: "5 min read",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "How SoundBoard Simplifies Collaboration",
    excerpt: "Discover how our platform removes the barriers to creating music with others, no matter where they are located. This comprehensive guide shows you the key features that make remote collaboration seamless.",
    author: "Michael Rodriguez",
    date: "April 24, 2025",
    readTime: "8 min read",
    category: "Product",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "The Future of Music Collaboration: Web-Based DAWs",
    excerpt: "How browser-based music tools are revolutionizing the way musicians work together. We explore the trending technologies that are making professional music production more accessible than ever before.",
    author: "Tara Williams",
    date: "April 15, 2025",
    readTime: "7 min read",
    category: "Industry",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop"
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

const Blogs = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">SoundBoard Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, tutorials, and insights about music collaboration and production.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden hover-scale">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-soundboard-accent text-white text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <h3 className="text-xl font-bold hover:text-soundboard-accent transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground space-x-4 mt-2">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="pl-0 hover:pl-2 transition-all hover:text-soundboard-accent">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
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
          className="text-center mt-12"
        >
          <Button variant="outline" className="hover:bg-soundboard-accent/10">
            Load More Articles
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
