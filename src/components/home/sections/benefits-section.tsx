
import React from 'react'
import IconTextCard from '../cards/icon-text-card';
import { BENEFITS } from '@/lib/constants/benefits';

const BenefitsSection = () => {
  return (
     <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Why choose MaXter Planner?</h2>
              <div className="space-y-6">
                {BENEFITS.map((reason, index) => (
                <IconTextCard
                  key={index}
                  title={reason.title}
                  description={reason.description}
                  iconName={reason.iconName}
                  bgColor={reason.bgColor}
                  iconColor={reason.iconColor}
                />
              ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl h-80 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-sm">Tasks per day</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm">Execution</div>
                    </div>
                  </div>
                  <p className="text-blue-100">Performance statistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default BenefitsSection;