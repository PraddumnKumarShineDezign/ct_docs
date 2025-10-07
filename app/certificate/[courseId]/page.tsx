// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { ArrowLeft, Download, Award } from 'lucide-react';
// import coursesData from '@/lib/courses-data.json';
// import { storage } from '@/lib/storage';

// export default function CertificatePage() {
//   const params = useParams();
//   const courseId = params.courseId as string;
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const [mounted, setMounted] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [examData, setExamData] = useState<any>(null);

//   const course = coursesData.find((c) => c.id === courseId);

//   useEffect(() => {
//     setMounted(true);

//     const profile = storage.getUserProfile();
//     const progress = storage.getProgress(courseId);

//     if (profile) {
//       setUserName(profile.name);
//     }

//     if (progress.finalExam && progress.finalExam.passed) {
//       setExamData(progress.finalExam);
//     }
//   }, [courseId]);

//   const handleDownload = async () => {
//     if (!certificateRef.current) return;

//     try {
//       const html2canvas = (await import('html2canvas')).default;
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 2,
//         backgroundColor: '#ffffff',
//       });

//       const link = document.createElement('a');
//       link.download = `${course?.title.replace(/\s+/g, '_')}_Certificate.png`;
//       link.href = canvas.toDataURL('image/png');
//       link.click();
//     } catch (error) {
//       console.error('Error generating certificate:', error);
//       alert('Error generating certificate. Please try again.');
//     }
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

//   if (!examData) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <Card className="p-8 text-center max-w-md">
//           <Award className="h-16 w-16 text-slate-300 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-slate-900 mb-2">Certificate Not Available</h1>
//           <p className="text-slate-600 mb-6">
//             You need to pass the final exam to receive a certificate.
//           </p>
//           <Link href={`/exam/${courseId}`}>
//             <Button className="bg-blue-600 hover:bg-blue-700">Take Final Exam</Button>
//           </Link>
//         </Card>
//       </div>
//     );
//   }

//   const completionDate = new Date(examData.date).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <Link href={`/course/${courseId}`}>
//               <Button variant="ghost" size="sm" className='cursor-pointer'>
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Course
//               </Button>
//             </Link>
//             <Button onClick={handleDownload} className="cursor-pointer bg-blue-600 hover:bg-blue-700">
//               <Download className="mr-2 h-4 w-4" />
//               Download Certificate
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">
//             Certificate of Completion
//           </h1>
//           <p className="text-slate-600">
//             Congratulations on completing the course! Download your certificate below.
//           </p>
//         </div>

//         <div className="flex justify-center">
//           <div
//             ref={certificateRef}
//             className="bg-white shadow-2xl"
//             style={{
//               width: '1000px',
//               height: '850px',
//               padding: '60px',
//               position: 'relative',
//             }}
//           >
//             <div
//               className="absolute inset-0"
//               style={{
//                 border: '20px solid',
//                 borderImage: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%) 1',
//                 margin: '20px',
//               }}
//             />

//             <div
//               className="absolute inset-0"
//               style={{
//                 border: '2px solid #3b82f6',
//                 margin: '30px',
//               }}
//             />

//             <div className="relative h-full flex flex-col items-center justify-center text-center px-16">
//               <div className="mb-8">
//                 <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto flex items-center justify-center mb-6">
//                   <Award className="h-12 w-12 text-white" />
//                 </div>
//                 <h1
//                   className="font-serif font-bold text-slate-800 mb-2"
//                   style={{ fontSize: '48px' }}
//                 >
//                   Certificate of Completion
//                 </h1>
//                 <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto" />
//               </div>

//               <div className="mb-8">
//                 <p className="text-slate-600 text-xl mb-4">This is to certify that</p>
//                 <h2
//                   className="font-serif font-bold text-blue-900 mb-4"
//                   style={{
//                     fontSize: '42px',
//                     borderBottom: '3px solid #3b82f6',
//                     paddingBottom: '8px',
//                     minWidth: '400px',
//                   }}
//                 >
//                   {userName || 'Student Name'}
//                 </h2>
//                 <p className="text-slate-600 text-xl mb-4">
//                   has successfully completed the course
//                 </p>
//                 <h3
//                   className="font-serif font-bold text-slate-800 mb-6"
//                   style={{ fontSize: '32px' }}
//                 >
//                   {course.title}
//                 </h3>
//               </div>

//               <div className="grid grid-cols-3 gap-8 mb-8 w-full max-w-2xl">
//                 <div className="text-center">
//                   <p className="text-slate-500 text-sm mb-1">SCORE</p>
//                   <p className="font-bold text-slate-800 text-2xl">
//                     {examData.score}/{examData.total}
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-slate-500 text-sm mb-1">PERCENTAGE</p>
//                   <p className="font-bold text-slate-800 text-2xl">{examData.percentage}%</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-slate-500 text-sm mb-1">COMPLETION DATE</p>
//                   <p className="font-bold text-slate-800 text-lg">{completionDate}</p>
//                 </div>
//               </div>

//               {/* <div className="mt-auto pt-8">
//                 <div className="flex justify-center items-end gap-16">
//                   <div className="text-center">
//                     <div className="border-t-2 border-slate-800 pt-2 w-48">
//                       <p className="font-semibold text-slate-800">Director</p>
//                       <p className="text-sm text-slate-600">Hindi Tech Siksha Computer Training Academy</p>
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <div className="border-t-2 border-slate-800 pt-2 w-48">
//                       <p className="font-semibold text-slate-800">Instructor</p>
//                       <p className="text-sm text-slate-600">Course Coordinator</p>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//               <div className="mt-auto pt-8">
//                 <div className="flex justify-center items-end gap-16">
//                   {/* Director */}
//                   <div className="text-center">
//                     <p className="text-sm text-slate-600">Pradum Shukla</p>
//                     <div className="border-t-2 border-slate-800 pt-2 w-48">
//                       <p className="font-semibold text-slate-800">Director</p>
//                       {/* <p className="text-xs text-slate-400">Hindi Tech Siksha Computer Training Academy</p> */}
//                     </div>
//                   </div>

//                   {/* Coordinator / Instructor */}
//                   <div className="text-center">
//                     <p className="text-sm text-slate-600">Pradum Shukla</p>
//                     <div className="border-t-2 border-slate-800 pt-2 w-48">
//                       <p className="font-semibold text-slate-800">Instructor / Coordinator</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>


//               <div style={{ marginTop: '58%' }} className="absolute left-0 right-0 text-center">
//                 {/* bottom-8 */}
//                 <p className="text-slate-400 text-xs">
//                   Computer Training Academy | Certificate ID: {courseId.toUpperCase()}-
//                   {Date.now().toString().slice(-8)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mt-8">
//           <p className="text-slate-600 mb-4">
//             Share your achievement and continue learning!
//           </p>
//           <div className="flex gap-4 justify-center">
//             <Link href="/">
//               <Button variant="outline">Explore More Courses</Button>
//             </Link>
//             <Link href={`/course/${courseId}`}>
//               <Button variant="outline">Back to Course</Button>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download, Award } from 'lucide-react';
import coursesData from '@/lib/courses-data.json';
import { storage } from '@/lib/storage';

export default function CertificatePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const certificateRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const [examData, setExamData] = useState<any>(null);

  const course = coursesData.find((c) => c.id === courseId);

  useEffect(() => {
    setMounted(true);

    const profile = storage.getUserProfile();
    const progress = storage.getProgress(courseId);

    if (profile) {
      setUserName(profile.name);
    }

    if (progress.finalExam && progress.finalExam.passed) {
      setExamData(progress.finalExam);
    }
  }, [courseId]);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `${course?.title.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  if (!mounted) {
    return null;
  }

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

  if (!examData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Award className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Certificate Not Available</h1>
          <p className="text-slate-600 mb-6">
            You need to pass the final exam to receive a certificate.
          </p>
          <Link href={`/exam/${courseId}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">Take Final Exam</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const completionDate = new Date(examData.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/course/${courseId}`}>
            <Button variant="ghost" size="sm" className="cursor-pointer flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
          </Link>
          <Button
            onClick={handleDownload}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Certificate of Completion
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Congratulations on completing the course! Download your certificate below.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            ref={certificateRef}
            className="bg-white shadow-2xl w-full max-w-[900px] p-8 sm:p-12 relative flex flex-col items-center"
          >
            {/* Decorative Borders */}
            <div className="absolute inset-0 border-8 border-gradient-to-br from-blue-600 to-blue-800 m-4 pointer-events-none" />
            <div className="absolute inset-0 border-2 border-blue-600 m-8 pointer-events-none" />

            <div className="relative flex flex-col items-center text-center w-full">
              {/* Top Logo */}
              <div className="mb-6 flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <h1 className="font-serif font-bold text-slate-800 text-2xl sm:text-4xl mb-1">
                  Certificate of Completion
                </h1>
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto" />
              </div>

              {/* Student Name */}
              <div className="mb-6">
                <p className="text-slate-600 text-sm sm:text-lg mb-2">This is to certify that</p>
                <h2 className="font-serif font-bold text-blue-900 text-lg sm:text-3xl mb-2 border-b-2 sm:border-b-4 border-blue-600 inline-block px-4">
                  {userName || 'Student Name'}
                </h2>
                <p className="text-slate-600 text-sm sm:text-lg mt-2 mb-1">
                  has successfully completed the course
                </p>
                <h3 className="font-serif font-bold text-slate-800 text-lg sm:text-2xl mt-1">
                  {course.title}
                </h3>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 w-full max-w-2xl">
                <div className="text-center">
                  <p className="text-slate-500 text-xs sm:text-sm mb-1">SCORE</p>
                  <p className="font-bold text-slate-800 text-lg sm:text-2xl">
                    {examData.score}/{examData.total}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-slate-500 text-xs sm:text-sm mb-1">PERCENTAGE</p>
                  <p className="font-bold text-slate-800 text-lg sm:text-2xl">{examData.percentage}%</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-500 text-xs sm:text-sm mb-1">COMPLETION DATE</p>
                  <p className="font-bold text-slate-800 text-sm sm:text-lg">{completionDate}</p>
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-8 w-full flex flex-col sm:flex-row justify-around items-center gap-8">
                {/* Director */}
                <div className="text-center">
                  <p className="text-sm sm:text-base text-slate-600 mb-1">Pradum Shukla</p>
                  <div className="border-t-2 border-slate-800 pt-2 w-40 sm:w-48">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base">Director</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Hindi Tech Siksha Computer Training Academy</p>
                </div>

                {/* Instructor / Coordinator */}
                <div className="text-center">
                  <p className="text-sm sm:text-base text-slate-600 mb-1">Pradum Shukla</p>
                  <div className="border-t-2 border-slate-800 pt-2 w-40 sm:w-48">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base">
                      Instructor / Coordinator
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Certificate ID */}
              <p className="text-slate-400 text-xs sm:text-sm mt-8">
                Computer Training Academy | Certificate ID: {courseId.toUpperCase()}-
                {Date.now().toString().slice(-8)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-600 mb-4">
            Share your achievement and continue learning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Explore More Courses
              </Button>
            </Link>
            <Link href={`/course/${courseId}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                Back to Course
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
