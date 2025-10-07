'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Clock, Award, GraduationCap } from 'lucide-react';
import coursesData from '@/lib/courses-data.json';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Hindi Tech Siksha Computer Training Academy</h1>
              <p className="text-slate-600 mt-1">Master Essential Computer Skills</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Available Courses
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of computer training courses designed for beginners to advanced learners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-20 w-20 text-white" />
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="text-sm mt-2">
                  {course.shortDesc}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Award className="h-4 w-4" />
                    <span>Level: {course.level}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold text-slate-700">
                      Course Fee: <span className="text-blue-600">{course.fees}</span>
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3 pt-6">
                <Link href={`/course/${course.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    About Course
                  </Button>
                </Link>
                <Link href={`/docs/${course.id}`} className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Docs
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600">
            © {new Date().getFullYear()} Hindi Tech Siksha Computer Training Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
