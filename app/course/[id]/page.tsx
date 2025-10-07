'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Award, Briefcase, Code, ArrowLeft, FileText } from 'lucide-react';
import coursesData from '@/lib/courses-data.json';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const courseId = params.id as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const course = coursesData.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Course Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white mb-8 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <div>
              <Badge className="bg-white/30 text-white mb-2">{course.level}</Badge>
              <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-blue-100 text-lg">{course.shortDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Duration</span>
              </div>
              <p className="text-lg">{course.duration}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5" />
                <span className="font-semibold">Level</span>
              </div>
              <p className="text-lg">{course.level}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5" />
                <span className="font-semibold">Fees</span>
              </div>
              <p className="text-lg">{course.fees}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{course.overview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Course Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 pt-1">{module}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                  Career Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.careerOptions.map((career, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200"
                    >
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">{career}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Code className="h-6 w-6 text-blue-600" />
                  Software Covered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.softwareCovered.map((software, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-2 px-4 bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      {software}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-4 border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="text-xl">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Begin your learning journey with comprehensive documentation and interactive quizzes.
                </p>
                <Link href={`/docs/${course.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Go to Course Docs
                  </Button>
                </Link>
                <Link href={`/exam/${course.id}`}>
                  <Button variant="outline" className="w-full" size="lg">
                    <Award className="mr-2 h-5 w-5" />
                    Take Final Exam
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <p>Self-paced learning with comprehensive materials</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <p>Interactive quizzes after each topic</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <p>Final exam and certificate upon completion</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <p>Track your progress throughout the course</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
