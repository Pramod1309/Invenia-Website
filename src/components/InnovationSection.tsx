import { useState } from "react";
import { TrendingUp, Shield, Zap, Target, Sparkles, ChevronRight, CheckCircle } from "lucide-react";

interface Innovation {
  id: number;
  icon: JSX.Element;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  stat: string;
  color: string;
}

const innovations: Innovation[] = [
  {
    id: 1,
    icon: <TrendingUp className="h-10 w-10" />,
    title: "AI-Powered Analytics",
    shortDesc: "Machine learning for predictive insights",
    fullDesc: "Transform raw enterprise data into actionable intelligence using advanced machine learning models. Achieve faster, smarter, and more accurate decisions at scale with our AI-driven analytics platform.",
    features: [
      "Predictive analytics with 95% accuracy",
      "Automated anomaly detection",
      "Real-time decision support",
      "Natural language query processing",
      "Custom ML model development",
    ],
    stat: "40% improvement in decision accuracy",
    color: "blue"
  },
  {
    id: 2,
    icon: <Shield className="h-10 w-10" />,
    title: "Enterprise Security",
    shortDesc: "Advanced security protocols",
    fullDesc: "Enterprise-grade security architecture combining AI-driven threat detection, zero-trust principles, and continuous compliance monitoring to protect critical business systems and data.",
    features: [
      "Zero-trust architecture implementation",
      "AI-driven threat detection",
      "Automated compliance monitoring",
      "End-to-end encryption",
      "24/7 security operations center",
    ],
    stat: "99.99% threat detection accuracy",
    color: "green"
  },
  {
    id: 3,
    icon: <Zap className="h-10 w-10" />,
    title: "Real-time Processing",
    shortDesc: "Lightning-fast data processing",
    fullDesc: "In-memory computing capabilities that deliver sub-second response times for complex queries. Handle millions of transactions per second with nanosecond latency.",
    features: [
      "Sub-second query response times",
      "In-memory columnar storage",
      "Parallel processing architecture",
      "Real-time data streaming",
      "Automated performance tuning",
    ],
    stat: "100x faster than traditional systems",
    color: "yellow"
  },
  {
    id: 4,
    icon: <Target className="h-10 w-10" />,
    title: "Precision Implementation",
    shortDesc: "Surgical precision in execution",
    fullDesc: "Our precision implementation methodology minimizes disruption while maximizing ROI. Using agile sprints and predictive planning, we deliver projects faster with zero business disruption.",
    features: [
      "Zero-disruption implementation",
      "Predictive project planning",
      "Automated testing suite",
      "Change management integration",
      "Real-time progress tracking",
    ],
    stat: "30% faster implementation",
    color: "purple"
  },
];

const InnovationSection = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const active = innovations.find((i) => i.id === selectedId);

  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      border: "border-blue-500/30",
      iconBg: "bg-gradient-to-br from-blue-600 to-cyan-600",
      statBg: "bg-blue-600/20",
      text: "text-blue-400"
    },
    green: {
      bg: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      border: "border-green-500/30",
      iconBg: "bg-gradient-to-br from-green-600 to-emerald-600",
      statBg: "bg-green-600/20",
      text: "text-green-400"
    },
    yellow: {
      bg: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10",
      border: "border-yellow-500/30",
      iconBg: "bg-gradient-to-br from-yellow-600 to-amber-600",
      statBg: "bg-yellow-600/20",
      text: "text-yellow-400"
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-500/10 to-violet-500/10",
      border: "border-purple-500/30",
      iconBg: "bg-gradient-to-br from-purple-600 to-violet-600",
      statBg: "bg-purple-600/20",
      text: "text-purple-400"
    },
  };

  const activeColor = active ? colorClasses[active.color as keyof typeof colorClasses] : colorClasses.blue;

  const handleSelect = (id: number) => {
    if (id === selectedId) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedId(id);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6 animate-float">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            Innovation at Scale
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Pioneering the future of enterprise technology with cutting-edge solutions
          </p>
        </div>

        {/* MAIN CONTENT - TWO COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN - INNOVATION CARDS */}
          <div className="space-y-6">
            {innovations.map((item) => {
              const itemColor = colorClasses[item.color as keyof typeof colorClasses];
              const isActive = item.id === selectedId;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full text-left transition-all duration-500 ${
                    isActive ? 'transform -translate-y-2' : 'hover:-translate-y-1'
                  }`}
                >
                  <div className={`
                    relative overflow-hidden rounded-2xl p-6 border-2 backdrop-blur-sm
                    ${isActive ? activeColor.bg + ' ' + activeColor.border + ' shadow-2xl' : 'bg-white/5 border-white/10'}
                    transition-all duration-500
                  `}>
                    {/* Glow effect for active item */}
                    {isActive && (
                      <div className={`absolute -inset-1 ${activeColor.bg.replace('bg-', 'bg-').replace('/10', '/20')} blur-xl -z-10`} />
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500
                        ${isActive ? activeColor.iconBg + ' scale-110' : itemColor.iconBg + ' opacity-80'}
                      `}>
                        <div className={isActive ? 'text-white' : itemColor.text}>
                          {item.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-xl font-bold transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-blue-100'
                          }`}>
                            {item.title}
                          </h3>
                          <ChevronRight className={`h-5 w-5 transition-all duration-300 ${
                            isActive ? 'text-cyan-400 rotate-90' : 'text-blue-400'
                          }`} />
                        </div>
                        <p className={`text-sm transition-colors duration-300 ${
                          isActive ? 'text-cyan-200' : 'text-blue-300'
                        }`}>
                          {item.shortDesc}
                        </p>
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN - DETAILED CONTENT */}
          <div className={`
            relative rounded-3xl p-8 backdrop-blur-lg border transition-all duration-500
            ${activeColor.bg} ${activeColor.border}
            ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
          `}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl" />
            </div>

            {active && (
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${activeColor.iconBg} rounded-xl flex items-center justify-center animate-pulse-glow`}>
                    <div className="text-white">
                      {active.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {active.title}
                    </h3>
                    <p className={`${activeColor.text} font-medium`}>
                      {active.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Overview</h4>
                  <p className="text-blue-100 leading-relaxed">
                    {active.fullDesc}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {active.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 animate-fade-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <CheckCircle className={`h-5 w-5 ${activeColor.text} flex-shrink-0 mt-0.5`} />
                        <span className="text-blue-100 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stat Card */}
                <div className={`${activeColor.statBg} rounded-xl p-6 border ${activeColor.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Performance Impact</h4>
                      <p className="text-blue-100 text-sm">Average improvement across implementations</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${activeColor.text} mb-1`}>
                        {active.stat}
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`h-5 w-5 ${activeColor.text}`} />
                        <span className="text-sm text-blue-200">Verified Results</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-2 pt-4">
                  {innovations.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        item.id === selectedId 
                          ? `${activeColor.bg.replace('bg-', 'bg-').replace('/10', '')} w-8` 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STATS BAR */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Projects Delivered", value: "500+", color: "blue" },
            { label: "Client Satisfaction", value: "98%", color: "green" },
            { label: "Implementation Speed", value: "30% Faster", color: "yellow" },
            { label: "System Uptime", value: "99.99%", color: "purple" },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`text-3xl font-bold mb-2 ${colorClasses[stat.color as keyof typeof colorClasses].text}`}>
                {stat.value}
              </div>
              <div className="text-blue-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;