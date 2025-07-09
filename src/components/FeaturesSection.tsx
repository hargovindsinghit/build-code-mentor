import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Zap, 
  Trophy, 
  Users, 
  BookOpen, 
  BarChart3,
  Target,
  Rocket,
  Shield,
  Monitor
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Interactive Code Editor",
    description: "Write and test code with syntax highlighting, auto-completion, and real-time execution.",
    badge: "Live Coding",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "Run your code instantly and see results in real-time with our powerful compiler API.",
    badge: "Fast",
    color: "text-accent"
  },
  {
    icon: Trophy,
    title: "Competitive Leaderboard",
    description: "Compete with developers worldwide and climb the ranks by solving challenging problems.",
    badge: "Gamified",
    color: "text-warning"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands of developers learning together and sharing knowledge.",
    badge: "10K+ Users",
    color: "text-secondary"
  },
  {
    icon: BookOpen,
    title: "Structured Learning",
    description: "Progress through carefully curated challenges from beginner to advanced levels.",
    badge: "500+ Problems",
    color: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your coding journey with detailed analytics and achievement tracking.",
    badge: "Analytics",
    color: "text-secondary"
  },
  {
    icon: Target,
    title: "Multiple Languages",
    description: "Practice in Python, JavaScript, Java, C++, and more programming languages.",
    badge: "5+ Languages",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "Code safely in our sandboxed environment with enterprise-grade security.",
    badge: "Secure",
    color: "text-success"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Excel in Coding
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and features designed to accelerate your programming journey
            from beginner to expert level.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <Monitor className="w-5 h-5" />
            <span>Available on all devices - Desktop, Tablet, and Mobile</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;