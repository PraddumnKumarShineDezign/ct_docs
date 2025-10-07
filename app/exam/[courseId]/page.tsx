'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award, CircleCheck as CheckCircle, Circle as XCircle, Trophy, RotateCcw, Download } from 'lucide-react';
import coursesData from '@/lib/courses-data.json';
import quizData from '@/lib/quiz-data.json';
import { storage, UserProfile } from '@/lib/storage';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [mounted, setMounted] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  const course = coursesData.find((c) => c.id === courseId);
  const questions: Question[] = (quizData as any)[courseId]?.['final'] || [];
  const passingPercentage = 60;

  useEffect(() => {
    setMounted(true);
    const profile = storage.getUserProfile();
    if (profile) {
      setUserName(profile.name);
    }

    const progress = storage.getProgress(courseId);
    if (progress.finalExam) {
      setShowResults(true);
      setScore(progress.finalExam.score);
    }
  }, [courseId]);

  if (!mounted) {
    return null;
  }

  if (!course || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Exam Not Available</h1>
          <p className="text-slate-600 mb-6">This course doesn&apos;t have a final exam yet.</p>
          <Link href={`/course/${courseId}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStartExam = () => {
    if (!userName) {
      setShowNamePrompt(true);
    } else {
      setExamStarted(true);
    }
  };

  const handleNameSubmit = () => {
    if (userName.trim()) {
      const profile: UserProfile = {
        name: userName,
        email: '',
        registrationDate: new Date().toISOString(),
      };
      storage.setUserProfile(profile);
      setShowNamePrompt(false);
      setExamStarted(true);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);

    storage.saveFinalExam(courseId, correctCount, questions.length, passingPercentage);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
    setExamStarted(false);
    storage.clearProgress(courseId);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= passingPercentage;

  if (showNamePrompt) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Enter Your Name</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              Please enter your name to generate your certificate upon passing the exam.
            </p>
            <Input
              placeholder="Your Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowNamePrompt(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleNameSubmit} disabled={!userName.trim()} className="flex-1">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href={`/course/${courseId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="border-2">
            <CardHeader className="text-center pb-8">
              <div
                className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  passed ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {passed ? (
                  <Trophy className="h-16 w-16 text-green-600" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-600" />
                )}
              </div>
              <CardTitle className="text-4xl mb-4">
                {passed ? '🎉 Congratulations!' : 'Exam Not Passed'}
              </CardTitle>
              <p className="text-lg text-slate-600">
                {passed
                  ? 'You have successfully passed the final exam!'
                  : 'Unfortunately, you did not pass. Keep learning and try again!'}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Score</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {score} / {questions.length}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Percentage</p>
                  <p className="text-3xl font-bold text-slate-900">{percentage}%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Required</p>
                  <p className="text-3xl font-bold text-slate-900">{passingPercentage}%</p>
                </div>
              </div>

              {passed && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    You&apos;ve Earned Your Certificate!
                  </h3>
                  <p className="text-green-800 mb-4">
                    Click below to view and download your completion certificate.
                  </p>
                  <Link href={`/certificate/${courseId}`}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Award className="mr-2 h-5 w-5" />
                      View Certificate
                    </Button>
                  </Link>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Review Answers</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {questions.map((q, index) => {
                    const userAnswer = selectedAnswers[index];
                    const isCorrect = userAnswer === q.correct;

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${
                          isCorrect
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 mb-2">
                              {index + 1}. {q.question}
                            </p>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-semibold">Your answer:</span>{' '}
                                {userAnswer !== undefined
                                  ? q.options[userAnswer]
                                  : 'Not answered'}
                              </p>
                              {!isCorrect && (
                                <p className="text-green-700">
                                  <span className="font-semibold">Correct answer:</span>{' '}
                                  {q.options[q.correct]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {!passed && (
                  <Button onClick={handleRetake} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake Exam
                  </Button>
                )}
                <Link href={`/course/${courseId}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Course
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href={`/course/${courseId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-3xl mb-2">Final Exam</CardTitle>
              <p className="text-slate-600">{course.title}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-blue-900">Exam Instructions</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>This exam contains {questions.length} multiple choice questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>You must score at least {passingPercentage}% to pass</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>You can review and change your answers before submitting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Upon passing, you will receive a certificate of completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>You can retake the exam if you don&apos;t pass</span>
                  </li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={handleStartExam}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Award className="mr-2 h-5 w-5" />
                  Start Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-900">Final Exam</h1>
            <Badge variant="secondary" className="text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-slate-700"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between pt-6 border-t">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
              >
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length !== questions.length}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit Exam
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
