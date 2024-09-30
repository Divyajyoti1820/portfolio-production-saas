ALTER TABLE "board" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD CONSTRAINT "board_columns_unique" UNIQUE("columns");