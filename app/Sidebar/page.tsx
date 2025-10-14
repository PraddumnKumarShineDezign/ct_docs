
"use client"
import { BookOpen, CheckCircle, MoreVertical } from "lucide-react";
import coursesData from "@/lib/courses-data.json";
import docsData from "@/lib/docs-data.json";
import { storage } from '@/lib/storage';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  const params = useParams();
  const courseId = params.courseId as string;
  const courseDocs = (docsData as any)[courseId];
  const [progress, setProgress] = useState<any>(null);
  const [mounted,setMounted]=useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const course = coursesData?.find((c) => c?.id === courseId);
  

   useEffect(() => {
      setMounted(true);
      if (courseId) {
        const userProgress = storage.getProgress(courseId);
        setProgress(userProgress);
  
        if (courseDocs) {
          const firstTopic = Object.keys(courseDocs)[0];
          setSelectedTopic(firstTopic);
        }
      }
    }, [courseId, courseDocs]);

    
    const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    // Auto-close sidebar on mobile after selecting a topic
    setSidebarOpen(false);
  };

    if(!mounted) return null;

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

  const topics = Object.entries(courseDocs);



  return (
    <>
      <aside
        className={`mt-20 bg-white border-r h-screen fixed top-0 left-0 z-20 w-64 flex flex-col transition-transform duration-300 translate-x-0
          `}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="flex items-center gap-2 text-white">
            <BookOpen className="h-6 w-6" />
            <div>
              <h2 className="font-bold text-lg">{course.title}</h2>
              <p className="text-sm text-blue-100">Course Documentation</p>
            </div>
          </div>
          {/* <button
            className="sm:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          > */}
          {/* <MoreVertical className="h-5 w-5" />
          </button> */}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {topics.map(([topicId, topicData]: [string, any]) => {
            const isCompleted = progress?.completedTopics.includes(topicId);
            const isSelected = selectedTopic === topicId;
            return (
              <button
                key={topicId}
                onClick={() => handleTopicSelect(topicId)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  isSelected
                    ? "bg-blue-100 border-2 border-blue-500 text-blue-900"
                    : "hover:bg-slate-100 border-2 border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{topicData.title}</span>
                  {isCompleted && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
