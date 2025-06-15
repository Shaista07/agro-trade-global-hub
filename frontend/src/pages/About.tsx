
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {
  CheckCircle,
  Target,
  Heart,
  Users,
  Shield,
  Leaf,
  Star,
  ArrowRight,
  Tractor,
  Settings,
  Package, Warehouse, FileText, Ship, Handshake
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-lime/20 to-ocean/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold font-heading text-gray-900 mb-6">About Global TradeWave</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
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
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed font-body">
                Global TradeWave is a leading expert in the export-import business, known for our extensive 
                experience and in-depth understanding of international trade. Over the years, we have become 
                a trusted partner for companies seeking to expand their global footprint.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-body">
                Our unparalleled expertise in navigating complex customs regulations, securing favorable 
                trade agreements, and optimizing supply chain logistics differentiates us from our competitors.
              </p>
            </div>
            <div>
              <img 
                src="/Images/Our_Story.png?auto=format&fit=crop&q=80&w=800&h=600"
                alt="Containers loaded for exort"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-lime/10 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-ocean mr-3" />
                <h3 className="text-2xl font-bold font-heading text-gray-900">Empowering Farmers</h3>
              </div>
              <h4 className="text-lg font-semibold text-ocean mb-2 font-heading">Building a Sustainable Future</h4>
              <p className="text-gray-600 mb-4 font-body">
                We work directly with farmers and agricultural communities to create sustainable 
                supply chains that benefit everyone in the ecosystem.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-ocean mr-2" />
                  <span className="text-gray-600 font-body">Direct partnerships with 500+ farmers</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-ocean mr-2" />
                  <span className="text-gray-600 font-body">Promoting organic and sustainable farming practices</span>
                </div>
              </div>
            </div>
            
            <div className="bg-ocean/10 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-ocean mr-3" />
                <h3 className="text-2xl font-bold font-heading text-gray-900">Superior Quality</h3>
              </div>
              <h4 className="text-lg font-semibold text-ocean mb-2 font-heading">Setting Industry Benchmarks</h4>
              <p className="text-gray-600 mb-4 font-body">
                Our commitment to excellence ensures that we deliver only the finest products 
                that meet international quality standards.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-ocean mr-2" />
                  <span className="text-gray-600 font-body">Premium quality assurance protocols</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-ocean mr-2" />
                  <span className="text-gray-600 font-body">99.8% customer satisfaction rate globally</span>
                </div>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">What We Do?</h2>
            <p className="text-xl text-gray-600 mb-12 font-body">
              Global TradeWave is dedicated to importing and exporting the finest products across the globe.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">Trusted Partner</h3>
                <p className="text-gray-600 font-body">Your trusted partner for your sourcing needs</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">Unbeatable Value</h3>
                <p className="text-gray-600 font-body">Unbeatable pricing, quality and shipping services</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">Complete Supply Chain</h3>
                <p className="text-gray-600 font-body">Complete Agri Supply chain solutions</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">Healthy Products</h3>
                <p className="text-gray-600 font-body">Healthy food for your good growth</p>
              </div>
            </div>
          </div>

          {/* Supply Chain Process */}
          <div className="bg-lime/5 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold font-heading text-gray-900 text-center mb-8">Our Supply Chain Process</h2>
            <p className="text-lg text-gray-600 text-center mb-12 font-body">
              Our supply chain begins with meticulous sourcing, where we select high-quality raw materials 
              from trusted suppliers. This ensures that only the best inputs are used, setting a strong 
              foundation for the entire process.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="bg-ocean w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl font-heading">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-ocean font-heading">Sourcing</h3>
                <p className="text-gray-600 mb-4 font-body">Meticulous selection of high-quality raw materials from certified suppliers worldwide</p>
                <div className="hidden md:block absolute top-10 -right-4 text-ocean">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="text-center relative">
                <div className="bg-lime w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-ocean font-bold text-2xl font-heading">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-ocean font-heading">Quality Check</h3>
                <p className="text-gray-600 mb-4 font-body">Rigorous quality control testing at certified laboratories and inspection facilities</p>
                <div className="hidden md:block absolute top-10 -right-4 text-ocean">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="text-center relative">
                <div className="bg-ocean w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl font-heading">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-ocean font-heading">Packing</h3>
                <p className="text-gray-600 mb-4 font-body">Expert packaging using food-grade materials ensuring product integrity during transit</p>
                <div className="hidden md:block absolute top-10 -right-4 text-ocean">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-lime w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-ocean font-bold text-2xl font-heading">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-ocean font-heading">Shipping</h3>
                <p className="text-gray-600 font-body">Reliable global shipping with real-time tracking and insurance coverage</p>
              </div>
            </div>
            
            {/* Process Flow Visualization */}
            <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-center mb-6 text-ocean font-heading">End-to-End Supply Chain Flow</h4>
              <div className="flex flex-wrap justify-center items-center gap-6 text-center">
                {/* Step: Farmer/Supplier */}
                <div className="flex flex-col items-center">
                  <div className="bg-ocean/10 p-4 rounded-full">
                    <Tractor className="w-8 h-8 text-green-700" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">Farmer/Supplier</span>
                </div>

                <ArrowRight className="h-5 w-5 text-ocean" />

                {/* Step: Quality Testing */}
                <div className="flex flex-col items-center">
                  <div className="bg-lime/30 p-4 rounded-full">
                    <CheckCircle className="w-8 h-8 text-lime-600" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">Quality Testing</span>
                </div>

                <ArrowRight className="h-5 w-5 text-ocean" />

                {/* Step: Processing */}
                <div className="flex flex-col items-center">
                  <div className="bg-ocean/10 p-4 rounded-full">
                    <Settings className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">Processing</span>
                </div>

                <ArrowRight className="h-5 w-5 text-ocean" />

                {/* Step: Packaging */}
                <div className="flex flex-col items-center">
                  <div className="bg-lime/30 p-4 rounded-full">
                    <Package className="w-8 h-8 text-yellow-600" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">Packaging</span>
                </div>

                <ArrowRight className="h-5 w-5 text-ocean" />

                {/* Step: Warehousing */}
                <div className="flex flex-col items-center">
                  <div className="bg-ocean/10 p-4 rounded-full">
                    <Warehouse className="w-8 h-8 text-indigo-600" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">Warehousing</span>
                </div>

                <ArrowRight className="h-5 w-5 text-ocean" />

                {/* Step: Export Documentation */}
                <div className="flex flex-col items-center">
                  <div className="bg-lime/30 p-4 rounded-full">
                    <FileText className="w-8 h-8 text-gray-700" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">Export Documentation</span>
                </div>

                <ArrowRight className="h-5 w-5 text-ocean" />

                {/* Step: International Shipping */}
                <div className="flex flex-col items-center">
                  <div className="bg-ocean/10 p-4 rounded-full">
                    <Ship className="w-8 h-8 text-sky-600" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">International Shipping</span>
                </div>

                <ArrowRight className="h-5 w-5 text-ocean" />

                {/* Step: Customer Delivery */}
                <div className="flex flex-col items-center">
                  <div className="bg-lime/30 p-4 rounded-full">
                    <Handshake className="w-8 h-8 text-orange-600" />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">Customer Delivery</span>
                </div>
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
