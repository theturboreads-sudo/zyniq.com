import { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Brain, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Info,
  ArrowRight,
  Menu,
  Timer,
  X,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Cart, addToCart } from "./components/Cart";

const PRODUCTS = [
  {
    id: "zyniq-original",
    name: "Zyniq Original",
    description: "The classic focus formula. Clean, crisp, and powerful.",
    price: 3.99,
    image: "https://picsum.photos/seed/zyniq-can-1/600/800",
    variant: "Single Can",
    tag: "Classic"
  },
  {
    id: "study-pack",
    name: "Study Pack",
    description: "6-pack of Zyniq. Perfect for midterms week.",
    price: 19.99,
    image: "https://picsum.photos/seed/zyniq-pack/600/800",
    variant: "6-Pack",
    tag: "Best Seller",
    popular: true
  },
  {
    id: "exam-bundle",
    name: "Exam Bundle",
    description: "24-pack + Limited Edition Focus Journal.",
    price: 64.99,
    image: "https://picsum.photos/seed/zyniq-bundle/600/800",
    variant: "24-Pack + Gift",
    tag: "Best Value"
  }
];

const TESTIMONIALS = [
  {
    name: "Alex K.",
    role: "Med Student",
    content: "Pulled all-nighters without burnout. Zyniq is a game changer for residency prep.",
    avatar: "https://picsum.photos/seed/student1/100/100"
  },
  {
    name: "Sarah M.",
    role: "Law Student",
    content: "Way better than coffee. No jitters during my Bar exam. I felt completely locked in.",
    avatar: "https://picsum.photos/seed/student2/100/100"
  },
  {
    name: "James L.",
    role: "CS Major",
    content: "The sustained focus is real. I can code for 6 hours straight without the usual 3pm crash.",
    avatar: "https://picsum.photos/seed/student3/100/100"
  }
];

const INGREDIENTS = [
  { name: "L-Theanine", benefit: "Calm focus, no jitters" },
  { name: "Natural Caffeine", benefit: "Sustained energy from green tea" },
  { name: "B-Vitamin Complex", benefit: "Metabolic support & mental clarity" },
  { name: "Panax Ginseng", benefit: "Cognitive performance boost" }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 45, seconds: 0 });
  const [showExitPopup, setShowExitPopup] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem("exit-popup-shown")) {
        setShowExitPopup(true);
        localStorage.setItem("exit-popup-shown", "true");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-neon-green selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-panel py-3" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neon-green rounded-lg flex items-center justify-center neon-glow">
              <Zap className="text-black h-6 w-6 fill-black" />
            </div>
            <span className="text-2xl font-heading font-bold tracking-tighter">ZYNIQ</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#how-it-works" className="hover:text-neon-green transition-colors">How it works</a>
            <a href="#products" className="hover:text-neon-green transition-colors">Shop</a>
            <a href="#ingredients" className="hover:text-neon-green transition-colors">Science</a>
            <a href="#faq" className="hover:text-neon-green transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <Cart />
            <Button className="hidden sm:flex bg-neon-green text-black hover:bg-neon-green/90 font-heading font-bold px-6">
              Shop Now
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-neon-green text-neon-green px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-bold">
              The Student's Secret Weapon
            </Badge>
            <h1 className="text-6xl md:text-8xl font-heading font-bold leading-[0.9] tracking-tighter">
              Study <span className="text-neon-green italic">Longer.</span><br />
              Focus <span className="text-neon-green italic">Harder.</span><br />
              No Crash.
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
              Clean energy built for exams, not jitters. Lock in for 6+ hours of sustained mental clarity with zero sugar crash.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-16 px-10 text-lg font-heading font-bold bg-neon-green text-black hover:bg-neon-green/90 neon-glow group">
                Try Zyniq Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-heading border-white/10 hover:bg-white/5">
                See How It Works
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex text-neon-green">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Trusted by 50,000+ Students</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y, opacity }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden glass-panel p-8 flex flex-col items-center justify-center group">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="relative z-10"
              >
                <img 
                  src="https://picsum.photos/seed/zyniq-hero/800/1200" 
                  alt="Zyniq Can" 
                  className="w-64 drop-shadow-[0_0_50px_rgba(204,255,0,0.4)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute bottom-12 left-0 right-0 text-center space-y-2">
                <p className="text-neon-green font-heading font-bold text-2xl tracking-tight">BERRY FOCUS</p>
                <p className="text-zinc-500 text-sm uppercase tracking-[0.3em]">Limited Edition</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem -> Solution */}
      <section className="py-32 bg-zinc-950 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">The Study Struggle is Real.</h2>
                <p className="text-zinc-400 text-lg">Most energy drinks are built for the gym, not the library. They spike your heart rate and leave you crashing when it matters most.</p>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Coffee Crashes", desc: "Energy for 45 minutes, then a massive slump." },
                  { title: "Energy Drink Jitters", desc: "Too much sugar and taurine makes you anxious." },
                  { title: "Brain Fog", desc: "Staring at the same page for an hour without absorbing." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <X className="text-red-500 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xl group-hover:text-red-500 transition-colors">{item.title}</h4>
                      <p className="text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-neon-green/5 blur-[100px] rounded-full" />
              <div className="relative space-y-12 p-10 rounded-3xl glass-panel border-neon-green/20">
                <div className="space-y-4">
                  <Badge className="bg-neon-green text-black font-bold">THE SOLUTION</Badge>
                  <h3 className="text-4xl font-heading font-bold">Zyniq: Clean Focus.</h3>
                  <p className="text-zinc-400">Our proprietary formula delivers smooth, sustained energy for 4–6 hours of deep work.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-neon-green flex items-center justify-center neon-glow">
                      <CheckCircle2 className="text-black h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-heading font-bold text-2xl">6 Hours of Flow State</p>
                      <p className="text-zinc-500">No spikes, no jitters, just pure concentration.</p>
                    </div>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-neon-green font-heading font-bold text-3xl">0g</p>
                      <p className="text-zinc-500 text-sm uppercase tracking-wider">Sugar</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-neon-green font-heading font-bold text-3xl">100%</p>
                      <p className="text-zinc-500 text-sm uppercase tracking-wider">Focus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-5xl font-heading font-bold tracking-tight">Built for Performance.</h2>
            <p className="text-zinc-400 text-lg">Everything you need to crush your exams, nothing you don't.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Sustained Focus", desc: "No spikes. No jitters. Just pure, clean energy that lasts as long as your study session." },
              { icon: Brain, title: "Mental Clarity", desc: "Enhance your cognitive function and memory retention during high-pressure prep." },
              { icon: ShieldCheck, title: "Zero Crash Formula", desc: "When Zyniq wears off, you feel normal. No slump, no fatigue, no brain fog." },
              { icon: Leaf, title: "Clean Ingredients", desc: "Plant-based caffeine, L-Theanine, and B-Vitamins. No artificial colors or flavors." },
              { icon: Clock, title: "Long Study Sessions", desc: "Designed specifically for the 4-6 hour window students need for deep work." },
              { icon: Info, title: "Science-Backed", desc: "Developed with nutritionists to optimize student performance and well-being." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-neon-green/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-green group-hover:neon-glow transition-all">
                  <benefit.icon className="h-7 w-7 text-neon-green group-hover:text-black transition-colors" />
                </div>
                <h4 className="text-2xl font-heading font-bold mb-3">{benefit.title}</h4>
                <p className="text-zinc-500 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="py-32 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <Badge className="bg-neon-green text-black font-bold">SHOP ZYNIQ</Badge>
              <h2 className="text-5xl font-heading font-bold tracking-tight">Choose Your Fuel.</h2>
            </div>
            <p className="text-zinc-500 max-w-sm">Subscribe and save 15% on every order. Never run out during finals week again.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <Card key={product.id} className={`bg-zinc-900 border-white/5 overflow-hidden group transition-all duration-500 ${product.popular ? "ring-2 ring-neon-green" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/50 backdrop-blur-md border border-white/10 text-white px-3 py-1">
                      {product.tag}
                    </Badge>
                  </div>
                  {product.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-neon-green text-black font-bold px-3 py-1">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-heading font-bold">{product.name}</h3>
                      <p className="text-2xl font-heading font-bold text-neon-green">${product.price}</p>
                    </div>
                    <p className="text-zinc-500 text-sm">{product.description}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest">
                      <CheckCircle2 className="h-3 w-3 text-neon-green" />
                      Free Shipping
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest">
                      <CheckCircle2 className="h-3 w-3 text-neon-green" />
                      Student Discount Applied
                    </div>
                  </div>
                  <Button 
                    onClick={() => addToCart(product)}
                    className="w-full h-14 text-lg font-heading font-bold bg-white text-black hover:bg-neon-green hover:text-black transition-all group/btn"
                  >
                    Add to Cart
                    <Plus className="ml-2 h-5 w-5 transition-transform group-hover/btn:rotate-90" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <div className="flex justify-center gap-1 text-neon-green mb-4">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
            <h2 className="text-5xl font-heading font-bold tracking-tight">Student Approved.</h2>
            <p className="text-zinc-500">Join thousands of students who have upgraded their study game.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl glass-panel space-y-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-green/5 rounded-full blur-2xl" />
                <p className="text-lg italic text-zinc-300 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <img src={t.avatar} alt={t.name} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold">{t.name}</h5>
                    <p className="text-xs text-neon-green uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-blue/10 blur-[120px] rounded-full" />
              <img 
                src="https://picsum.photos/seed/zyniq-lifestyle/800/1000" 
                alt="Student Studying" 
                className="rounded-3xl border border-white/10 shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-neon-green rounded-3xl flex flex-col items-center justify-center text-black p-6 z-20 neon-glow rotate-6">
                <p className="text-4xl font-heading font-bold leading-none">6HR</p>
                <p className="text-xs font-bold uppercase tracking-widest text-center mt-2">Guaranteed Focus Window</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-5xl font-heading font-bold tracking-tight">The 3-Step Focus Flow.</h2>
                <p className="text-zinc-400 text-lg">Achieving deep work shouldn't be a struggle. We've simplified the process.</p>
              </div>

              <div className="space-y-10">
                {[
                  { step: "01", title: "Drink Zyniq", desc: "Enjoy the crisp, refreshing taste 15 minutes before you start your session." },
                  { step: "02", title: "Enter Deep Focus", desc: "Feel the smooth transition as your brain enters a state of high-performance flow." },
                  { step: "03", title: "Stay Sharp for Hours", desc: "Maintain peak cognitive output for 6+ hours without the jitters or anxiety." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-5xl font-heading font-bold text-white/10 group-hover:text-neon-green transition-colors duration-500">{item.step}</div>
                    <div className="space-y-2 pt-2">
                      <h4 className="text-2xl font-heading font-bold">{item.title}</h4>
                      <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Transparency */}
      <section id="ingredients" className="py-32 bg-zinc-950 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-5xl font-heading font-bold tracking-tight">No Sugar Crash. No Nonsense.</h2>
            <p className="text-zinc-400">We believe in total transparency. Here's what's actually inside every can of Zyniq.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INGREDIENTS.map((ing, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto">
                  <Leaf className="h-6 w-6 text-neon-green" />
                </div>
                <h5 className="text-xl font-heading font-bold">{ing.name}</h5>
                <p className="text-zinc-500 text-sm">{ing.benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-8 rounded-3xl glass-panel flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neon-green flex items-center justify-center">
                <ShieldCheck className="text-black h-6 w-6" />
              </div>
              <div>
                <p className="font-heading font-bold text-lg">FDA Compliant & Lab Tested</p>
                <p className="text-zinc-500 text-sm">Every batch is tested for purity and potency.</p>
              </div>
            </div>
            <Button variant="link" className="text-neon-green font-bold uppercase tracking-widest text-xs">
              View Full Nutrition Label
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency / Offer */}
      <section className="py-20 bg-neon-green text-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Timer className="h-6 w-6 animate-pulse" />
              <span className="font-bold uppercase tracking-[0.3em] text-sm">Exam Season Sale – Limited Time</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tighter leading-none">
              Get 20% Off Your<br />First Study Pack.
            </h2>
            <p className="text-black/70 text-lg font-medium max-w-md">
              Don't wait until finals week. Stock up now and save big. Use code <span className="font-bold underline">LOCKIN20</span> at checkout.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4">
              {[
                { label: "HRS", val: timeLeft.hours },
                { label: "MIN", val: timeLeft.minutes },
                { label: "SEC", val: timeLeft.seconds }
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center text-neon-green text-4xl font-heading font-bold">
                    {t.val.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold mt-2 tracking-widest">{t.label}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="h-16 px-12 text-xl font-heading font-bold bg-black text-neon-green hover:bg-black/90 w-full lg:w-auto">
              Grab Your Pack
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-heading font-bold tracking-tight">Common Questions.</h2>
            <p className="text-zinc-500">Everything you need to know about Zyniq.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Is Zyniq safe for daily use?", a: "Yes! Zyniq is made with natural ingredients and moderate caffeine levels (similar to a cup of premium coffee). We recommend no more than 2 cans per day for optimal results." },
              { q: "How is it different from regular coffee?", a: "Coffee often causes jitters and a sharp crash due to its high acidity and lack of balancing amino acids. Zyniq includes L-Theanine, which smooths out the caffeine curve for a 'calm focus' effect." },
              { q: "When should I drink it for best results?", a: "We recommend drinking Zyniq 15-20 minutes before you start a deep study session. This allows the L-Theanine and Caffeine to sync up just as you begin your work." },
              { q: "Are there any side effects?", a: "Most users experience zero side effects. However, if you are extremely sensitive to caffeine, you might experience mild alertness. Zyniq contains zero sugar, so you won't experience a sugar crash." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 rounded-2xl px-6 bg-white/5 overflow-hidden">
                <AccordionTrigger className="text-xl font-heading font-bold hover:no-underline hover:text-neon-green py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-lg pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-none">
              Don't Study Tired.<br />
              <span className="text-neon-green italic">Study Smarter.</span>
            </h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
              Join the elite students who have unlocked their full potential. Your next A+ starts with a single sip.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="h-20 px-12 text-2xl font-heading font-bold bg-neon-green text-black hover:bg-neon-green/90 neon-glow group">
              Order Zyniq Now
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Button>
            <div className="flex items-center gap-4 text-zinc-500 font-medium uppercase tracking-widest text-sm">
              <CheckCircle2 className="h-5 w-5 text-neon-green" />
              Money-Back Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center">
                  <Zap className="text-black h-5 w-5 fill-black" />
                </div>
                <span className="text-xl font-heading font-bold tracking-tighter">ZYNIQ</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Premium focus fuel designed specifically for the modern student. Lock in. Stay sharp. No crash.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon-green hover:text-black transition-all cursor-pointer">
                    <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="font-heading font-bold uppercase tracking-widest text-xs text-neon-green">Shop</h5>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">All Products</li>
                <li className="hover:text-white transition-colors cursor-pointer">Study Packs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Subscription</li>
                <li className="hover:text-white transition-colors cursor-pointer">Merch</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-heading font-bold uppercase tracking-widest text-xs text-neon-green">Company</h5>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
                <li className="hover:text-white transition-colors cursor-pointer">Science</li>
                <li className="hover:text-white transition-colors cursor-pointer">Ambassadors</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-heading font-bold uppercase tracking-widest text-xs text-neon-green">Newsletter</h5>
              <p className="text-zinc-500 text-sm">Get exam tips + 10% off your first order.</p>
              <div className="flex gap-2">
                <Input placeholder="Email Address" className="bg-white/5 border-white/10 focus:border-neon-green h-12" />
                <Button className="h-12 bg-white text-black hover:bg-neon-green hover:text-black">Join</Button>
              </div>
            </div>
          </div>

          <Separator className="bg-white/5 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">
            <p>© 2026 ZYNIQ BEVERAGES INC. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-zinc-400 cursor-pointer transition-colors">Refund Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <Button className="w-full h-16 text-lg font-heading font-bold bg-neon-green text-black hover:bg-neon-green/90 neon-glow shadow-2xl">
          Order Zyniq Now
        </Button>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg glass-panel p-10 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                onClick={() => setShowExitPopup(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              
              <div className="space-y-8 text-center relative z-10">
                <div className="w-20 h-20 bg-neon-green rounded-2xl flex items-center justify-center mx-auto neon-glow rotate-3">
                  <Zap className="text-black h-10 w-10 fill-black" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-heading font-bold tracking-tight">Wait! Don't Study Tired.</h3>
                  <p className="text-zinc-400 text-lg">Get <span className="text-neon-green font-bold">15% OFF</span> your first order + our "Exam Week Survival Guide" PDF.</p>
                </div>
                <div className="space-y-4">
                  <Input placeholder="Enter your student email" className="h-14 bg-white/5 border-white/10 text-center text-lg" />
                  <Button className="w-full h-14 text-xl font-heading font-bold bg-neon-green text-black hover:bg-neon-green/90 neon-glow">
                    Send My Discount
                  </Button>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest">No spam. Just focus tips and exclusive deals.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
