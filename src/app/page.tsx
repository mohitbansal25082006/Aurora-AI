'use client';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Text, Sphere, Box, Torus } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Link from 'next/link';
import * as THREE from 'three';

// Advanced 3D Background with multiple elements
function Background() {
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <Stars radius={300} depth={60} count={8000} factor={6} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#8b5cf6" />
      <OrbitControls enableZoom={false} enablePan={false} />
      <FloatingObjects />
      <ParticleField />
    </>
  );
}

// Particle field effect
function ParticleField() {
  const count = 500;
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
      particlesRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;
  }
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// Floating 3D Objects
function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });
  return (
    <group ref={groupRef}>
      <FloatingSphere position={[3, 2, -5]} color="#6366f1" />
      <FloatingCube position={[-4, -1, -7]} color="#8b5cf6" />
      <FloatingTorus position={[2, -3, -6]} color="#ec4899" />
      <FloatingSphere position={[-3, 3, -8]} color="#3b82f6" size={0.7} />
      <FloatingCube position={[5, -2, -9]} color="#10b981" size={0.8} />
      <FloatingPyramid position={[-2, -4, -10]} color="#f59e0b" />
      <FloatingTorus position={[4, 4, -7]} color="#ef4444" size={0.6} />
    </group>
  );
}

// Individual floating components
function FloatingSphere({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.3;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Sphere ref={ref} position={position} args={[size, 32, 32]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </Sphere>
  );
}

function FloatingCube({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.cos(state.clock.getElapsedTime() + position[0]) * 0.4;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <Box ref={ref} position={position} args={[size, size, size]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </Box>
  );
}

function FloatingTorus({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0] * 2) * 0.3;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <Torus ref={ref} position={position} args={[size, 0.3, 16, 100]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </Torus>
  );
}

function FloatingPyramid({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0] * 3) * 0.2;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[size, size * 1.5, 4]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
}

// Advanced floating text with glow effect
function FloatingText({ position, text, color = "white" }: { position: [number, number, number]; text: string; color?: string }) {
  return (
    <Text
      position={position}
      fontSize={0.7}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/fonts/inter-bold.woff"
    >
      {text}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </Text>
  );
}

// Interactive 3D Card
function InteractiveCard({ title, description, index, icon }: { title: string; description: string; index: number; icon: string }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      className="relative h-full"
      whileHover={{ y: -15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-500 ${
        index === 0 ? 'from-blue-600/20 to-indigo-700/30' : 
        index === 1 ? 'from-purple-600/20 to-pink-700/30' : 
        index === 2 ? 'from-emerald-600/20 to-teal-700/30' :
        index === 3 ? 'from-amber-600/20 to-orange-700/30' :
        index === 4 ? 'from-rose-600/20 to-red-700/30' :
        'from-cyan-600/20 to-blue-700/30'
      } ${hovered ? 'opacity-100 blur-md' : 'opacity-70'}`} />
      
      <div className="relative h-full rounded-2xl bg-gray-900/70 backdrop-blur-lg border border-gray-800 p-6 transition-all duration-300 hover:border-gray-700">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
          index === 0 ? 'bg-blue-500/20 text-blue-400' : 
          index === 1 ? 'bg-purple-500/20 text-purple-400' : 
          index === 2 ? 'bg-emerald-500/20 text-emerald-400' :
          index === 3 ? 'bg-amber-500/20 text-amber-400' :
          index === 4 ? 'bg-rose-500/20 text-rose-400' :
          'bg-cyan-500/20 text-cyan-400'
        }`}>
          <div className="text-xl font-bold">{icon}</div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent ${
          index === 0 ? 'from-blue-400 to-indigo-400' : 
          index === 1 ? 'from-purple-400 to-pink-400' : 
          index === 2 ? 'from-emerald-400 to-teal-400' :
          index === 3 ? 'from-amber-400 to-orange-400' :
          index === 4 ? 'from-rose-400 to-red-400' :
          'from-cyan-400 to-blue-400'
        }">
          {title}
        </h3>
        
        <p className="text-gray-300">{description}</p>
        
        {hovered && (
          <motion.div 
            className="absolute bottom-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Animated feature section
function FeatureSection() {
  const features = [
    {
      title: 'Real-Time Research',
      description: 'Access the latest information from across the web, processed and summarized in seconds with our advanced AI agents.',
      icon: '🌐'
    },
    {
      title: 'Fact-Checked Insights',
      description: 'Our AI cross-references multiple sources to ensure accuracy and reliability of all information provided.',
      icon: '✅'
    },
    {
      title: 'Interactive Visualization',
      description: 'Explore your research through dynamic knowledge graphs, timelines, and interactive data visualizations.',
      icon: '📊'
    },
    {
      title: 'Multi-Step Research Chains',
      description: 'Watch as our AI performs complex research workflows with real-time progress tracking.',
      icon: '🔗'
    },
    {
      title: 'Collaborative Workspaces',
      description: 'Share research boards with your team and collaborate in real-time on complex projects.',
      icon: '👥'
    },
    {
      title: 'Custom AI Profiles',
      description: 'Choose from Academic, Journalist, or Analyst profiles to tailor research to your specific needs.',
      icon: '🧠'
    },
    {
      title: 'Advanced Data Extraction',
      description: 'Extract structured data from unstructured sources using our proprietary AI algorithms.',
      icon: '🔍'
    },
    {
      title: 'Cross-Platform Access',
      description: 'Access your research from any device with our responsive web and mobile applications.',
      icon: '📱'
    },
    {
      title: 'Export & Sharing',
      description: 'Export your findings in multiple formats and share them with colleagues or publish online.',
      icon: '📤'
    }
  ];
  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Advanced AI Research Capabilities
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the future of research with our cutting-edge AI technology
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <InteractiveCard 
                title={feature.title} 
                description={feature.description} 
                index={index % 6}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// How it works section
function HowItWorks() {
  const steps = [
    {
      title: "Enter Your Query",
      description: "Type any research question or topic you want to explore",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "AI Research Process",
      description: "Our AI agents search, analyze, and synthesize information from multiple sources",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Visualize & Explore",
      description: "Interact with dynamic knowledge graphs and summarized insights",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Save & Collaborate",
      description: "Store your research in workspaces and share with your team",
      color: "from-amber-500 to-orange-600"
    }
  ];
  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How Aurora AI Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From query to insight in four simple steps
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30 transform -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="md:w-1/2 flex justify-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} shadow-lg`}>
                    <div className="text-2xl font-bold text-white">{index + 1}</div>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className={`p-6 rounded-2xl bg-gray-900/70 backdrop-blur-lg border border-gray-800 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Testimonial section
function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Research Scientist",
      content: "Aurora AI has transformed how I conduct literature reviews. What used to take weeks now takes hours with incredible accuracy.",
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      name: "Michael Chen",
      role: "Technology Analyst",
      content: "The interactive visualizations help me spot trends and connections I would have missed in traditional research methods.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      name: "Emma Rodriguez",
      role: "Journalist",
      content: "Fact-checking is so much faster with Aurora AI. I can verify information across multiple sources in real-time.",
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];
  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Trusted by Researchers & Professionals
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hear from those who have transformed their research workflow
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`h-full p-6 rounded-2xl bg-gradient-to-br ${testimonial.color} backdrop-blur-lg border border-gray-800`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-gray-300">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CTA Section
function CTASection() {
  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Ready to Revolutionize Your Research?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of researchers and professionals who are already using Aurora AI to accelerate their work.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 text-lg px-8 py-4 rounded-full shadow-lg shadow-blue-500/20">
                Get Started Free
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Newsletter Section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Here you would normally send the email to your backend
    toast.success('Thank you for subscribing! You will receive our newsletter soon.');
    setEmail('');
  };
  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates, features, and AI research insights.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 py-4 px-6 rounded-full"
              required
            />
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 py-4 px-8 rounded-full shadow-lg shadow-green-500/20"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

// Main component
export default function LandingPage() {
  const [researchQuery, setResearchQuery] = useState('');
  const [profile, setProfile] = useState('Academic');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQuery.trim()) {
      toast.error('Please enter a research query');
      return;
    }
    toast.success(`Redirecting to dashboard with query: ${researchQuery}`);
    // In a real app, you would navigate to the dashboard with the query
    window.location.href = `/dashboard?query=${encodeURIComponent(researchQuery)}&profile=${profile}`;
  };
  
  if (!isMounted) return null;
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <Background />
            <FloatingText position={[0, 3, -5]} text="Aurora AI" />
            <FloatingText position={[-4, 0, -5]} text="Research" />
            <FloatingText position={[4, 0, -5]} text="Analyze" />
            <FloatingText position={[0, -3, -5]} text="Discover" />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Aurora AI
          </motion.h1>
          
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-300 sm:text-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The next-generation AI research agent that delivers real-time, fact-checked, and visually interactive insights.
          </motion.p>
          
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 py-4 px-8 rounded-full shadow-lg shadow-indigo-500/20 text-lg">
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {[
              {
                title: 'Real-Time Research',
                description: 'Get the latest information from the web, processed and summarized in seconds.',
              },
              {
                title: 'Fact-Checked Insights',
                description: 'Our AI cross-references multiple sources to ensure accuracy and reliability.',
              },
              {
                title: 'Interactive Visualization',
                description: 'Explore your research through dynamic knowledge graphs and timelines.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-2xl bg-gray-800/50 backdrop-blur-sm p-6 border border-gray-700"
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  index === 0 ? 'bg-blue-500/20 text-blue-400' : 
                  index === 1 ? 'bg-purple-500/20 text-purple-400' : 
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  <div className="text-xl font-bold">{index + 1}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Feature Section */}
      <FeatureSection />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* Footer */}
      <motion.footer
        className="relative z-10 py-10 text-center text-gray-500 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Aurora AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}