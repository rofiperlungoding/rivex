import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Github, Instagram, ArrowRight, ExternalLink, Code, Palette, Zap } from 'lucide-react';
import { useNews } from '../hooks/useNews';

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { articles, loading, error } = useNews();

  // Dark, professional background images
  const backgroundImages = [
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Featured projects data
  const featuredProjects = [
    {
      id: 1,
      title: "Convers-AI",
      description: "Convers-AI is an advanced conversational AI platform offering a variety of tools for personalizing and optimizing customer interactions.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "OpenAI", "MongoDB"],
      category: "AI Platform"
    },
    {
      id: 2,
      title: "AI SASS",
      description: "A comprehensive Software-as-a-Service platform powered by artificial intelligence for business automation and analytics.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      category: "SaaS Platform"
    },
    {
      id: 3,
      title: "Pixel Perfect",
      description: "Pixel Perfect is an image optimization and compression tool that converts and compresses images while maintaining quality.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Vue.js", "WebAssembly", "Canvas API", "PWA"],
      category: "Image Tool"
    }
  ];

  return (
    <>
      {/* Hero Section with Dark Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Images with Dark Overlay */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover filter grayscale"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-left text-white px-6 max-w-6xl mx-auto w-full">
          <div className="animate-fade-in">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight">
                Hey, I'm <span className="text-white">Rivex</span>,
              </h1>
              <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-4xl md:text-6xl font-light">
                  A Full-Stack
                </h2>
                <div className="relative">
                  <span className="text-4xl md:text-6xl font-light text-blue-400 bg-blue-900/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-blue-500/30">
                    Developer.
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mb-12 leading-relaxed font-light">
              Passionate developer with a knack for creating dynamic web applications, 
              exploring cutting-edge technologies, and engaging in outdoor adventures.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="/about"
                className="px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                About
              </a>
              <a
                href="mailto:rivex@example.com"
                className="flex items-center space-x-2 px-8 py-4 bg-transparent text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300 border border-gray-600 hover:border-gray-500"
              >
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-all duration-300 animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* New Drops Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-white">
              New Drops
            </h2>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                  {/* Project Image */}
                  <div className={`relative overflow-hidden ${index === 0 ? 'h-80' : 'h-48'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-4 text-base">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Link */}
          <div className="text-center mt-12">
            <a
              href="/projects"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6">
              What I Do Best
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Specialized in creating modern, scalable applications with cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Frontend Development */}
            <div className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Frontend Development</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Creating responsive, interactive user interfaces with React, TypeScript, and modern CSS frameworks.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['React', 'TypeScript', 'Tailwind', 'Next.js'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Development */}
            <div className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Backend Development</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Building robust APIs and server-side applications with Node.js, databases, and cloud services.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Node.js', 'MongoDB', 'PostgreSQL', 'AWS'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* UI/UX Design */}
            <div className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">UI/UX Design</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Designing intuitive user experiences and beautiful interfaces that users love to interact with.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Figma', 'Adobe XD', 'Sketch', 'Prototyping'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:rivex@example.com"
                className="flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                <span>Get In Touch</span>
              </a>
              
              <a
                href="https://github.com/rivex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                <Github className="h-5 w-5" />
                <span>View Work</span>
              </a>
              
              <a
                href="https://instagram.com/rivex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                <Instagram className="h-5 w-5" />
                <span>Follow</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;