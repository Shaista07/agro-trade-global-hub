
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ocean text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-lime mb-4">
              Global TradeWave
            </h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner in international trade, specializing in premium agricultural products and sustainable supply chain solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-lime-500 transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-lime transition-colors">Products</Link></li>
              <li><Link to="/opportunities" className="text-gray-300 hover:text-lime transition-colors">Trade Opportunities</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-lime transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-lime mr-3" />
                <span className="text-gray-300">+91 8808253244</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-lime mr-3" />
                <span className="text-gray-300">info@globaltradewave.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-lime mr-3" />
                <span className="text-gray-300">Ayodhya, UP, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Global Agro TradeWave Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
