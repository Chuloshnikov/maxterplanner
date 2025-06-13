"use client"

import { BarChart3 } from 'lucide-react';
import { useTheme } from '../../theme/theme-context';
import { Button } from '../../ui/button';
import Link from 'next/link';

const HeroSection = () => {
    const { theme } = useTheme();
  return (
    <section className={theme === 'light' ? 'bg-heroColorLight py-20 lg:py-32' : 'bg-heroColorDark py-20 lg:py-32'}>
         <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-500 mb-6 leading-tight">
                Manage tasks
            <br />
            <span className="maxter-text">like a pro</span>
          </h1>
          <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            MaXter Planner is a modern project and task management tool that will help you achieve your goals faster and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="maxter-bg hover:bg-blue-500 text-lg px-8 py-3">
              <Link href="/account">Try for free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              <Link href="/demo">View demo</Link>
            </Button>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="rounded-2xl shadow-2xl border p-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl h-64 flex items-center justify-center">
                <div className="text-white text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold">Application interface</h3>
                  <p className="text-blue-100 mt-2">Intuitive design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default HeroSection;