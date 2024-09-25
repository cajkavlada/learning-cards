import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `learning-cards_${name}`);

export const topics = createTable(
  "topics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1024 }),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (item) => ({
    topicNameIndex: index("topic_name_idx").on(item.name),
  }),
);

export const topicsRelations = relations(topics, ({ many }) => ({
  questions: many(questions),
  quizesToTopics: many(quizToTopics),
}));

export const questions = createTable(
  "questions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    markedAsLearned: boolean("marked_as_learned").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    topicId: uuid("topic_id")
      .references(() => topics.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (item) => ({
    topicIdIndex: index("topic_id_idx").on(item.topicId),
    learnedIndex: index("learned_idx").on(item.markedAsLearned),
  }),
);

export const questionsRelations = relations(questions, ({ one }) => ({
  topic: one(topics, {
    fields: [questions.topicId],
    references: [topics.id],
  }),
}));

export const quizToTopics = createTable(
  "quiz_to_topics",
  {
    quizId: uuid("quiz_id")
      .references(() => quizSessions.quizId, {
        onDelete: "cascade",
      })
      .notNull(),
    topicId: uuid("topic_id")
      .references(() => topics.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (item) => ({
    pk: primaryKey({ columns: [item.quizId, item.topicId] }),
    quizTopicIndex: index("quiz_topic_idx").on(item.quizId, item.topicId),
  }),
);

export const quizToTopicsRelations = relations(quizToTopics, ({ one }) => ({
  quiz: one(quizSessions, {
    fields: [quizToTopics.quizId],
    references: [quizSessions.quizId],
  }),
  topic: one(topics, {
    fields: [quizToTopics.topicId],
    references: [topics.id],
  }),
}));

export const quizSessions = createTable("quiz_sessions", {
  userId: varchar("user_id", { length: 255 }).primaryKey(),
  quizId: uuid("quiz_id").notNull(),
  questionsIds: uuid("question_ids").array().notNull(),
  currentQuestionIndex: integer("current_question_index").default(0).notNull(),
  startedAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const quizSessionsRelations = relations(quizSessions, ({ many }) => ({
  quizToTopics: many(quizToTopics),
}));
