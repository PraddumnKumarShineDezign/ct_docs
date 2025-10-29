
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, CircleCheck as CheckCircle, FileText, CirclePlay as PlayCircle, MoreVertical } from 'lucide-react';
import coursesData from '@/lib/courses-data.json';
import docsData from '@/lib/docs-data1.json';
import { storage } from '@/lib/storage';
import ReactMarkdown from 'react-markdown';
import Sidebar from '@/app/sidebar/page';

interface Topic {
  title: string;
  content: string;
}

interface Section {
  title: string;
  topics: Topic[];
}

export default function DocsPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [mounted, setMounted] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const course = coursesData.find((c) => c.id === courseId);
  const courseDocs = (docsData as any)[courseId];

  useEffect(() => {
    setMounted(true);
    if (courseId) {
      const userProgress = storage.getProgress(courseId);
      setProgress(userProgress);

      if (courseDocs) {
        console.log("courseDocs--->",courseDocs)
        const firstTopic = Number(Object.keys(courseDocs)[0]);
        console.log("firstTopic--->",firstTopic)
        setSelectedSection(0)
        setSelectedTopic(0);
      }
    }
  }, [courseId, courseDocs]);

  const markTopicComplete = (topicId:number) => {
    storage.markTopicComplete(courseId, topicId);
    setProgress(storage.getProgress(courseId));
  };

  const handleSectionClick=(sectionId:number)=>{
    console.log("sectionId-->",sectionId)
    setSelectedSection(sectionId)
     setSelectedTopic(0);
  }

  const handleTopicSelect = (topicId: number) => {
    console.log("topic id--->",topicId)
    setSelectedTopic(topicId);
    // Auto-close sidebar on mobile after selecting a topic
    setSidebarOpen(false);
  };

  if (!mounted) return null;

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

  if (!courseDocs) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Documentation Coming Soon</h2>
            <p className="text-slate-600 mb-6">Course materials for {course.title} are being prepared.</p>
            <Link href={`/course/${courseId}`}>
              <Button>View Course Details</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const topics = Object.entries(courseDocs)as [string, Section][];
  const currentTopicData: Topic | null = selectedSection!=null &&selectedTopic !== null? topics[selectedSection]?.[1]?.topics[selectedTopic]??null:null;
 
  const isTopicCompleted = progress?.completedTopics.includes(selectedTopic);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
    
      <Sidebar CourseId={courseId} onHandleSectionClick={handleSectionClick} onHandleTopicClick={handleTopicSelect}/>
      

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <main className="flex-1 ml-0 sm:ml-64 overflow-auto p-4 sm:p-6">
        {/* Mobile toggle */}
        <div className="flex justify-end sm:hidden mb-4">
          <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {currentTopicData? (
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h1 className="text-3xl font-bold text-slate-900">{currentTopicData?.title}</h1>
              {isTopicCompleted && (
                <Badge className="bg-green-600 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown>{currentTopicData.content}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              {!isTopicCompleted && (
                <Button
                  onClick={() => markTopicComplete(selectedTopic!)}
                  className="bg-green-600 hover:bg-green-700 flex items-center"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              )}
              <Link href={`/quiz/${courseId}/${selectedTopic}`} className="ml-auto w-full sm:w-auto">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Take Quiz
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">Select a topic from the sidebar to begin</p>
          </div>
        )}
      </main>
    </div>
  );
}
