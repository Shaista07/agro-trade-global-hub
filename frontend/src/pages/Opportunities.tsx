
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Package, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { sendOpportunityEmail } from '../utils/emailService';
import {Link} from "react-router-dom";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: 'Premium IR64 5% Broken Rice Export',
      description: 'Seeking partners for bulk export of premium Basmati rice to African markets',
      product: 'IR64 parboiled',
      quantity: '540 MT',
      location: 'Lome, Togo',
      deadline: '2025-08-15',
      status: 'Active',
      type: 'Export'
    },
    {
      id: 2,
      title: 'Raw Cashew Import Partnership',
      description: 'Looking for reliable suppliers of raw cashew nuts from West African regions',
      product: 'Raw Cashew Nuts',
      quantity: '216 MT',
      location: 'Mangalore (India)',
      deadline: '2025-08-15',
      status: 'Active',
      type: 'Import'
    },
    // {
    //   id: 3,
    //   title: 'Teak Wood Supply Contract',
    //   description: 'Long-term contract for sustainable teak wood supply to European furniture manufacturers',
    //   product: 'Teak Wood',
    //   quantity: '1000 Cubic Meters',
    //   location: 'Germany, Netherlands',
    //   deadline: '2024-02-10',
    //   status: 'Active',
    //   type: 'Export'
    // }
  ]);

  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    product: '',
    quantity: '',
    location: '',
    deadline: '',
    type: 'Export'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendOpportunityEmail(newOpportunity);
      
      const opportunity = {
        id: opportunities.length + 1,
        ...newOpportunity,
        status: 'Active'
      };
      
      setOpportunities([...opportunities, opportunity]);
      toast.success('Opportunity submitted successfully! We will review and contact you soon.');
      
      setNewOpportunity({
        title: '',
        description: '',
        product: '',
        quantity: '',
        location: '',
        deadline: '',
        type: 'Export'
      });
    } catch (error) {
      toast.error('Failed to submit opportunity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-lime/20 to-ocean/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Trade Opportunities</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore current trade opportunities and partnerships. Connect with global markets 
              and expand your business reach with Global TradeWave.
            </p>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Current Open Opportunities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={opportunity.type === 'Export' ? 'default' : 'secondary'} className="bg-ocean text-white">
                      {opportunity.type}
                    </Badge>
                    <Badge variant="outline" className="text-lime-dark border-lime-dark">
                      {opportunity.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Package className="w-4 h-4 mr-2" />
                      <span><strong>Product:</strong> {opportunity.product}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span><strong>Quantity:</strong> {opportunity.quantity}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span><strong>Location:</strong> {opportunity.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span><strong>Deadline:</strong> {opportunity.deadline}</span>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button className="w-full mt-6 bg-ocean hover:bg-ocean-light text-white">
                      Apply for Partnership
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Opportunity Form */}
         {/* <div className="bg-lime/5 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Trade Opportunity</h2>
            <p className="text-gray-600 mb-8">
              Have a new trade opportunity? Share it with our network of global partners.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opportunity Title *
                  </label>
                  <Input
                    type="text"
                    value={newOpportunity.title}
                    onChange={(e) => setNewOpportunity({...newOpportunity, title: e.target.value})}
                    placeholder="e.g., Premium Rice Export to Europe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={newOpportunity.type}
                    onChange={(e) => setNewOpportunity({...newOpportunity, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean"
                    required
                  >
                    <option value="Export">Export</option>
                    <option value="Import">Import</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product *
                  </label>
                  <Input
                    type="text"
                    value={newOpportunity.product}
                    onChange={(e) => setNewOpportunity({...newOpportunity, product: e.target.value})}
                    placeholder="e.g., Basmati Rice, Cashew Nuts"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <Input
                    type="text"
                    value={newOpportunity.quantity}
                    onChange={(e) => setNewOpportunity({...newOpportunity, quantity: e.target.value})}
                    placeholder="e.g., 500 MT, 1000 Cubic Meters"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Location *
                  </label>
                  <Input
                    type="text"
                    value={newOpportunity.location}
                    onChange={(e) => setNewOpportunity({...newOpportunity, location: e.target.value})}
                    placeholder="e.g., UAE, Germany, Nigeria"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline *
                  </label>
                  <Input
                    type="date"
                    value={newOpportunity.deadline}
                    onChange={(e) => setNewOpportunity({...newOpportunity, deadline: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  value={newOpportunity.description}
                  onChange={(e) => setNewOpportunity({...newOpportunity, description: e.target.value})}
                  placeholder="Provide detailed information about the trade opportunity..."
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-ocean hover:bg-ocean-light text-white px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Add Opportunity'}
              </Button>
            </form>
          </div>*/}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Opportunities;
