import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in">
            {/* Professional headshot */}
            <div className="w-32 h-32 mx-auto mb-12 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Rivex"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
              Growth through
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                Innovation
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Transforming ideas into meaningful digital experiences that inspire growth and drive progress.
            </p>

            {/* Single CTA */}
            <button
              onClick={() => window.location.href = '/projects'}
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-all duration-300 animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8" />
        </button>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Personal Philosophy</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
              "Every challenge is an opportunity
              <br />
              to grow beyond yesterday's limits."
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              I believe in the power of continuous learning, purposeful innovation, and creating 
              solutions that make a meaningful impact on people's lives.
            </p>
          </div>
        </div>
      </section>

      {/* Growth Metrics Section */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-8 shadow-sm">
                <Target className="h-4 w-4" />
                <span>Progress & Growth</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                Measuring what matters
              </h2>
            </div>

            {/* Growth indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-light text-gray-900 mb-2">50+</div>
                <div className="text-lg text-gray-600 mb-4">Projects Completed</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-light text-gray-900 mb-2">3+</div>
                <div className="text-lg text-gray-600 mb-4">Years Experience</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-light text-gray-900 mb-2">100%</div>
                <div className="text-lg text-gray-600 mb-4">Client Satisfaction</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
              Ready to create something
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                extraordinary?
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              Let's collaborate and turn your vision into reality. Every great project starts with a conversation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/contact'}
                className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => window.location.href = '/about'}
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;