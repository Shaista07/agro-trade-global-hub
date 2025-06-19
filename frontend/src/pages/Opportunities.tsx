import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {Calendar, MapPin, Package, ShieldCheck, Trash2, TrendingUp} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createOpportunity, getOpportunities, updateOpportunityStatus, deleteOpportunity as deleteOpportunityAPI } from '../utils/backendService.ts';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Link, useLocation } from 'react-router-dom';

const ADMIN_USERNAME = 's_aiman';
const ADMIN_PASSWORD = 'shaista123';

const Opportunities = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin-opportunities';

  const [authenticated, setAuthenticated] = useState(false);
  const [opportunities, setOpportunities] = useState([]);

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
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    if (isAdmin) {
      setShowLogin(true);
    }
  }, [isAdmin]);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setShowLogin(false);
    } else {
      alert('Unauthorized');
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const fetchWithRetry = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
      for (let i = 0; i < retries; i++) {
        try {
          const data = await getOpportunities();
          setOpportunities(data);
          return;
        } catch (error) {
          if (i === retries - 1) {
            toast.error('Failed to load opportunities');
          } else {
            await new Promise(res => setTimeout(res, delay));
          }
        } finally {
          if (i === retries - 1) {
            setIsLoading(false);
          }
        }
      }
    };
    fetchWithRetry();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createOpportunity(newOpportunity);
      setOpportunities([...opportunities, response]);
      toast.success('Opportunity submitted successfully!');
      setNewOpportunity({
        title: '',
        description: '',
        product: '',
        quantity: '',
        location: '',
        deadline: '',
        type: 'Export'
      });
    } catch {
      toast.error('Failed to submit opportunity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteOpportunity = async (id) => {
    try {
      await deleteOpportunityAPI(id);
      setOpportunities(opportunities.filter(o => o.id !== id));
      toast.success('Opportunity deleted.');
    } catch {
      toast.error('Delete failed');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      await updateOpportunityStatus(id, newStatus);
      setOpportunities(
          opportunities.map(o => o.id === id ? { ...o, status: newStatus } : o)
      );
    } catch {
      toast.error('Status update failed');
    }
  };

  return (
      <div className="min-h-screen bg-white">
        {showLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
                <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2" />
                <Button onClick={handleLogin} className="mt-4 bg-ocean text-white w-full">Login</Button>
              </div>
            </div>
        )}
        <Navigation />

        <section className="pt-16 bg-gradient-to-br from-lime/20 to-ocean/10">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Trade Opportunities</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore and manage global trade opportunities.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Current Open Opportunities</h2>
            {isLoading ? (
                <div className="text-center py-10">
                  <svg className="animate-spin h-8 w-8 text-ocean mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <p className="text-gray-600">Loading opportunities...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
                  {opportunities.map((op) => (
                      <Card key={op.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge className="bg-ocean text-white">{op.type}</Badge>
                            <Badge variant="outline" className="text-lime-dark border-lime-dark">{op.status}</Badge>
                          </div>
                          <CardTitle className="text-xl font-bold">{op.title}</CardTitle>
                          <CardDescription>{op.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p><Package className="w-4 h-4 inline-block mr-1" /><strong>Product:</strong> {op.product}</p>
                            <p><TrendingUp className="w-4 h-4 inline-block mr-1" /><strong>Quantity:</strong> {op.quantity}</p>
                            <p><MapPin className="w-4 h-4 inline-block mr-1" /><strong>Location:</strong> {op.location}</p>
                            <p><Calendar className="w-4 h-4 inline-block mr-1" /><strong>Deadline:</strong> {op.deadline.toISOString().split('T')[0]}</p>
                          </div>

                          {isAdmin && authenticated ? (
                              <div className="flex gap-2 mt-4">
                                <Button variant="destructive" onClick={() => deleteOpportunity(op.id)}><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
                                <Button variant="secondary" onClick={() => toggleStatus(op.id, op.status)}>
                                  <ShieldCheck className="w-4 h-4 mr-1" />
                                  {op.status === 'Active' ? 'Mark Inactive' : 'Mark Active'}
                                </Button>
                              </div>
                          ) : (
                              <Link to="/contact">
                                <Button className="w-full mt-6 bg-ocean text-white">Apply for Partnership</Button>
                              </Link>
                          )}
                        </CardContent>
                      </Card>
                  ))}
                </div>
            )}
            {isAdmin && authenticated && (
                <div className="bg-lime/5 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Trade Opportunity</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input required value={newOpportunity.title} onChange={e => setNewOpportunity({ ...newOpportunity, title: e.target.value })} placeholder="Title *" />
                      <select
                          value={newOpportunity.type}
                          onChange={(e) => setNewOpportunity({...newOpportunity, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean"
                          required
                      >
                        <option value="Export">Export</option>
                        <option value="Import">Import</option>
                      </select>
                      <Input required value={newOpportunity.product} onChange={e => setNewOpportunity({ ...newOpportunity, product: e.target.value })} placeholder="Product *" />
                      <Input required value={newOpportunity.quantity} onChange={e => setNewOpportunity({ ...newOpportunity, quantity: e.target.value })} placeholder="Quantity *" />
                      <Input required value={newOpportunity.location} onChange={e => setNewOpportunity({ ...newOpportunity, location: e.target.value })} placeholder="Location *" />
                      <Input type="date" required value={newOpportunity.deadline} onChange={e => setNewOpportunity({ ...newOpportunity, deadline: e.target.value })} />
                    </div>
                    <Textarea rows={4} required value={newOpportunity.description} onChange={e => setNewOpportunity({ ...newOpportunity, description: e.target.value })} placeholder="Opportunity description..." />
                    <Button type="submit" disabled={isSubmitting} className="bg-ocean text-white">
                      {isSubmitting ? 'Submitting...' : 'Add Opportunity'}
                    </Button>
                  </form>
                </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
  );
};

export default Opportunities;
