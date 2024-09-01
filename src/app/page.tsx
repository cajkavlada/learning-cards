import { db } from "~/server/db";

export default async function HomePage() {
  const questions = await db.query.questions.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="pb-4 text-4xl font-bold">Card list</h1>
      <ul className="flex w-full flex-col gap-4 px-4">
        {questions.map((q) => (
          <li
            key={q.id}
            className="rounded-lg bg-white p-4 text-black shadow-md"
          >
            <div className="flex justify-between gap-4">
              <div>{q.question}</div>
              <div>{q.answer}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
