ALTER TABLE "ServiceId"
ADD COLUMN IF NOT EXISTS "desc_sort" TEXT;

ALTER TABLE "ServiceEn"
ADD COLUMN IF NOT EXISTS "desc_sort" TEXT;

ALTER TABLE "NewsNews"
ADD COLUMN IF NOT EXISTS "report_id" TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'NewsNews_report_id_fkey'
    ) THEN
        ALTER TABLE "NewsNews"
        ADD CONSTRAINT "NewsNews_report_id_fkey"
        FOREIGN KEY ("report_id") REFERENCES "Report"("id")
        ON DELETE SET NULL
        ON UPDATE CASCADE;
    END IF;
END $$;
