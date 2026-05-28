import { FaUtensils, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const footerLinks = {
  Company: ['About us', 'Careers', 'Press', 'Blog'],
  Help: ['FAQ', 'Contact support', 'Delivery info', 'Returns'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-3xl">
                <FaUtensils />
              </span>
              <span className="text-2xl font-extrabold tracking-tight">Foodiez</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs leading-relaxed">
              Your favorite food, delivered fast. The best local restaurants at your fingertips.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-bold text-white mb-4">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pb-10 border-b border-gray-800 mb-8">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <FaApple className="text-xl" />
            <span className="text-sm font-medium">App Store</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <FaGooglePlay className="text-sm" />
            <span className="text-sm font-medium">Google Play</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Foodiez. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
