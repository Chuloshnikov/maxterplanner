import { BarChart3, Calendar, CheckCircle, Shield, Smartphone, Users } from 'lucide-react';
import React from 'react'
import Card from './card';

const FeaturesSection = () => {
  return (
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Все что нужно для продуктивности</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Мощные инструменты для планирования, отслеживания и выполнения задач
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className='p-6 rounded-2xl'>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3>Умное планирование</h3>
                <p>
                  Создавайте задачи с приоритетами, дедлайнами и автоматическими напоминаниями
                </p>
              </div>
            </div>

            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className='p-6 rounded-2xl'>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3>Командная работа</h3>
                <p>
                  Делитесь проектами с коллегами и отслеживайте прогресс в реальном времени
                </p>
              </div>
            </div>

            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className='p-6 rounded-2xl'>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3>Аналитика</h3>
                <p>Подробные отчеты о продуктивности и времени выполнения задач</p>
              </div>
            </div>

            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className='p-4 rounded-md'>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <h3>Календарь</h3>
                <p>Интегрированный календарь с синхронизацией Google Calendar и Outlook</p>
              </div>
            </div>

            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className='p-6 rounded-2xl'>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-red-600" />
                </div>
                <h3>Мобильное приложение</h3>
                <p>
                  Работайте с задачами где угодно с нашими приложениями для iOS и Android
                </p>
              </div>
            </div>
            <Card  
            title="Security" 
            description="Data encryption and backup to protect your projects" 
            iconName="Shield" 
            bgColor="bg-teal-100" 
            iconColor="text-teal-600" />
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection;