ALTER TABLE "boards" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "columns" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "columns" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "updatedAt" timestamp;