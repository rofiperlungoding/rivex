import React, { useState } from 'react';
import { GraduationCap, Trophy, Award, Calendar } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: 'Education' | 'Competitions' | 'Certifications';
  icon: React.ReactNode;
}

const Timeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "Master of Computer Science",
      organization: "Stanford University",
      date: "2020 - 2022",
      description: "Specialized in Human-Computer Interaction and Software Engineering. Graduated with honors, GPA 3.8/4.0. Thesis: 'Improving User Experience in Web Applications through AI-Driven Personalization'.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 2,
      title: "AWS Solutions Architect Professional",
      organization: "Amazon Web Services",
      date: "2023",
      description: "Advanced certification demonstrating deep understanding of designing distributed applications and systems on the AWS platform, including complex multi-tier architectures.",
      category: "Certifications",
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 3,
      title: "International Coding Olympiad - Gold Medal",
      organization: "ACM ICPC",
      date: "2021",
      description: "Achieved first place in the regional programming contest, solving 8 out of 10 complex algorithmic problems within the time limit. Advanced to world finals.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Bachelor of Software Engineering",
      organization: "University of California, Berkeley",
      date: "2016 - 2020",
      description: "Comprehensive study of software development lifecycle, algorithms, data structures, and system design. Dean's List all four years. Capstone project: Real-time collaboration platform.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Google Cloud Professional Developer",
      organization: "Google Cloud",
      date: "2022",
      description: "Certification validating skills in designing, building, and deploying applications on Google Cloud Platform using best practices for scalability and security.",
      category: "Certifications",
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Hackathon Winner - Best Innovation",
      organization: "TechCrunch Disrupt",
      date: "2022",
      description: "Led a team of 4 developers to create an AI-powered accessibility tool in 48 hours. Solution helped visually impaired users navigate websites more effectively.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 7,
      title: "React Developer Certification",
      organization: "Meta",
      date: "2021",
      description: "Advanced certification covering React ecosystem, including hooks, context, performance optimization, and testing strategies. Demonstrated proficiency in building scalable React applications.",
      category: "Certifications",
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 8,
      title: "Global Programming Contest - Silver Medal",
      organization: "IEEE Programming Contest",
      date: "2020",
      description: "Second place finish in international programming competition with participants from 50+ countries. Specialized in algorithms optimization and competitive programming.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    }
  ];

  const categories = ['All', 'Education', 'Competitions', 'Certifications'];

  const filteredItems = selectedCategory === 'All' 
    ? timelineItems 
    : timelineItems.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Education':
        return 'bg-blue-500';
      case 'Competitions':
        return 'bg-yellow-500';
      case 'Certifications':
        return 'bg-green-500';
      default:
        return 'bg-primary-500';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Education':
        return 'bg-blue-100 text-blue-700';
      case 'Competitions':
        return 'bg-yellow-100 text-yellow-700';
      case 'Certifications':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-primary-100 text-primary-700';
    }
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <section data-section="header" className="text-center mb-12">
          <h1 className="text-4xl font-bold text-themed-primary mb-4">Timeline</h1>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            My journey through education, professional development, and competitive achievements.
          </p>
        </section>

        {/* Category Filter */}
        <section data-section="filter" className="flex flex-wrap justify-center gap-4 mb-12">
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

        {/* Timeline */}
        <section data-section="timeline" className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-themed-secondary"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {filteredItems.map((item, index) => (
                <div key={item.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 ${getCategoryColor(item.category)} rounded-full border-4 border-white shadow-md flex items-center justify-center`}>
                    <div className="text-white text-xs">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="ml-20">
                    <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(item.category)}`}>
                              {item.category}
                            </span>
                            <div className="flex items-center text-themed-tertiary text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              {item.date}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-themed-primary mb-1">
                            {item.title}
                          </h3>
                          <p className="text-primary-600 font-medium mb-3">
                            {item.organization}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-themed-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-themed-tertiary text-lg">No timeline items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;