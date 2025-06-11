"use client"
import { BarChart3, Calendar, CheckCircle, Shield, Smartphone, Users } from 'lucide-react';
import React from 'react';
import { CardProps } from '../../../../types';
import { useTheme } from '@/components/theme/theme-context';



const FeaturesCard = ({ title, description, iconName, bgColor, iconColor }: CardProps) => {
    const { theme } = useTheme();

    

    function getIconByName(iconName: string, iconColor: string) {
        switch (iconName) {
            case 'Shield':
                return <Shield className={`w-6 h-6 ${iconColor}`} />;
            case 'CheckCircle':
                return <CheckCircle className={`w-6 h-6 ${iconColor}`} />;
            case 'Users': 
                return <Users className={`w-6 h-6 ${iconColor}`} />
            case 'BarChart3': 
                return <BarChart3 className={`w-6 h-6 ${iconColor}`} />
            case 'Calendar':
                return <Calendar className={`w-6 h-6 ${iconColor}`} />
            case 'Smartphone': 
                return <Smartphone className={`w-6 h-6 ${iconColor}`} />
            default:
                return null; 
        }
    }

  return (
    <div className={`rounded-xl ${theme === 'light' ? "" : "maxter-bg"} shadow-lg hover:shadow-xl transition-shadow`}>
        <div className='p-6 rounded-2xl flex flex-col gap-2'>
            <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
                {getIconByName(iconName, iconColor)}
            </div>
            <h3 className='text-2xl font-bold'>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default FeaturesCard;