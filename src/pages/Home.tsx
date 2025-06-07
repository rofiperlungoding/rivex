import React, { useState } from 'react';
import { Search, Star, Play, Pause } from 'lucide-react';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('talent');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: 'Development & IT',
      rating: 4.85,
      skills: '1934 skills',
      color: 'text-orange-500'
    },
    {
      title: 'AI Services',
      rating: 4.8,
      skills: '294 skills',
      color: 'text-orange-500'
    },
    {
      title: 'Design & Creative',
      rating: 4.91,
      skills: '968 skills',
      color: 'text-orange-500'
    },
    {
      title: 'Sales & Marketing',
      rating: 4.77,
      skills: '392 skills',
      color: 'text-orange-500'
    },
    {
      title: 'Writing & Translation',
      rating: 4.92,
      skills: '505 skills',
      color: 'text-orange-500'
    },
    {
      title: 'Admin & Customer Support',
      rating: 4.77,
      skills: '508 skills',
      color: 'text-orange-500'
    },
    {
      title: 'Finance & Accounting',
      rating: 4.79,
      skills: '214 skills',
      color: 'text-orange-500'
    },
    {
      title: 'Engineering & Architecture',
      rating: 4.85,
      skills: '650 skills',
      color: 'text-orange-500'
    }
  ];

  const trustedCompanies = [
    { name: 'Microsoft', logo: '🏢' },
    { name: 'Airbnb', logo: '🏠' },
    { name: 'Bissell', logo: '🧹' },
    { name: 'GE Appliances', logo: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">upwork</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 font-medium">
                  Find talent
                  <span className="ml-1">▼</span>
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 font-medium">
                  Find work
                  <span className="ml-1">▼</span>
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 font-medium">
                  Why Upwork?
                  <span className="ml-1">▼</span>
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 font-medium">
                  What's new
                  <span className="ml-1">▼</span>
                </button>
              </div>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Enterprise</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</a>
            </nav>

            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 font-medium">Log in</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition-colors">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Professional working"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
              Connecting clients in need to freelancers who deliver
            </h1>

            {/* Tab Navigation */}
            <div className="flex bg-gray-800/50 rounded-lg p-1 mb-8 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('talent')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
                  activeTab === 'talent'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Find talent
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
                  activeTab === 'jobs'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Browse jobs
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by role, skills, or keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 px-6 pr-24 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="absolute right-2 top-2 bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>

            {/* Trusted by companies */}
            <div className="mt-12">
              <p className="text-gray-300 text-sm mb-4">Trusted by</p>
              <div className="flex items-center space-x-8">
                {trustedCompanies.map((company, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-400">
                    <span className="text-2xl">{company.logo}</span>
                    <span className="font-medium">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Up your work game section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="John T."
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">John T.</h3>
                    <p className="text-gray-600">Data Analyst</p>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-500">Top Rated Plus</span>
                    </div>
                  </div>
                  <button className="ml-auto px-4 py-2 border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-50">
                    Invite to job
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">$90k+</div>
                    <div className="text-sm text-gray-500">earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">33</div>
                    <div className="text-sm text-gray-500">jobs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">625</div>
                    <div className="text-sm text-gray-500">hours</div>
                  </div>
                </div>

                <div className="flex space-x-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Data Analysis</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">SQL</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  I am a data analyst and scientist with experience in...
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Play className="h-4 w-4 text-gray-400" />
                    <Pause className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-sm text-gray-500">Recent work</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Up your work game</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No cost to join</h3>
                    <p className="text-gray-600">Browse professionals, find pros projects, or even book a consultation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Post a job and hire top talent</h3>
                    <p className="text-gray-600">Finding talent doesn't have to be a chore. Post a job or we can search for you!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Afford to work with the best</h3>
                    <p className="text-gray-600">It's affordable to up your work game with low transaction rates on top talent.</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
                  Sign up for free
                </button>
                <button className="border border-green-600 text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-50 transition-colors">
                  Learn how to hire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by category */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by category</h2>
            <p className="text-gray-600">
              Looking for work? <a href="#" className="text-green-600 hover:underline">Browse jobs</a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    <Star className={`h-4 w-4 ${category.color} fill-current`} />
                    <span className="ml-1 text-sm font-medium text-gray-900">{category.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{category.skills}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Enterprise team"
                className="rounded-lg"
              />
            </div>
            <div>
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                FOR ENTERPRISE
              </div>
              <h2 className="text-4xl font-bold mb-6">This is how good teams are built</h2>
              <p className="text-gray-300 text-lg mb-8">
                Give your team the freedom to grow with access to the world's top talent.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;