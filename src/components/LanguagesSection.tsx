import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, ArrowRight } from "lucide-react";

const languages = [
  {
    name: "Python",
    icon: "🐍",
    description: "Perfect for beginners with clean syntax",
    problemCount: 150,
    difficulty: "Beginner Friendly",
    color: "bg-gradient-to-br from-green-500/20 to-blue-500/20"
  },
  {
    name: "JavaScript",
    icon: "💛",
    description: "Essential for web development",
    problemCount: 120,
    difficulty: "Versatile",
    color: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
  },
  {
    name: "Java",
    icon: "☕",
    description: "Object-oriented programming mastery",
    problemCount: 100,
    difficulty: "Structured",
    color: "bg-gradient-to-br from-red-500/20 to-orange-500/20"
  },
  {
    name: "C++",
    icon: "⚡",
    description: "High-performance system programming",
    problemCount: 90,
    difficulty: "Advanced",
    color: "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
  },
  {
    name: "Go",
    icon: "🔷",
    description: "Modern concurrent programming",
    problemCount: 60,
    difficulty: "Modern",
    color: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
  }
];

const LanguagesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Code2 className="w-4 h-4 mr-2" />
            Programming Languages
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Master{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Multiple Languages
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from popular programming languages and practice with 
            real-world coding challenges tailored to each language's strengths.
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {languages.map((language, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border overflow-hidden ${language.color}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-2">{language.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {language.problemCount} problems
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {language.name}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {language.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {language.difficulty}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="group/btn opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Start Coding
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Total Challenges</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">5</div>
              <div className="text-muted-foreground">Programming Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Code Execution</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;