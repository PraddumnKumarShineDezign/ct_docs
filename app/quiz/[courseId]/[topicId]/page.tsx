'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CircleCheck as CheckCircle, Circle as XCircle, Trophy, RotateCcw } from 'lucide-react';
import coursesData from '@/lib/courses-data.json';
import quizData from '@/lib/quiz-data.json';
import { storage } from '@/lib/storage';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const topicId = params.topicId as string;

  const [mounted, setMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const course = coursesData.find((c) => c.id === courseId);
  const questions: Question[] = (quizData as any)[courseId]?.[topicId] || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!course || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Quiz Not Available</h1>
          <p className="text-slate-600 mb-6">This topic doesn&apos;t have a quiz yet.</p>
          <Link href={`/docs/${courseId}`}>
            <Button>Back to Course Docs</Button>
          </Link>
        </div>
      </div>
    );
  }

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

    storage.saveQuizScore(courseId, topicId, correctCount, questions.length);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 60;

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href={`/docs/${courseId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course Docs
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="border-2">
            <CardHeader className="text-center pb-8">
              <div
                className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  passed ? 'bg-green-100' : 'bg-orange-100'
                }`}
              >
                <Trophy
                  className={`h-12 w-12 ${passed ? 'text-green-600' : 'text-orange-600'}`}
                />
              </div>
              <CardTitle className="text-3xl mb-4">
                {passed ? 'Congratulations!' : 'Good Effort!'}
              </CardTitle>
              <p className="text-lg text-slate-600">
                {passed
                  ? 'You have passed this quiz!'
                  : 'Keep learning and try again!'}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Score</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {score} / {questions.length}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Percentage</p>
                  <p className="text-2xl font-bold text-slate-900">{percentage}%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <Badge
                    className={`text-sm ${
                      passed
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    {passed ? 'Passed' : 'Not Passed'}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Review Answers</h3>
                <div className="space-y-4">
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
                        <div className="flex items-start gap-3 mb-2">
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
                <Button onClick={handleRetake} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Link href={`/docs/${courseId}`} className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Continue Learning
                  </Button>
                </Link>
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/docs/${courseId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course Docs
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-slate-900">Topic Quiz</h1>
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

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

            <div className="flex justify-between pt-6">
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
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === undefined}>
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
