import React from 'react';
import { ArrowRight, Mail, Github, Instagram } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section - Clean and Minimal */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/WhatsApp Image 2025-05-18 at 06.19.27_919beb6a.jpg"
            alt="Rivex Team"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Rivex Logo - Top Right */}
        <div className="absolute top-8 right-8 z-20">
          <h1 className="text-white text-2xl font-light tracking-wider">
            rivex
          </h1>
        </div>

        {/* Main Content - Right Aligned */}
        <div className="relative z-10 text-right text-white px-8 max-w-7xl mx-auto w-full">
          <div className="ml-auto max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-light mb-8 leading-tight italic">
              grow anywhere,<br />
              anytime,<br />
              anyone.
            </h2>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section - Clean and Minimal */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                Innovation through
                <span className="block text-gray-500">technology</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-light mb-8">
                We believe in the power of technology to transform ideas into reality. 
                Our mission is to create solutions that empower growth, foster innovation, 
                and connect people across the globe.
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="mailto:contact@rivex.com"
                  className="group flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-light">Get in touch</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Innovation workspace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              What we do
            </h3>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Comprehensive solutions for the digital age
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="text-xl font-light text-gray-900 mb-4">Development</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Custom software solutions built with cutting-edge technologies and best practices.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-xl font-light text-gray-900 mb-4">Innovation</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Pushing boundaries with AI, machine learning, and emerging technologies.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="text-xl font-light text-gray-900 mb-4">Global Reach</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Connecting businesses and individuals across borders through technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 max-w-4xl text-center">
          <h3 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Ready to grow?
          </h3>
          <p className="text-lg text-gray-600 font-light mb-12 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals through innovative technology solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a
              href="mailto:contact@rivex.com"
              className="group flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              <span className="font-light">Start a conversation</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/rivex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/rivex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-light text-gray-900">rivex</h4>
              <p className="text-gray-600 font-light text-sm">Innovation & Technology</p>
            </div>
            <div className="text-gray-500 font-light text-sm">
              © 2024 Rivex. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;