import Card from './card';
import { CARTS, CardTypes } from "@/lib/constants/carts"

const FeaturesSection = () => {
  return (
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything you need for productivity</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful tools for planning, tracking and completing tasks
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CARTS.map((card: CardTypes, index: number) => (
              <Card  
                key={index}
                title={card.title}
                description={card.description}
                iconName={card.iconName} 
                bgColor={card.bgColor}
                iconColor={card.iconColor}
              />
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection;