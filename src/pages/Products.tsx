
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Rice Varieties',
      description: 'High-quality rice varieties sourced from the finest paddy fields',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
      varieties: [
        'IR64 Parboiled Rice - Premium long-grain variety with excellent cooking quality',
        'Swarna Rice - Aromatic medium-grain rice perfect for daily consumption',
        'Sona Masoori Rice - Light and fluffy texture, ideal for South Indian cuisine',
        'All Types of Basmati Rice - Fragrant long-grain rice with distinctive aroma'
      ]
    },
    {
      id: 2,
      name: 'Raw Cashew Nuts',
      description: 'Premium quality raw cashew nuts sourced directly from certified plantations',
      image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&q=80&w=800&h=600',
      varieties: [
        'Grade W-180 - Large, whole cashews with premium quality',
        'Grade W-210 - Medium-sized whole cashews for commercial use',
        'Grade W-240 - Standard whole cashews with excellent taste',
        'Cashew Splits - Cost-effective option for food processing'
      ]
    },
    {
      id: 3,
      name: 'Teak Wood',
      description: 'Sustainably sourced premium teak wood for construction and furniture',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80',
      varieties: [
        'Premium Grade Teak - High-quality wood for luxury furniture',
        'Construction Grade Teak - Durable timber for building applications',
        'Marine Grade Teak - Weather-resistant wood for marine applications',
        'Plantation Teak - Sustainably grown timber with certification'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-body">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-lime/20 to-ocean/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold font-heading text-gray-900 mb-6">Our Premium Products</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
              Discover our carefully curated selection of premium agricultural products and materials, 
              sourced from the finest suppliers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-cols-2' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                  />
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold font-heading text-gray-900 mb-4">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-lg text-gray-600 font-body">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-xl font-semibold font-heading text-gray-900 mb-4">Available Varieties:</h4>
                      <ul className="space-y-3">
                        {product.varieties.map((variety, varIndex) => (
                          <li key={varIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-ocean rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 font-body">{variety}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-lime/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">Quality Assurance</h2>
            <p className="text-xl text-gray-600 font-body">
              Every product undergoes rigorous quality control to meet international standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-lime/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-ocean font-bold text-2xl font-heading">✓</span>
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2">Certified Sources</h3>
              <p className="text-gray-600 font-body">All products sourced from certified and trusted suppliers</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-ocean/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-ocean font-bold text-2xl font-heading">✓</span>
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2">Lab Tested</h3>
              <p className="text-gray-600 font-body">Comprehensive laboratory testing for quality and purity</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-lime/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-ocean font-bold text-2xl font-heading">✓</span>
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2">International Standards</h3>
              <p className="text-gray-600 font-body">Compliant with global quality and safety standards</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
