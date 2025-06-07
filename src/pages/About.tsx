import React from 'react';
import { Mail, Github, Instagram } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Hero Section */}
        <section data-section="hero" className="max-w-4xl mx-auto text-center mb-16">
          <div className="animate-slide-up">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 shadow-2xl">
              <img
                src="/WhatsApp Image 2025-05-18 at 06.19.27_919beb6a.jpg"
                alt="Rofi Darmawan - Computer Science Student"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-themed-primary mb-4 text-balance">
              Rofi Darmawan
            </h1>
            <p className="text-xl text-primary-600 mb-8 font-medium">
              Computer Science Student
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-themed-secondary leading-relaxed mb-6">
                Passionate about the intersection of computation and visual arts, with a deep interest in 
                cinema, photography, and design. Constantly exploring new technologies while pursuing 
                personal growth and development.
              </p>
              <p className="text-lg text-themed-secondary leading-relaxed">
                Combining technical expertise with creative vision to build meaningful solutions that 
                bridge the gap between technology and human experience.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section data-section="contact" className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-themed-primary mb-8 text-center">Contact Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center hover:scale-105 transition-transform duration-300">
              <Mail className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="font-medium text-themed-primary mb-2">Email</h3>
              <a 
                href="mailto:opikopi32@gmail.com" 
                className="text-primary-600 hover:text-primary-700 transition-colors text-sm break-all"
              >
                opikopi32@gmail.com
              </a>
            </div>
            
            <div className="card p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="h-8 w-8 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <h3 className="font-medium text-themed-primary mb-2">X (Twitter)</h3>
              <a 
                href="https://x.com/opikopi6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 transition-colors text-sm"
              >
                @opikopi6
              </a>
            </div>
            
            <div className="card p-6 text-center hover:scale-105 transition-transform duration-300">
              <Instagram className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="font-medium text-themed-primary mb-2">Instagram</h3>
              <a 
                href="https://www.instagram.com/rofidoesthings" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 transition-colors text-sm"
              >
                @rofidoesthings
              </a>
            </div>
            
            <div className="card p-6 text-center hover:scale-105 transition-transform duration-300">
              <Github className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="font-medium text-themed-primary mb-2">GitHub</h3>
              <a 
                href="https://github.com/rofiperlungoding" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 transition-colors text-sm"
              >
                @rofiperlungoding
              </a>
            </div>
          </div>
        </section>

        {/* Interests & Focus Areas */}
        <section data-section="interests" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-themed-primary mb-8 text-center">Interests & Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-lg font-medium text-themed-primary mb-4">Cinema & Visual Arts</h3>
              <p className="text-themed-secondary">
                Exploring storytelling through visual media, cinematography techniques, and the art of visual narrative.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-lg font-medium text-themed-primary mb-4">Photography & Design</h3>
              <p className="text-themed-secondary">
                Capturing moments and creating visual experiences that communicate ideas and emotions effectively.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-lg font-medium text-themed-primary mb-4">Technology & Innovation</h3>
              <p className="text-themed-secondary">
                Constantly learning new technologies and exploring innovative solutions to complex problems.
              </p>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section data-section="skills" className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-themed-primary mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-themed-primary mb-4">Programming Languages</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['Python', 'JavaScript', 'Java', 'C++', 'TypeScript'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-themed-primary mb-4">Web Technologies</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['React', 'Node.js', 'HTML/CSS', 'MongoDB', 'Express'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-themed-primary mb-4">Creative Tools</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['Photoshop', 'Premiere Pro', 'Figma', 'Blender', 'After Effects'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;