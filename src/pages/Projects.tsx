import React, { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Application",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      category: "Mobile App",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather monitoring dashboard with interactive maps, forecasts, and location-based alerts.",
      image: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
      category: "Web Application",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing modern web development techniques and best practices.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      category: "Website",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: 5,
      title: "Learning Management System",
      description: "Educational platform with course management, progress tracking, and interactive learning tools.",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Django", "PostgreSQL", "Redis"],
      category: "Web Application",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      description: "Mobile-first fitness application with workout tracking, progress visualization, and social features.",
      image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React Native", "Node.js", "MongoDB"],
      category: "Mobile App",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com"
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <section data-section="header" className="text-center mb-12">
          <h1 className="text-4xl font-bold text-themed-primary mb-4">App Projects</h1>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            A collection of applications and websites I've built using modern technologies and best practices.
          </p>
        </section>

        {/* Category Filter */}
        <section data-section="filter" className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Filter className="h-5 w-5 text-themed-tertiary" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-themed-tertiary text-themed-secondary hover:bg-themed-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        {/* Projects Grid */}
        <section data-section="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card overflow-hidden group hover:scale-102 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-themed-primary mb-2">{project.title}</h3>
                <p className="text-themed-secondary mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-themed-secondary hover:text-primary-600 transition-colors duration-200"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-themed-secondary hover:text-primary-600 transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-themed-tertiary text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;