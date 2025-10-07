// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, BookOpen, CircleCheck as CheckCircle, FileText, CirclePlay as PlayCircle } from 'lucide-react';
// import coursesData from '@/lib/courses-data.json';
// import docsData from '@/lib/docs-data.json';
// import { storage } from '@/lib/storage';
// import ReactMarkdown from 'react-markdown';

// export default function DocsPage() {
//   const params = useParams();
//   const courseId = params.courseId as string;
//   console.log("courseId", courseId)
//   const [mounted, setMounted] = useState(false);
//   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
//   const [progress, setProgress] = useState<any>(null);

//   const course = coursesData.find((c) => c.id === courseId);
//   console.log("course", course)
//   const courseDocs = (docsData as any)[courseId];
//   console.log("courseDocs", courseDocs)

//   useEffect(() => {
//     setMounted(true);
//     if (courseId) {
//       const userProgress = storage.getProgress(courseId);
//       setProgress(userProgress);

//       if (courseDocs) {
//         const firstTopic = Object.keys(courseDocs)[0];
//         setSelectedTopic(firstTopic);
//       }
//     }
//   }, [courseId, courseDocs]);

//   const markTopicComplete = (topicId: string) => {
//     storage.markTopicComplete(courseId, topicId);
//     setProgress(storage.getProgress(courseId));
//   };

//   if (!mounted) {
//     return null;
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-slate-900 mb-4">Course Not Found</h1>
//           <Link href="/">
//             <Button>Back to Home</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!courseDocs) {
//     return (
//       <div className="min-h-screen bg-slate-50">
//         <header className="bg-white shadow-sm border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <Link href="/">
//               <Button variant="ghost" size="sm">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Home
//               </Button>
//             </Link>
//           </div>
//         </header>
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-slate-900 mb-2">
//               Documentation Coming Soon
//             </h2>
//             <p className="text-slate-600 mb-6">
//               Course materials for {course.title} are being prepared.
//             </p>
//             <Link href={`/course/${courseId}`}>
//               <Button>View Course Details</Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const topics = Object.entries(courseDocs);
//   const currentTopicData = selectedTopic ? courseDocs[selectedTopic] : null;
//   const isTopicCompleted = progress?.completedTopics.includes(selectedTopic);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="bg-white shadow-sm border-b sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <Link href={`/course/${courseId}`}>
//               <Button variant="ghost" size="sm">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Course
//               </Button>
//             </Link>
//             <div className="flex items-center gap-2">
//               <Badge variant="secondary">
//                 {progress?.completedTopics.length || 0} / {topics.length} Topics Completed
//               </Badge>
//               <Link href={`/exam/${courseId}`}>
//                 <Button size="sm" className="bg-green-600 hover:bg-green-700">
//                   <PlayCircle className="mr-2 h-4 w-4" />
//                   Final Exam
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex max-w-7xl mx-auto">
//         <aside className="w-80 bg-white border-r min-h-screen sticky top-16">
//           <div className="p-6 border-b bg-gradient-to-br from-blue-600 to-blue-700">
//             <div className="flex items-center gap-3 text-white">
//               <BookOpen className="h-8 w-8" />
//               <div>
//                 <h2 className="font-bold text-lg">{course.title}</h2>
//                 <p className="text-sm text-blue-100">Course Documentation</p>
//               </div>
//             </div>
//           </div>

//           <ScrollArea className="h-[calc(100vh-180px)]">
//             <nav className="p-4 space-y-2">
//               {topics.map(([topicId, topicData]: [string, any]) => {
//                 const isCompleted = progress?.completedTopics.includes(topicId);
//                 const isSelected = selectedTopic === topicId;

//                 return (
//                   <button
//                     key={topicId}
//                     onClick={() => setSelectedTopic(topicId)}
//                     className={`w-full text-left p-3 rounded-lg transition-all ${isSelected
//                       ? 'bg-blue-100 border-2 border-blue-500 text-blue-900'
//                       : 'hover:bg-slate-100 border-2 border-transparent'
//                       }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium">{topicData.title}</span>
//                       {isCompleted && (
//                         <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
//                       )}
//                     </div>
//                   </button>
//                 );
//               })}
//             </nav>
//           </ScrollArea>
//         </aside>

//         <main className="flex-1 p-8">
//           {currentTopicData ? (
//             <div className="max-w-4xl">
//               <div className="mb-6 flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-slate-900 mb-2">
//                     {currentTopicData.title}
//                   </h1>
//                   {isTopicCompleted && (
//                     <Badge className="bg-green-600">
//                       <CheckCircle className="h-3 w-3 mr-1" />
//                       Completed
//                     </Badge>
//                   )}
//                 </div>
//               </div>

//               <Card>
//                 <CardContent className="p-8">
//                   <div className="prose prose-slate max-w-none">
//                     <ReactMarkdown
//                       components={{
//                         h1: ({ children }) => (
//                           <h1 className="text-3xl font-bold text-slate-900 mb-4 mt-6">
//                             {children}
//                           </h1>
//                         ),
//                         h2: ({ children }) => (
//                           <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">
//                             {children}
//                           </h2>
//                         ),
//                         h3: ({ children }) => (
//                           <h3 className="text-xl font-semibold text-slate-700 mb-2 mt-4">
//                             {children}
//                           </h3>
//                         ),
//                         p: ({ children }) => (
//                           <p className="text-slate-700 mb-4 leading-relaxed">
//                             {children}
//                           </p>
//                         ),
//                         ul: ({ children }) => (
//                           <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700">
//                             {children}
//                           </ul>
//                         ),
//                         ol: ({ children }) => (
//                           <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700">
//                             {children}
//                           </ol>
//                         ),
//                         li: ({ children }) => (
//                           <li className="ml-4">{children}</li>
//                         ),
//                         strong: ({ children }) => (
//                           <strong className="font-bold text-slate-900">{children}</strong>
//                         ),
//                         code: ({ children }) => (
//                           <code className="bg-slate-100 text-blue-600 px-2 py-1 rounded text-sm font-mono">
//                             {children}
//                           </code>
//                         ),
//                         pre: ({ children }) => (
//                           <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4">
//                             {children}
//                           </pre>
//                         ),
//                       }}
//                     >
//                       {currentTopicData.content}
//                     </ReactMarkdown>
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="mt-6 flex items-center justify-between">
//                 {!isTopicCompleted && (
//                   <Button
//                     onClick={() => markTopicComplete(selectedTopic!)}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     <CheckCircle className="mr-2 h-4 w-4" />
//                     Mark as Complete
//                   </Button>
//                 )}
//                 <Link href={`/quiz/${courseId}/${selectedTopic}`} className="ml-auto">
//                   <Button className="bg-blue-600 hover:bg-blue-700">
//                     <PlayCircle className="mr-2 h-4 w-4" />
//                     Take Quiz
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
//               <p className="text-slate-600">Select a topic from the sidebar to begin</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, CircleCheck as CheckCircle, FileText, CirclePlay as PlayCircle, MoreVertical } from 'lucide-react';
import coursesData from '@/lib/courses-data.json';
import docsData from '@/lib/docs-data.json';
import { storage } from '@/lib/storage';
import ReactMarkdown from 'react-markdown';

export default function DocsPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [mounted, setMounted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
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
        const firstTopic = Object.keys(courseDocs)[0];
        setSelectedTopic(firstTopic);
      }
    }
  }, [courseId, courseDocs]);

  const markTopicComplete = (topicId: string) => {
    storage.markTopicComplete(courseId, topicId);
    setProgress(storage.getProgress(courseId));
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

  const topics = Object.entries(courseDocs);
  const currentTopicData = selectedTopic ? courseDocs[selectedTopic] : null;
  const isTopicCompleted = progress?.completedTopics.includes(selectedTopic);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r h-screen fixed top-0 left-0 z-20 w-64 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
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
          <button
            className="sm:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {topics.map(([topicId, topicData]: [string, any]) => {
            const isCompleted = progress?.completedTopics.includes(topicId);
            const isSelected = selectedTopic === topicId;
            return (
              <button
                key={topicId}
                onClick={() => setSelectedTopic(topicId)}
                className={`w-full text-left p-3 rounded-lg transition-all ${isSelected
                  ? 'bg-blue-100 border-2 border-blue-500 text-blue-900'
                  : 'hover:bg-slate-100 border-2 border-transparent'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{topicData.title}</span>
                  {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <main className="flex-1 ml-0 sm:ml-64 overflow-auto p-6">
        {/* Mobile toggle */}
        <div className="flex justify-end sm:hidden mb-4">
          <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {currentTopicData ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-900">{currentTopicData.title}</h1>
              {isTopicCompleted && (
                <Badge className="bg-green-600">
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
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              )}
              <Link href={`/quiz/${courseId}/${selectedTopic}`} className="ml-auto">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
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
