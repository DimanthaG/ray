"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Facebook, Instagram, Twitter, Languages, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const exhibitionImages = [
    { src: "/GemExpo3.jpg", alt: "Lanka Gems & Jewels Canada Exhibition - Main" },
    { src: "/GemExpo4.jpg", alt: "Lanka Gems & Jewels Canada Exhibition - Details" },
    { src: "/GemExpo5.jpg", alt: "Lanka Gems & Jewels Canada Exhibition - Booth Info" }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % exhibitionImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % exhibitionImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + exhibitionImages.length) % exhibitionImages.length);
  };
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const subsidiaries = [
    { id: 1, logo: "/logos/01.svg", name: "Subsidiary 1" },
    { id: 2, logo: "/logos/02.svg", name: "Subsidiary 2" },
    { id: 3, logo: "/logos/03.svg", name: "Subsidiary 3" },
    { id: 4, logo: "/logos/04.svg", name: "Subsidiary 4" },
    { id: 5, logo: "/logos/05.svg", name: "Subsidiary 5" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        {/* Hero Section with Main Logo */}
        <motion.div variants={fadeInUp} className="text-center mb-24">
          <motion.div 
            className="w-full max-w-2xl mx-auto mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logos/06.svg"
              alt="Raytronics Logo"
              width={600}
              height={200}
              className="w-full h-auto"
              priority
            />
          </motion.div>
          <motion.p 
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Transforming your digital presence with cutting-edge social media marketing solutions
          </motion.p>
        </motion.div>

        {/* Our Current Event Section */}
        <motion.div variants={fadeInUp} className="mb-24">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-center flex-1">Our Current Event</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEnglish(!isEnglish)}
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {isEnglish ? 'සිංහල' : 'English'}
            </Button>
          </div>
          <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Carousel Section */}
              <motion.div 
                className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={exhibitionImages[currentImageIndex].src}
                  alt={exhibitionImages[currentImageIndex].alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                
                {/* Carousel Navigation */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {exhibitionImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-110' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-4">
                {isEnglish ? (
                  // English Content
                  <div className="text-lg leading-relaxed text-foreground">
                    <p className="mb-4">
                      <span className="font-semibold">YOUR GEM BUSINESS TO CANADA 🇨🇦 !</span>
                    </p>
                    
                    <p className="mb-6">
                      An exceptional opportunity to build business partnerships with Canadian investors and buyers, alongside over 25 of Sri Lanka's leading gem and jewelry businesses!
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <p><span className="font-semibold">📍</span> Hilton Toronto – Exhibition Hall</p>
                      <p><span className="font-semibold">🗓</span> November 21, 22, and 23, 2025</p>
                      <p><span className="font-semibold">💼</span> Exhibition Package Price: 550,000/=</p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <p><span className="font-semibold">📄</span> Application Form (Submission deadline: August 20)</p>
                      <Link 
                        href="https://drive.google.com/file/d/1zpsn-hYGRBGl09TXiJ8HUiPC2NCNLfvn/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all text-sm"
                      >
                        Download Application Form
                      </Link>
                    </div>
                    
                    <div className="mb-6">
                      <p><span className="font-semibold">📞</span> Hotline: 071 472 7527 / 077 772 7527</p>
                    </div>
                    
                    <p className="font-semibold text-primary">
                      Apply now and expand your business to Canada!
                    </p>
                  </div>
                ) : (
                  // Sinhala Content
                  <div className="text-lg leading-relaxed text-foreground">
                    <p className="mb-4">
                      <span className="font-semibold">ඔබගේ මැණික් ව්‍යාපාරය කැනඩාවට 🇨🇦 !</span>
                    </p>
                    
                    <p className="mb-6">
                      ශ්‍රී ලංකාවේ ප්‍රමුඛ මැණික් සහ රත්‍රං ආභරණ ව්‍යාපාර 25කට වැඩි සංඛ්‍යාවක් සමඟ එක්ව Lanka Gems & Jewels Canada Exhibition ප්‍රදර්ශනයට සහභාගී වී, කැනේඩියානු ආයෝජකයින් හා මිලදී ගන්නට සදහා ව්‍යාපාර කිරීමට අවස්ථාව .
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <p><span className="font-semibold">📍</span> Hilton Toronto – Exhibition Hall</p>
                      <p><span className="font-semibold">🗓</span> 2025 නොවැම්බර් 21, 22 සහ 23</p>
                      <p><span className="font-semibold">💼</span> ප්‍රදර්ශන පැකේජය: රු. 550,000</p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <p><span className="font-semibold">📄</span> අයදුම්පත (ඉදිරිපත් කිරීමට අවසන් දිනය: අගෝස්තු 20)</p>
                      <Link 
                        href="https://drive.google.com/file/d/1zpsn-hYGRBGl09TXiJ8HUiPC2NCNLfvn/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all text-sm"
                      >
                        https://drive.google.com/file/d/1zpsn-hYGRBGl09TXiJ8HUiPC2NCNLfvn/view?usp=sharing
                      </Link>
                    </div>
                    
                    <div className="mb-6">
                      <p><span className="font-semibold">📞</span> දුරකථන: 071 472 7527 / 077 772 7527</p>
                    </div>
                    
                    <p className="font-semibold text-primary">
                      දැන්ම අයදුම් කරමින් ඔබගේ ව්‍යාපාරය කැනඩාවේ ව්‍යාප්ත  කරගන්න!
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Registration CTA Section */}
            <div className="border-t border-border/50 p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to Visit the Exhibition?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Register now for free visitor access to the Lanka Gems & Jewels Canada Exhibition. 
                Get your QR code entry pass and be part of this exclusive event.
              </p>
                             <Button
                 asChild
                 size="lg"
                 className="group bg-gradient-to-r from-red-400 to-blue-900 hover:from-red-500 hover:to-blue-800 text-white border-0"
               >
                 <Link href="/register">
                   Register for Free
                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </Button>
            </div>

            {/* PDF Viewer Section */}
            <div className="border-t border-border/50 p-8">
              <h3 className="text-xl font-semibold mb-4 text-center">Exhibition Brochure</h3>
              <div className="w-full h-96 border border-border/50 rounded-lg overflow-hidden">
                <iframe
                  src="/Gem_Exhibition[1].pdf"
                  className="w-full h-full"
                  title="Lanka Gems & Jewels Canada Exhibition Brochure"
                >
                  <p>Your browser does not support PDFs. 
                    <Link href="/Gem_Exhibition[1].pdf" className="text-primary hover:underline ml-1">
                      Download the PDF
                    </Link>
                  </p>
                </iframe>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Events Section */}
        <motion.div variants={fadeInUp} className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <motion.div 
                className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/RayExpo_2.jpg"
                  alt="Lanka Trade Expo 2026 - Toronto, Canada"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="text-lg leading-relaxed text-foreground">
                  <h3 className="text-2xl font-bold mb-4 text-primary">LANKA TRADE EXPO 2026</h3>
                  <p className="mb-4">
                    <span className="font-semibold">TORONTO, CANADA 🇨🇦</span>
                  </p>
                  
                  <p className="mb-4">
                    <span className="font-semibold">22 | 23 | 24 May 2026</span>
                  </p>
                  
                  <p className="mb-6">
                    Sri Lanka's finest industries come together on the global stage!
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <p><span className="font-semibold">•</span> Gem & Jewelry</p>
                    <p><span className="font-semibold">•</span> Toys & Gift Items</p>
                    <p><span className="font-semibold">•</span> Spices</p>
                    <p><span className="font-semibold">•</span> Travel & Tourism</p>
                    <p><span className="font-semibold">•</span> Tea & Herbal Beverages</p>
                    <p><span className="font-semibold">•</span> Batik & Garments</p>
                  </div>
                  
                  <div className="mb-6">
                    <p><span className="font-semibold">📞</span> Dr. Lasantha Gunawardana +94 777 727 527 (WhatsApp)</p>
                    <p><span className="font-semibold">🌐</span> www.raytronics.lk</p>
                  </div>
                  
                  <p className="font-semibold text-primary">
                    Join us for this exceptional trade exhibition opportunity!
                  </p>
                </div>
              </div>
            </div>
            
            {/* Registration CTA Section */}
            <div className="border-t border-border/50 p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Interested in Participating?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Register now for the Lanka Trade Expo 2026 in Toronto, Canada. 
                Connect with international buyers and expand your business globally.
              </p>
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white border-0"
              >
                <Link href="/register-trade-expo">
                  Register for Trade Expo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Subsidiaries Section */}
        <motion.div variants={fadeInUp} className="mb-24">
          <h2 className="text-2xl font-semibold text-center mb-12">Part of Raytronics Group</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {subsidiaries.map((subsidiary) => {
              // Check if it's subsidiary 1 to add the link
              if (subsidiary.id === 1) {
                return (
                  <Link
                    key={subsidiary.id}
                    href="https://www.rayrealtysl.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative aspect-[3/2] flex items-center justify-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <Image
                        src={subsidiary.logo}
                        alt={subsidiary.name}
                        width={200}
                        height={100}
                        className="w-full h-auto object-contain"
                      />
                    </motion.div>
                  </Link>
                );
              }
              
              // For other subsidiaries, keep the original non-clickable version
              return (
                <motion.div
                  key={subsidiary.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative aspect-[3/2] flex items-center justify-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <Image
                    src={subsidiary.logo}
                    alt={subsidiary.name}
                    width={200}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
        >
          {[
            {
              title: "Social Media Strategy",
              description: "Custom-tailored strategies to boost your online presence",
              color: "from-blue-500 to-cyan-400"
            },
            {
              title: "Content Creation",
              description: "Engaging content that resonates with your audience",
              color: "from-purple-500 to-pink-400"
            },
            {
              title: "Analytics & Insights",
              description: "Data-driven decisions to optimize your campaigns",
              color: "from-orange-500 to-red-400"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
            >
              <h3 className={`text-xl font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-3`}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="group"
            >
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/portfolio">
                View Our Work
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          variants={fadeInUp}
          className="flex justify-center items-center gap-8 text-muted-foreground"
        >
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.2, color: "#1877f2" }}
              className="p-2"
            >
              <Facebook className="h-6 w-6" />
            </motion.div>
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.2, color: "#1da1f2" }}
              className="p-2"
            >
              <Twitter className="h-6 w-6" />
            </motion.div>
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.2, color: "#e4405f" }}
              className="p-2"
            >
              <Instagram className="h-6 w-6" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}

const services = [
  {
    title: "Content Creation",
    description: "Engaging and visually appealing content that resonates with your audience.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
  },
  {
    title: "Strategy Development",
    description: "Data-driven social media strategies that align with your business goals.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
  },
  {
    title: "Community Management",
    description: "Active engagement and community building to foster brand loyalty.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
]

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "1M+", label: "Engagements Generated" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
]
