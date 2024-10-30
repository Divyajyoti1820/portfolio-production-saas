CREATE TABLE IF NOT EXISTS "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"columnId" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"subtasks" jsonb DEFAULT '[{"title":"subtask-1","isCompleted":false}]'::jsonb NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_columnId_columns_id_fk" FOREIGN KEY ("columnId") REFERENCES "public"."columns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
