import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const CtaSection = () => {
  return (
     <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to increase your productivity?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already optimized their work with MaXter Planner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 cursor-pointer">
            
              Start for free
            </Button>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 cursor-pointer"
            >
              <Link href="https://maxter-blog.vercel.app/contacts" className=''>
                Contact us
              </Link>
              
            </Button>
          </div>
          <p className="text-blue-200 mt-4 text-sm">Free 14 days trial • No credit card required</p>
        </div>
      </section>
  )
}

export default CtaSection;