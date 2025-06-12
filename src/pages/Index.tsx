
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Award, Truck, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-lime/20 to-ocean/10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in 
                <span className="text-ocean block">International Trade</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Global TradeWave connects businesses worldwide through premium agricultural products, 
                expert logistics, and unparalleled trade expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button className="bg-ocean hover:bg-ocean-light text-white px-8 py-3 text-lg">
                    Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-ocean text-ocean hover:bg-lime/10 px-8 py-3 text-lg">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1518844135666-9c2c4b0c3c70?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Rice grains, cashew nuts and teakwood" 
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-lime/30 p-3 rounded-full">
                    <Globe className="h-8 w-8 text-ocean" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">10+</p>
                    <p className="text-gray-600">Countries Served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Global TradeWave?</h2>
            <p className="text-xl text-gray-600">Excellence in every aspect of international trade</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-lime/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Quality</h3>
              <p className="text-gray-600">Premium products with rigorous quality control at every step</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-ocean/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Extensive network spanning across 10+ countries worldwide</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-lime/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Logistics</h3>
              <p className="text-gray-600">Seamless supply chain management and timely delivery</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-ocean/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated team with decades of trade expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Expand Your Global Trade?</h2>
          <p className="text-xl text-lime/80 mb-8">
            Join thousands of satisfied clients who trust Global TradeWave for their international trade needs
          </p>
          <Link to="/opportunities">
            <Button className="bg-lime text-ocean hover:bg-lime/90 px-8 py-3 text-lg font-semibold">
              Explore Trade Opportunities
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
