CREATE TYPE "public"."application_status" AS ENUM('draft', 'submitted', 'under_review', 'offer_received', 'accepted', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'non-binary', 'prefer-not-to-say');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('pending', 'scheduled', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."study_level" AS ENUM('Undergraduate', 'Postgraduate', 'MBBS');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"university_id" text NOT NULL,
	"course_id" text NOT NULL,
	"status" "application_status" DEFAULT 'submitted' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "counsellings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"study_level" "study_level" NOT NULL,
	"message" text NOT NULL,
	"preferred_days" jsonb NOT NULL,
	"preferred_time_ranges" jsonb NOT NULL,
	"counsellor_id" uuid,
	"scheduled_time" timestamp with time zone,
	"meeting_link" text,
	"status" "request_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "counsellors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"designation" text NOT NULL,
	"bio" text NOT NULL,
	"photo" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"experience_years" integer DEFAULT 0 NOT NULL,
	"total_sessions_conducted" integer DEFAULT 0 NOT NULL,
	"rating" real DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "counsellors_email_unique" UNIQUE("email"),
	CONSTRAINT "counsellors_rating_range" CHECK ("counsellors"."rating" >= 0 AND "counsellors"."rating" <= 5),
	CONSTRAINT "counsellors_experience_years_min" CHECK ("counsellors"."experience_years" >= 0),
	CONSTRAINT "counsellors_sessions_min" CHECK ("counsellors"."total_sessions_conducted" >= 0)
);
--> statement-breakpoint
CREATE TABLE "preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"country_filter" text,
	"country_name" text,
	"stream_filter" text,
	"stream_name" text,
	"level_filter" text,
	"delivery_method_filter" text,
	"study_language_filter" text,
	"course_offering_filter" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"avatar" text DEFAULT 'avatar_01.png' NOT NULL,
	"phone" text,
	"date_of_birth" text,
	"gender" "gender",
	"country" text,
	"secondary_email" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "counsellings" ADD CONSTRAINT "counsellings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "counsellings" ADD CONSTRAINT "counsellings_counsellor_id_counsellors_id_fk" FOREIGN KEY ("counsellor_id") REFERENCES "public"."counsellors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_applications_user_id" ON "applications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_applications_university_id" ON "applications" USING btree ("university_id");--> statement-breakpoint
CREATE INDEX "idx_applications_status" ON "applications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_counsellings_user_id" ON "counsellings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_counsellings_counsellor_id" ON "counsellings" USING btree ("counsellor_id");--> statement-breakpoint
CREATE INDEX "idx_counsellings_status" ON "counsellings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_counsellors_is_active" ON "counsellors" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_preferences_user_id" ON "preferences" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_subscribers_email" ON "subscribers" USING btree ("email");