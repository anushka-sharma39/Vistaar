import { Link } from "react-router-dom";
import { Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import Logo from "../ui/Logo";

export default function PublicFooter() {
  return (
    <footer className="bg-ink-900 text-ink-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Logo dark size="sm" />
          <p className="text-sm text-ink-300 mt-4 max-w-xs leading-relaxed">
            A centralized digital platform for learning, training, competency development and organizational capacity building.
          </p>
          <div className="flex gap-3 mt-5">
            {[Globe, Mail, MessageCircle, Share2].map((Icon, i) => (
              <a key={i} href="#" className="focus-ring w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Social link">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Quick Links</p>
          <ul className="space-y-2.5 text-sm text-ink-300">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
            <li><Link to="/trainers" className="hover:text-white transition-colors">Trainers</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Resources</p>
          <ul className="space-y-2.5 text-sm text-ink-300">
            <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-ink-300">
            <li>support@vistaar.gov</li>
            <li>+91 11 4567 8900</li>
            <li>New Delhi, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>© 2026 Vistaar. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
