# Production Deploy: Report Original Filename

Tujuan perubahan ini:
- Menyimpan nama file asli upload report di kolom `Report.original_filename`
- Menggunakan nama file asli tersebut saat download report dari endpoint publik

## Fakta penting dari production saat ini

- Kolom berikut **sudah ada** di database production:
  - `NewsNews.report_id`
  - `ServiceId.desc_sort`
  - `ServiceEn.desc_sort`
- Kolom berikut **belum ada** di database production:
  - `Report.original_filename`
- Database production saat ini **tidak memiliki** tabel `_prisma_migrations`

Karena itu, **jangan** mengandalkan `prisma migrate deploy` sebagai langkah pertama di production ini.

## Langkah deploy yang aman

1. Backup database production terlebih dahulu.

2. Jalankan SQL additive berikut di production:

```sql
ALTER TABLE "Report"
ADD COLUMN IF NOT EXISTS "original_filename" TEXT;
```

3. Deploy backend code terbaru.

4. Deploy frontend CMS terbaru.

5. Smoke test:
   - Login CMS
   - Buat report baru dengan upload file
   - Pastikan record report berhasil tersimpan
   - Download file dari investor/client flow
   - Pastikan nama file hasil download sama dengan nama file upload
   - Edit report dengan file baru
   - Download ulang dan cek nama file

## Catatan penting

- Existing report lama yang belum punya `original_filename` tetap aman.
- Code akan fallback ke nama file dari URL jika `original_filename` masih `NULL`.
- Local-only storage fallback tidak mengubah production selama env production tetap memakai `STORAGE_PROVIDER=webdav` atau tidak mengisi variabel tersebut sama sekali.
- Revalidate error di production tidak di-ignore kecuali `IGNORE_REVALIDATE_ERRORS=true` di-set secara sengaja.
