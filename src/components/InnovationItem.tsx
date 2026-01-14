// components/InnovationItem.tsx
import { useState, useEffect } from 'react';

interface InnovationItemProps {
  item: {
    id: number;
    icon: JSX.Element;
    title: string;
    shortDesc: string;
    fullDesc: string;
    features: string[];
    stat: string;
  };
  index: number;
  totalItems: number;
  isSelected: boolean;
  onSelect: () => void;
}

const InnovationItem = ({ item, index, totalItems, isSelected, onSelect }: InnovationItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Staggered entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  // Calculate circular position
  const radius = 200;
  const angle = (index * (360 / totalItems)) * (Math.PI / 180);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  
  // Get icon color based on icon type
  const getIconColor = () => {
    const className = item.icon.props.className || '';
    if (className.includes('text-blue-400')) return 'blue';
    if (className.includes('text-green-400')) return 'green';
    if (className.includes('text-yellow-400')) return 'yellow';
    if (className.includes('text-purple-400')) return 'purple';
    return 'blue';
  };
  
  const iconColor = getIconColor();
  
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-600/30 to-cyan-600/30 border-blue-400 shadow-blue-500/30 from-blue-600/0 to-cyan-600/0 from-blue-600/10 to-cyan-600/10',
    green: 'from-green-600/30 to-cyan-600/30 border-green-400 shadow-green-500/30 from-green-600/0 to-cyan-600/0 from-green-600/10 to-cyan-600/10',
    yellow: 'from-yellow-600/30 to-cyan-600/30 border-yellow-400 shadow-yellow-500/30 from-yellow-600/0 to-cyan-600/0 from-yellow-600/10 to-cyan-600/10',
    purple: 'from-purple-600/30 to-cyan-600/30 border-purple-400 shadow-purple-500/30 from-purple-600/0 to-cyan-600/0 from-purple-600/10 to-cyan-600/10'
  };
  
  const selectedColorClass = colorClasses[iconColor] || colorClasses.blue;
  const [fromColor, toColor, borderColor, shadowColor, fromColorZero, toColorZero, fromColorHover, toColorHover] = selectedColorClass.split(' ');

  return (
    <div
      className={`innovation-item absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${isSelected ? 'z-50' : 'z-10'}`}
      style={{
        transform: isSelected 
          ? 'translateX(-200px) translateY(0)' 
          : `translateX(${x}px) translateY(${y}px)`,
        transition: isSelected 
          ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), all 0.3s ease' 
          : 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), all 0.3s ease'
      }}
    >
      <button
        onClick={onSelect}
        className={`relative group transition-all duration-300 ${
          isSelected ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Orbital ring animation */}
        <div className={`absolute -inset-4 rounded-full ${
          isSelected 
            ? `bg-gradient-to-r ${fromColor} ${toColor} animate-pulse` 
            : `bg-gradient-to-r ${fromColor.split('/30')[0]}/10 ${toColor.split('/30')[0]}/10`
        }`}></div>
        
        {/* Main card */}
        <div className={`relative backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
          isSelected
            ? `bg-white/20 ${borderColor} shadow-2xl ${shadowColor}`
            : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'
        }`}>
          <div className="flex flex-col items-center text-center">
            <div className={`mb-4 transition-transform duration-300 ${
              isSelected ? 'scale-125' : 'group-hover:scale-110'
            }`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-blue-100 text-sm max-w-[200px]">{item.shortDesc}</p>
            
            {/* Selection indicator */}
            {isSelected && (
              <div className="mt-4 flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-cyan-300 text-sm font-medium">Selected</span>
              </div>
            )}
          </div>
          
          {/* Hover effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${fromColorZero} ${toColorZero} group-hover:${fromColorHover} group-hover:${toColorHover} transition-all duration-300`}></div>
        </div>
      </button>
    </div>
  );
};

export default InnovationItem;