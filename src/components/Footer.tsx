import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Github, 
  Twitter, 
  MessageCircle, 
  Mail,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CodeLabs</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Empowering developers worldwide through hands-on coding practice 
              and competitive programming challenges.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Practice</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Challenges</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Leaderboard</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Certificates</a></li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold mb-3">Languages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Python</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">JavaScript</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Java</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">C++</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Go</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for developers worldwide</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-muted-foreground">
          © 2024 CodeLabs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;