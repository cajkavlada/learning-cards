// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `learning-cards_${name}`);

export const topics = createTable(
  "topics",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1024 }),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const questions = createTable(
  "questions",
  {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    markedAsLearned: boolean("marked_as_learned").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    topicId: integer("topic_id")
      .references(() => topics.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (example) => ({
    nameIndex: index("topic_idx").on(example.topicId),
    createdAtIndex: index("created_idx").on(example.createdAt),
    learnedIndex: index("learned_idx").on(example.markedAsLearned),
  }),
);

// Define the relations
export const questionsRelations = relations(questions, ({ one }) => ({
  topic: one(topics, {
    fields: [questions.topicId],
    references: [topics.id],
  }),
}));

export const topicsRelations = relations(topics, ({ many }) => ({
  questions: many(questions),
}));
