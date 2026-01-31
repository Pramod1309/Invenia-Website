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

const InnovationItem = ({
  item,
  index,
  totalItems,
  isSelected,
  onSelect,
}: InnovationItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  /* ---------------- ORBIT POSITION ---------------- */
  const radius = 200;
  const angle = (index * (360 / totalItems)) * (Math.PI / 180);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  /* ---------------- ICON COLOR ---------------- */
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
    blue: 'from-blue-600/30 to-cyan-600/30 border-blue-400 shadow-blue-500/40',
    green: 'from-green-600/30 to-cyan-600/30 border-green-400 shadow-green-500/40',
    yellow: 'from-yellow-600/30 to-cyan-600/30 border-yellow-400 shadow-yellow-500/40',
    purple: 'from-purple-600/30 to-cyan-600/30 border-purple-400 shadow-purple-500/40',
  };

  const selectedColorClass = colorClasses[iconColor];

  return (
    <div
      className={`innovation-item absolute left-1/2 top-1/2 
      -translate-x-1/2 -translate-y-1/2
      transition-all duration-1000 ease-out
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      ${isSelected ? 'z-40' : 'z-10'}`}
      style={{
        transform: `translateX(${x}px) translateY(${y}px) scale(${
          isSelected ? 1.15 : 1
        })`,
      }}
    >
      <button
        onClick={onSelect}
        className={`relative group transition-all duration-300
        ${isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
      >
        {/* ORBIT GLOW RING */}
        <div
          className={`absolute -inset-4 rounded-full transition-all duration-300
          ${isSelected
            ? `bg-gradient-to-r ${selectedColorClass} animate-pulse`
            : 'bg-white/5'}`}
        />

        {/* MAIN CARD */}
        <div
          className={`relative backdrop-blur-md rounded-2xl p-6 border
          transition-all duration-300
          ${isSelected
            ? `bg-white/20 ${selectedColorClass} shadow-2xl`
            : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'}`}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={`mb-4 transition-transform duration-300
              ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}
            >
              {item.icon}
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              {item.title}
            </h3>

            <p className="text-blue-100 text-sm max-w-[200px]">
              {item.shortDesc}
            </p>

            {isSelected && (
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-sm font-medium">
                  Selected
                </span>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default InnovationItem;
