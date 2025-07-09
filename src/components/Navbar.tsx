import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  User, 
  Menu, 
  Trophy, 
  BookOpen, 
  BarChart3,
  LogIn,
  UserPlus
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CodeLabs</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#practice" className="text-foreground hover:text-primary transition-colors">
              Practice
            </a>
            <a href="#leaderboard" className="text-foreground hover:text-primary transition-colors">
              Leaderboard
            </a>
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button variant="default" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <a href="#practice" className="flex items-center text-foreground hover:text-primary transition-colors py-2">
                <BookOpen className="w-4 h-4 mr-3" />
                Practice
              </a>
              <a href="#leaderboard" className="flex items-center text-foreground hover:text-primary transition-colors py-2">
                <Trophy className="w-4 h-4 mr-3" />
                Leaderboard
              </a>
              <a href="#dashboard" className="flex items-center text-foreground hover:text-primary transition-colors py-2">
                <BarChart3 className="w-4 h-4 mr-3" />
                Dashboard
              </a>
              <a href="#about" className="flex items-center text-foreground hover:text-primary transition-colors py-2">
                <User className="w-4 h-4 mr-3" />
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="justify-start">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button variant="default" size="sm" className="justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;