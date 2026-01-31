import { useState } from "react";
import { TrendingUp, Shield, Zap, Target, Sparkles } from "lucide-react";
import InnovationItem from "./InnovationItem";

interface Innovation {
  id: number;
  icon: JSX.Element;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  stat: string;
}

const innovations: Innovation[] = [
  {
    id: 1,
    icon: <TrendingUp className="h-12 w-12 text-blue-400" />,
    title: "AI-Powered Analytics",
    shortDesc: "Leveraging machine learning for predictive insights",
    fullDesc:
      "Our AI-powered analytics platform transforms raw enterprise data into actionable intelligence using advanced machine learning models. Organizations achieve faster, smarter, and more accurate decisions at scale.",
    features: [
      "Predictive analytics with 95% accuracy",
      "Automated anomaly detection",
      "Real-time decision support",
      "Natural language query processing",
      "Custom ML model development",
    ],
    stat: "40% improvement in decision accuracy",
  },
  {
    id: 2,
    icon: <Shield className="h-12 w-12 text-green-400" />,
    title: "Enterprise Security",
    shortDesc: "Advanced security protocols and compliance",
    fullDesc:
      "Enterprise-grade security architecture combining AI-driven threat detection, zero-trust principles, and continuous compliance monitoring to protect critical business systems.",
    features: [
      "Zero-trust architecture",
      "AI-driven threat detection",
      "Automated compliance checks",
      "End-to-end encryption",
      "24/7 security monitoring",
    ],
    stat: "99.99% threat detection accuracy",
  },
  {
    id: 3,
    icon: <Zap className="h-12 w-12 text-yellow-400" />,
    title: "Real-time Processing",
    shortDesc: "Lightning-fast in-memory computing",
    fullDesc:
      "Our real-time processing engine delivers sub-second responses for mission-critical workloads, enabling instant insights and high-volume transaction handling.",
    features: [
      "Sub-second response time",
      "In-memory processing",
      "Parallel execution engine",
      "Real-time data streaming",
    ],
    stat: "100x faster processing",
  },
  {
    id: 4,
    icon: <Target className="h-12 w-12 text-purple-400" />,
    title: "Precision Implementation",
    shortDesc: "Surgical precision in execution",
    fullDesc:
      "Our precision-driven delivery model ensures faster implementations with zero business disruption, backed by predictive planning and automated quality checks.",
    features: [
      "Zero-disruption rollout",
      "Agile delivery model",
      "Automated testing",
      "Predictive project tracking",
    ],
    stat: "30% faster implementation",
  },
];

const InnovationSection = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const active = innovations.find((i) => i.id === selectedId);

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Innovation at Scale
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We don’t just implement SAP — we engineer the future of enterprise systems.
          </p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-12 gap-12 items-center">

          {/* LEFT – ORBIT */}
          <div className="col-span-12 lg:col-span-5 relative h-[520px]">
            {innovations.map((item, index) => (
              <InnovationItem
                key={item.id}
                item={item}
                index={index}
                totalItems={innovations.length}
                isSelected={selectedId === item.id}
                onSelect={() =>
                  setSelectedId(selectedId === item.id ? null : item.id)
                }
              />
            ))}
          </div>

          {/* RIGHT – CONTENT */}
          <div className="col-span-12 lg:col-span-7">
            {active ? (
              <div className="animate-fade-in bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {active.title}
                </h3>

                <p className="text-blue-100 mb-6">
                  {active.fullDesc}
                </p>

                <ul className="space-y-2 mb-6">
                  {active.features.map((feature, idx) => (
                    <li key={idx} className="text-blue-200">
                      • {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 bg-blue-600/20 p-4 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <span className="text-white font-semibold">
                    {active.stat}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center text-blue-100 animate-fade-in">
                <Sparkles className="h-10 w-10 mx-auto mb-4" />
                <p>Select an innovation to explore details</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
