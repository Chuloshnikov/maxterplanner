import { Clock, Users, Zap, BarChart3, Calendar, Smartphone, Shield } from "lucide-react";
import { FC } from "react";
import { CardProps } from "../../../../types";

const getIconByName = (iconName: string, iconColor: string) => {
  const className = `w-4 h-4 ${iconColor}`;

  switch (iconName) {
    case "Clock":
      return <Clock className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "Users":
      return <Users className={className} />;
    case "BarChart3":
      return <BarChart3 className={className} />;
    case "Calendar":
      return <Calendar className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "Shield":
      return <Shield className={className} />;
    default:
      return null;
  }
};

const IconTextCard: FC<CardProps> = ({ title, description, iconName, bgColor, iconColor }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
        {getIconByName(iconName, iconColor)}
      </div>
      <div>
        <h3 className="font-semibold text-slate-500 mb-2">{title}</h3>
        <p className="text-slate-500">{description}</p>
      </div>
    </div>
  );
};

export default IconTextCard;