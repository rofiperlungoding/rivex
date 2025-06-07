import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, Trophy, Award, Calendar, Camera, Clapperboard, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  year: number;
  description: string;
  category: 'Education' | 'Competitions' | 'Achievements';
  icon: React.ReactNode;
}

const Timeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<TimelineItem | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "Born",
      organization: "Jakarta, Indonesia",
      date: "2007",
      year: 2007,
      description: "Born in Jakarta, Indonesia, beginning my journey of learning and discovery.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Elementary School",
      organization: "MI Pembangunan Jakarta",
      date: "2014 - 2019",
      year: 2014,
      description: "Started elementary education at MI Pembangunan Jakarta. Developed early interest in mathematics and participated in academic competitions.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Mathematics Competition (KMNR)",
      organization: "National Level Competition",
      date: "2019 (Grade 6)",
      year: 2019,
      description: "Participated in the National Mathematics Competition (KMNR) during my final year of elementary school, showcasing early mathematical talents.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Junior High School",
      organization: "MTs Pembangunan Jakarta",
      date: "2019 - 2022",
      year: 2019,
      description: "Continued education at MTs Pembangunan Jakarta, expanding knowledge in various subjects and developing language skills.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Spelling Bee Competition - 3rd Place",
      organization: "MTs Pembangunan Jakarta",
      date: "2020-2021",
      year: 2020,
      description: "Achieved 3rd place in the school-level Spelling Bee competition, demonstrating strong English language proficiency.",
      category: "Competitions",
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Senior High School",
      organization: "MA Pembangunan Jakarta",
      date: "2022 - 2025",
      year: 2022,
      description: "Currently pursuing senior high school education at MA Pembangunan Jakarta, focusing on science and technology while exploring creative fields.",
      category: "Education",
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 7,
      title: "National Robotics Competition - 3rd Place",
      organization: "National Competition, Sukabumi",
      date: "2023",
      year: 2023,
      description: "Secured 3rd place in the National Robotics Competition held in Sukabumi, demonstrating technical skills and innovation in robotics.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 8,
      title: "Provincial Robotics Competition - 1st Place",
      organization: "Jakarta Provincial Level",
      date: "2023",
      year: 2023,
      description: "Won 1st place in the Provincial Robotics Competition in Jakarta, showcasing excellence in robotics and engineering.",
      category: "Competitions",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 9,
      title: "Photography Competition - 2nd Place (First)",
      organization: "Regional Competition",
      date: "2023",
      year: 2023,
      description: "Achieved 2nd place in a photography competition, demonstrating artistic vision and technical photography skills.",
      category: "Achievements",
      icon: <Camera className="h-5 w-5" />
    },
    {
      id: 10,
      title: "Photography Competition - 2nd Place (Second)",
      organization: "Regional Competition",
      date: "2023",
      year: 2023,
      description: "Secured another 2nd place in a photography competition, consistently showing excellence in visual arts and composition.",
      category: "Achievements",
      icon: <Camera className="h-5 w-5" />
    },
    {
      id: 11,
      title: "Creative Video Competition - 1st Place",
      organization: "National Level",
      date: "2023",
      year: 2023,
      description: "Won 1st place in the National Creative Video Competition, showcasing storytelling abilities and video production skills.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 12,
      title: "Short Movie Competition - 1st Place",
      organization: "National Level",
      date: "2023",
      year: 2023,
      description: "Achieved 1st place in the National Short Movie Competition, demonstrating excellence in filmmaking and narrative creation.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 13,
      title: "School Short Movie Competition - Overall Champion",
      organization: "MA Pembangunan Jakarta",
      date: "2023",
      year: 2023,
      description: "Won the overall championship in the school-level short movie competition, establishing leadership in creative media production.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 14,
      title: "National Research Competition - 1st Place",
      organization: "National Level",
      date: "2024",
      year: 2024,
      description: "Secured 1st place in the National Research Competition, demonstrating strong analytical and research capabilities.",
      category: "Competitions",
      icon: <Search className="h-5 w-5" />
    },
    {
      id: 15,
      title: "School Short Movie Competition - Overall Champion",
      organization: "MA Pembangunan Jakarta",
      date: "2024",
      year: 2024,
      description: "Won the overall championship in the school-level short movie competition for the second consecutive year, maintaining excellence in filmmaking.",
      category: "Achievements",
      icon: <Clapperboard className="h-5 w-5" />
    },
    {
      id: 16,
      title: "High School Graduation",
      organization: "MA Pembangunan Jakarta",
      date: "2025",
      year: 2025,
      description: "Expected to graduate from MA Pembangunan Jakarta, completing senior high school education with a strong foundation in academics and creative achievements.",
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
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Competitions':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Achievements':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-primary-100 text-primary-700 border-primary-200';
    }
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (timelineRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Handle scroll events
  useEffect(() => {
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      
      return () => timeline.removeEventListener('scroll', checkScrollPosition);
    }
  }, [filteredItems]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedEvent) {
        if (e.key === 'Escape') {
          setSelectedEvent(null);
        }
      } else {
        if (e.key === 'ArrowLeft') {
          scrollLeft();
        } else if (e.key === 'ArrowRight') {
          scrollRight();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedEvent]);

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <section data-section="header" className="text-center mb-12">
          <h1 className="text-4xl font-bold text-themed-primary mb-4">My Journey</h1>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            From early education to academic achievements, competitions, and creative pursuits - explore my timeline chronologically.
          </p>
        </section>

        {/* Category Filter */}
        <section data-section="filter" className="flex flex-wrap justify-center gap-4 mb-8">
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

        {/* Timeline Container */}
        <section data-section="timeline" className="relative">
          {/* Scroll Controls */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full transition-all duration-200 ${
                canScrollLeft
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                  : 'bg-themed-tertiary text-themed-tertiary cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <p className="text-sm text-themed-tertiary">
                Scroll horizontally or use arrow keys to navigate
              </p>
            </div>
            
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-3 rounded-full transition-all duration-200 ${
                canScrollRight
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                  : 'bg-themed-tertiary text-themed-tertiary cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative overflow-hidden">
            {/* Timeline Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-themed-secondary z-0"></div>
            
            {/* Scrollable Container */}
            <div
              ref={timelineRef}
              className="flex space-x-8 overflow-x-auto pb-6 pt-4 px-4 scroll-smooth"
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgb(59 130 246) transparent'
              }}
            >
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-80 relative group cursor-pointer"
                  onClick={() => setSelectedEvent(item)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-6 h-6 ${getCategoryColor(item.category)} rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform duration-300`}>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                      {item.icon}
                    </div>
                  </div>

                  {/* Year Label */}
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                      {item.year}
                    </span>
                  </div>

                  {/* Event Card */}
                  <div className="mt-12 card p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 bg-themed-primary border border-themed-primary">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryBadgeColor(item.category)}`}>
                        {item.category}
                      </span>
                      <div className="flex items-center text-themed-tertiary text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-themed-primary mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-primary-600 font-medium text-sm mb-3">
                      {item.organization}
                    </p>
                    
                    <p className="text-themed-secondary text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-4 text-xs text-primary-600 font-medium">
                      Click to read more →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(filteredItems.length / 3) }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-themed-tertiary opacity-50"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section data-section="stats" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 card hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {timelineItems.filter(item => item.category === 'Education').length}
            </div>
            <div className="text-themed-secondary">Educational Milestones</div>
          </div>
          <div className="text-center p-6 card hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {timelineItems.filter(item => item.category === 'Competitions').length}
            </div>
            <div className="text-themed-secondary">Competition Participations</div>
          </div>
          <div className="text-center p-6 card hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {timelineItems.filter(item => item.category === 'Achievements').length}
            </div>
            <div className="text-themed-secondary">Creative Achievements</div>
          </div>
        </section>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-themed-primary rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${getCategoryColor(selectedEvent.category)} rounded-full flex items-center justify-center text-white`}>
                      {selectedEvent.icon}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryBadgeColor(selectedEvent.category)}`}>
                        {selectedEvent.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-themed-tertiary hover:text-themed-primary transition-colors duration-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-themed-primary mb-2">
                  {selectedEvent.title}
                </h2>
                
                <p className="text-primary-600 font-medium mb-2">
                  {selectedEvent.organization}
                </p>
                
                <div className="flex items-center text-themed-tertiary text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {selectedEvent.date}
                </div>
                
                <p className="text-themed-secondary leading-relaxed text-lg">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-themed-tertiary text-lg">No timeline items found in this category.</p>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scroll-smooth::-webkit-scrollbar {
          height: 8px;
        }
        
        .scroll-smooth::-webkit-scrollbar-track {
          background: rgb(243 244 246);
          border-radius: 4px;
        }
        
        .scroll-smooth::-webkit-scrollbar-thumb {
          background: rgb(59 130 246);
          border-radius: 4px;
        }
        
        .scroll-smooth::-webkit-scrollbar-thumb:hover {
          background: rgb(37 99 235);
        }
      `}</style>
    </div>
  );
};

export default Timeline;