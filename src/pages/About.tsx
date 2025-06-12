
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CheckCircle, Target, Eye, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About Global TradeWave</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A leading expert in the export-import business, known for our extensive experience 
              and in-depth understanding of international trade.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Global TradeWave is a leading expert in the export-import business, known for our extensive 
                experience and in-depth understanding of international trade. Over the years, we have become 
                a trusted partner for companies seeking to expand their global footprint.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our unparalleled expertise in navigating complex customs regulations, securing favorable 
                trade agreements, and optimizing supply chain logistics differentiates us from our competitors.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80" 
                alt="Team collaboration" 
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Empowering Farmers</h3>
              </div>
              <h4 className="text-lg font-semibold text-green-600 mb-2">Building a Sustainable Future</h4>
              <p className="text-gray-600">
                We work directly with farmers and agricultural communities to create sustainable 
                supply chains that benefit everyone in the ecosystem.
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Superior Quality</h3>
              </div>
              <h4 className="text-lg font-semibold text-blue-600 mb-2">Setting Industry Benchmarks</h4>
              <p className="text-gray-600">
                Our commitment to excellence ensures that we deliver only the finest products 
                that meet international quality standards.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do?</h2>
            <p className="text-xl text-gray-600 mb-12">
              Global TradeWave is dedicated to importing and exporting the finest products across the globe.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Partner</h3>
                <p className="text-gray-600">Your trusted partner for your sourcing needs</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unbeatable Value</h3>
                <p className="text-gray-600">Unbeatable pricing, quality and shipping services</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Supply Chain</h3>
                <p className="text-gray-600">Complete Agri Supply chain solutions</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthy Products</h3>
                <p className="text-gray-600">Healthy food for your good growth</p>
              </div>
            </div>
          </div>

          {/* Supply Chain Process */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Supply Chain Process</h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Our supply chain begins with meticulous sourcing, where we select high-quality raw materials 
              from trusted suppliers. This ensures that only the best inputs are used, setting a strong 
              foundation for the entire process.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sourcing</h3>
                <p className="text-gray-600">Meticulous selection of high-quality raw materials</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Check</h3>
                <p className="text-gray-600">Rigorous quality control at every stage</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Packing</h3>
                <p className="text-gray-600">Expert packaging for safe transportation</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Shipping</h3>
                <p className="text-gray-600">Reliable global shipping and logistics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
