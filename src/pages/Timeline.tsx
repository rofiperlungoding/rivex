import React, { useState } from 'react';
import { GraduationCap, Trophy, Award, Calendar, Camera, Clapperboard, Search } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: 'Education' | 'Competitions' | 'Achievements';
  icon: React.ReactNode;
}

const Timeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const timelineItems: TimelineItem[] = [
    {
      id: 16,
      title: "High School Graduation",
      organization: "MA Pembangunan Jakarta",
      date: "2025",
      description: "Expected to graduate from MA Pembangunan Jakarta, completing senior high school education with a strong foundation in academics and creative achievements.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 15,
      title: "School Short Movie Competition - Overall Champion",
      organization: "MA Pembangunan Jakarta",
      date: "2024",
      description: "Won the overall championship in the school-level short movie competition for the second consecutive year, maintaining excellence in filmmaking.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 14,
      title: "National Research Competition - 1st Place",
      organization: "National Level",
      date: "2024",
      description: "Secured 1st place in the National Research Competition, demonstrating strong analytical and research capabilities.",
      category: "Competitions",
      icon: <Search className="h-5 w-5" />
    },
    {
      id: 13,
      title: "School Short Movie Competition - Overall Champion",
      organization: "MA Pembangunan Jakarta",
      date: "2023",
      description: "Won the overall championship in the school-level short movie competition, establishing leadership in creative media production.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 12,
      title: "Short Movie Competition - 1st Place",
      organization: "National Level",
      date: "2023",
      description: "Achieved 1st place in the National Short Movie Competition, demonstrating excellence in filmmaking and narrative creation.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 11,
      title: "Creative Video Competition - 1st Place",
      organization: "National Level",
      date: "2023",
      description: "Won 1st place in the National Creative Video Competition, showcasing storytelling abilities and video production skills.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 10,
      title: "Photography Competition - 2nd Place (Second)",
      organization: "Regional Competition",
      date: "2023",
      description: "Secured another 2nd place in a photography competition, consistently showing excellence in visual arts and composition.",
      category: "Achievements",
      icon: <Camera className="h-5 w-5" />
    },
    {
      id: 9,
      title: "Photography Competition - 2nd Place (First)",
      organization: "Regional Competition",
      date: "2023",
      description: "Achieved 2nd place in a photography competition, demonstrating artistic vision and technical photography skills.",
      category: "Achievements",
      icon: <Camera className="h-5 w-5" />
    },
    {
      id: 8,
      title: "Provincial Robotics Competition - 1st Place",
      organization: "Jakarta Provincial Level",
      date: "2023",
      description: "Won 1st place in the Provincial Robotics Competition in Jakarta, showcasing excellence in robotics and engineering.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 7,
      title: "National Robotics Competition - 3rd Place",
      organization: "National Competition, Sukabumi",
      date: "2023",
      description: "Secured 3rd place in the National Robotics Competition held in Sukabumi, demonstrating technical skills and innovation in robotics.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Senior High School",
      organization: "MA Pembangunan Jakarta",
      date: "2022 - 2025",
      description: "Currently pursuing senior high school education at MA Pembangunan Jakarta, focusing on science and technology while exploring creative fields.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Spelling Bee Competition - 3rd Place",
      organization: "MTs Pembangunan Jakarta",
      date: "2020-2021",
      description: "Achieved 3rd place in the school-level Spelling Bee competition, demonstrating strong English language proficiency.",
      category: "Competitions",
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Junior High School",
      organization: "MTs Pembangunan Jakarta",
      date: "2019 - 2022",
      description: "Continued education at MTs Pembangunan Jakarta, expanding knowledge in various subjects and developing language skills.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Mathematics Competition (KMNR)",
      organization: "National Level Competition",
      date: "2019 (Grade 6)",
      description: "Participated in the National Mathematics Competition (KMNR) during my final year of elementary school, showcasing early mathematical talents.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Elementary School",
      organization: "MI Pembangunan Jakarta",
      date: "2014 - 2019",
      description: "Started elementary education at MI Pembangunan Jakarta. Developed early interest in mathematics and participated in academic competitions.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 1,
      title: "Born",
      organization: "Jakarta, Indonesia",
      date: "2007",
      description: "Born in Jakarta, Indonesia, beginning my journey of learning and discovery.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    }
  ];

  const categories = ['All', 'Education', 'Competitions', 'Achievements'];

  const filteredItems = selectedCategory === 'All' 
    ? timelineItems 
    : timelineItems.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Education':
        return 'bg-blue-500';
      case 'Competitions':
        return 'bg-yellow-500';
      case 'Achievements':
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
      case 'Achievements':
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
          <h1 className="text-4xl font-bold text-themed-primary mb-4">My Journey</h1>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            From early education to academic achievements, competitions, and creative pursuits - here's my educational and personal development timeline.
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

        {/* Summary Stats */}
        <section data-section="stats" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {timelineItems.filter(item => item.category === 'Education').length}
            </div>
            <div className="text-themed-secondary">Educational Milestones</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {timelineItems.filter(item => item.category === 'Competitions').length}
            </div>
            <div className="text-themed-secondary">Competition Participations</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {timelineItems.filter(item => item.category === 'Achievements').length}
            </div>
            <div className="text-themed-secondary">Creative Achievements</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Timeline;