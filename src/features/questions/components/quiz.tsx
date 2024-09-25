// "use client";

// import { Button, SimpleTooltip } from "../../../components/ui";
// import type { Question } from "~/features/questions/types";
// import { useServerAction } from "zsa-react";
// import { shuffleQuizQuestions } from "../../topics/actions";
// import { LoadingButton } from "~/components/form";
// import { useState } from "react";
// import { PageHeader } from "~/components/layout/pageHeader";
// import { SanitizedHTML } from "~/components/common/SanitizedHTML";
// import {
//   BookOpen,
//   BookOpenCheck,
//   ChevronLeft,
//   GraduationCap,
// } from "lucide-react";
// import { QuizQuestion } from "./quizQuestion";
// import { set } from "zod";
// import { cn } from "~/lib/utils";

// export function Quiz({
//   title,
//   questions,
// }: {
//   title: string;
//   questions: Question[];
// }) {
//   const { isPending: shuffling, execute: shuffle } =
//     useServerAction(shuffleQuizQuestions);

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [showAnswer, setShowAnswer] = useState(false);

//   const [questionLearned, setQuestionLearned] = useState(false);

//   const currentQuestion = questions[currentQuestionIndex];
//   if (!currentQuestion) return null;

//   return (
//     <>
//       <PageHeader title={title}>
//         <LoadingButton loading={shuffling} onClick={restartQuiz}>
//           Restart
//         </LoadingButton>
//       </PageHeader>
//       <div className="px-4">
//         <h2 className="mb-4 text-xl font-bold">
//           Question {currentQuestionIndex + 1}/{questions.length}
//         </h2>
//         <div className="flex w-full flex-1 flex-col py-4">
//           <QuizQuestion question={currentQuestion} revealed={showAnswer} />
//           <div className="flex justify-end gap-2">
//             {currentQuestionIndex > 0 && (
//               <Button
//                 className="mr-auto min-w-9 p-0"
//                 onClick={handlePreviousQuestion}
//                 variant="outline"
//               >
//                 <ChevronLeft size={16} />
//               </Button>
//             )}
//             {!showAnswer && (
//               <Button onClick={() => setShowAnswer(true)}>Reveal Answer</Button>
//             )}
//             {showAnswer && currentQuestionIndex < questions.length - 1 && (
//               <>
//                 <SimpleTooltip
//                   content={
//                     questionLearned ? "Question learned" : "Mark as learned"
//                   }
//                 >
//                   <Button
//                     className="min-w-9 p-0"
//                     onClick={handleMarkAsLearned}
//                     variant="outline"
//                   >
//                     {questionLearned ? (
//                       <BookOpenCheck size={16} className="text-green-700" />
//                     ) : (
//                       <BookOpen size={16} />
//                     )}
//                   </Button>
//                 </SimpleTooltip>
//                 <Button onClick={handleNextQuestion}>Next Question</Button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   function handleMarkAsLearned() {
//     setQuestionLearned((prev) => !prev);
//   }

//   function handleNextQuestion() {
//     setShowAnswer(false);
//     setQuestionLearned(false);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//   }

//   function handlePreviousQuestion() {
//     setShowAnswer(false);
//     setQuestionLearned(false);
//     setCurrentQuestionIndex(currentQuestionIndex - 1);
//   }

//   async function restartQuiz() {
//     await shuffle();
//     setCurrentQuestionIndex(0);
//     setShowAnswer(false);
//   }
// }
