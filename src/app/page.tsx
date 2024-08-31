export default function HomePage() {
  const cardList = [
    {
      id: 1,
      question: "Question 1",
      answer: "Answer 1",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      question: "Question 2",
      answer: "Answer 2",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      question: "Question 3",
      answer: "Answer 3",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      question: "Question 4",
      answer: "Answer 4",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      question: "Question 5",
      answer: "Answer 5",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      question: "Question 6",
      answer: "Answer 6",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 7,
      question: "Question 7",
      answer: "Answer 7",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 8,
      question: "Question 8",
      answer: "Answer 8",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 9,
      question: "Question 9",
      answer: "Answer 9",
      markedAsLearned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="pb-4 text-4xl font-bold">Card list</h1>
      <ul className="flex w-full flex-col gap-4 px-4">
        {cardList.map((card) => (
          <li
            key={card.id}
            className="rounded-lg bg-white p-4 text-black shadow-md"
          >
            <div className="flex justify-between gap-4">
              <div>{card.question}</div>
              <div>{card.answer}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
