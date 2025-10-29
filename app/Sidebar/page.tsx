"use client";
import { BookOpen, CheckCircle, MoreVertical } from "lucide-react";
import coursesData from "@/lib/courses-data.json";
import docsData from "@/lib/docs-data1.json";
import { storage } from "@/lib/storage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface parentData {
  CourseId: string;
  onHandleSectionClick: (sectionId: number) => void;
  onHandleTopicClick: (topicId: number) => void;
}
interface Topic {
  title: string;
  content: string;
}
interface Heading {
  title: string;
  topics: Topic[];
}

export default function Sidebar({
  CourseId,
  onHandleSectionClick,
  onHandleTopicClick,
}: parentData) {
  const params = useParams();
  const courseId = CourseId as string;
  const courseDocs = (docsData as any)[courseId];
  const [progress, setProgress] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const course = coursesData?.find((c) => c?.id === courseId);

  useEffect(() => {
    setMounted(true);
    if (courseId) {
      const userProgress = storage.getProgress(courseId);
      setProgress(userProgress);

      if (courseDocs) {
        const firstTopic = Number(Object.keys(courseDocs)[0]);
        setOpenSection("0")
        setSelectedTopic(0);
      }
    }
  }, [courseId, courseDocs]);

  if (!mounted) return null;

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Course Not Found
          </h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  // const handleSectionClicked = (idx: number) => {

  // };
  const topics = Object.entries(courseDocs) as [string, Heading][];
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
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Accordion
            // type="multiple"
            // className="w-full max-w-2xl mx-auto space-y-4"
            type="single" // only one can be open at a time
            value={openSection ?? undefined} // controlled value
            onValueChange={(val) => setOpenSection(val)} // update open section
            collapsible
            className="w-full max-w-2xl mx-auto space-y-4 "
          >
            {topics.map(([keyId, section], idx) => (
              <AccordionItem
                key={keyId}
                value={keyId}
                
              >
                <AccordionTrigger
                  className={`cursor-pointer p-1 rounded ${
                    openSection === keyId
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                  setSelectedTopic(0);
                  onHandleSectionClick(idx);
                }}
                >
                  {section?.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {section?.topics?.map((topic, idx) => (
                      <li
                        key={idx}
                        // className="cursor-pointer hover:text-blue-600"
                        className={`cursor-pointer p-1 rounded mb-5 ${
                          selectedTopic === idx && openSection === keyId
                            ? "bg-blue-100 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                        // onClick={() => onHandleTopicClick(idx)}
                        onClick={() => {
                          setOpenSection(keyId); // ensure the section is open
                          setSelectedTopic(idx); // mark topic as selected
                          onHandleTopicClick(idx); // call your handler
                        }}
                      >
                        {topic?.title}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </aside>
    </>
  );
}
