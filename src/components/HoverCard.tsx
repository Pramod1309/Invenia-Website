import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'rotate';
}

const HoverCard = ({ 
  children, 
  className = '', 
  hoverEffect = 'lift' 
}: HoverCardProps) => {
  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'lift':
        return 'hover:-translate-y-2 hover:shadow-2xl';
      case 'glow':
        return 'hover:shadow-blue-500/25 hover:shadow-2xl';
      case 'scale':
        return 'hover:scale-105';
      case 'rotate':
        return 'hover:rotate-1';
      default:
        return 'hover:-translate-y-2 hover:shadow-2xl';
    }
  };

  return (
    <div 
      className={`
        transition-all duration-300 ease-in-out
        ${getHoverClasses()}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default HoverCard;
