ALTER TABLE "board" RENAME TO "boards";--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_columns_unique";--> statement-breakpoint
ALTER TABLE "boards" DROP CONSTRAINT "board_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boards" ADD CONSTRAINT "boards_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "boards" ADD CONSTRAINT "boards_columns_unique" UNIQUE("columns");