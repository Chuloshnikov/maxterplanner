"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Home, ArrowLeft, Search, Calendar, BarChart3, Users, FileText } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-12">
            <div className="relative">
              {/* Large 404 Text */}
              <div className="text-[200px] md:text-[300px] font-bold text-blue-100 leading-none select-none">404</div>

              {/* Floating Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Calendar Icon */}
                  <div className="absolute -top-16 -left-20 bg-white rounded-2xl shadow-lg p-4 transform rotate-12 hover:rotate-6 transition-transform">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Chart Icon */}
                  <div className="absolute -top-12 right-16 bg-white rounded-2xl shadow-lg p-4 transform -rotate-12 hover:rotate-6 transition-transform">
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>

                  {/* Users Icon */}
                  <div className="absolute top-20 -left-16 bg-white rounded-2xl shadow-lg p-4 transform rotate-6 hover:-rotate-6 transition-transform">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>

                  {/* File Icon */}
                  <div className="absolute top-16 right-20 bg-white rounded-2xl shadow-lg p-4 transform -rotate-6 hover:rotate-12 transition-transform">
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>

                  {/* Central Search Icon */}
                  <div className="bg-blue-600 rounded-full p-6 shadow-xl">
                    <Search className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-500 mb-4">Page not found</h1>
            <p className="text-xl text-slate-500 mb-2">Oops! It looks like the page you are looking for does not exist.</p>
            <p className="text-slate-500">It may have been moved, deleted, or you may have entered the wrong address.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                The main
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
              <span className="cursor-pointer">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </span>
            </Button>
          </div>
          {/* Popular Pages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/dashboard">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-500 mb-2">Dashboard</h3>
                  <p className="text-sm text-slate-500">Task and project management</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/calendar">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-500 mb-2">Calendar</h3>
                  <p className="text-sm text-slate-500">Event and meeting planning</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/#features">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-500 mb-2">Possibilities</h3>
                  <p className="text-sm text-slate-500">Learn about the app&apos;s features</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-500 mb-2">Documentation</h3>
                  <p className="text-sm text-slate-500">Manuals and instructions</p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Help Section */}
          <div className="mt-16 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-500 mb-4">Need help?</h2>
            <p className="text-slate-600 mb-6">
              If you can&apos;t find what you&apos;re looking for, our support team is always ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                Contact support
              </Button>
              <Button variant="outline" size="lg">
                Frequently asked questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
