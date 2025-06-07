import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Modern workspace setup",
      title: "Workspace Setup",
      category: "Workspace"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Code on multiple screens",
      title: "Development Environment",
      category: "Development"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Team collaboration session",
      title: "Team Meeting",
      category: "Team"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Design sketches and wireframes",
      title: "Design Process",
      category: "Design"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Conference presentation",
      title: "Speaking Event",
      category: "Events"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Mobile app prototype",
      title: "Mobile Design",
      category: "Design"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Hackathon project",
      title: "Hackathon Win",
      category: "Events"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Open source contribution",
      title: "Open Source",
      category: "Development"
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Creative workspace",
      title: "Studio Space",
      category: "Workspace"
    }
  ];

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    } else {
      const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev');
        } else if (e.key === 'ArrowRight') {
          navigateImage('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <section data-section="header" className="text-center mb-12">
          <h1 className="text-4xl font-bold text-themed-primary mb-4">Gallery</h1>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            A visual journey through my projects, workspace, and professional experiences.
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

        {/* Masonry Grid */}
        <section data-section="gallery" className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => openLightbox(image)}
            >
              <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to view
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-themed-primary mb-1">{image.title}</h3>
                  <span className="text-sm text-primary-600">{image.category}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-themed-tertiary text-lg">No images found in this category.</p>
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200 z-10"
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain animate-scale-in"
              />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-medium mb-1">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;