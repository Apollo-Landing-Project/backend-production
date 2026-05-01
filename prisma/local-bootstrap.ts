import { db } from "../src/lib/prisma.js";

async function ensureMetadata() {
	await db.metadata.createMany({
		data: [
			{
				destination: "homepage",
				title_id: "Beranda",
				title_en: "Home",
				description_id: "Halaman utama Apollo Global Interactive untuk pengembangan lokal.",
				description_en: "Apollo Global Interactive home page for local development.",
			},
			{
				destination: "aboutuspage",
				title_id: "Tentang Kami",
				title_en: "About Us",
				description_id: "Konten tentang kami untuk lingkungan lokal.",
				description_en: "About us content for the local environment.",
			},
			{
				destination: "investorpage",
				title_id: "Hubungan Investor",
				title_en: "Investor Relations",
				description_id: "Data investor lokal untuk kebutuhan pengujian.",
				description_en: "Local investor data for development testing.",
			},
			{
				destination: "newspage",
				title_id: "Berita & CSR",
				title_en: "News & CSR",
				description_id: "Data berita lokal untuk kebutuhan pengujian.",
				description_en: "Local news data for development testing.",
			},
			{
				destination: "servicepage",
				title_id: "Layanan Kami",
				title_en: "Our Services",
				description_id: "Data layanan lokal untuk kebutuhan pengujian.",
				description_en: "Local service data for development testing.",
			},
		],
		skipDuplicates: true,
	});
}

async function ensureHomePage() {
	const existing = await db.homePage.findFirst();
	if (existing) return;

	await db.homePage.create({
		data: {
			isActive: true,
			about_us_years_exp: 12,
			about_us_products: 24,
			about_us_countries: 3,
			about_us_brands: 8,
			contact_email: ["hello@apollo.local"],
			contact_phone: ["+62 000 0000 0000"],
			contact_link_map: "https://maps.google.com",
			contact_address: "Jakarta, Indonesia",
			homePageId: {
				create: {
					about_us_badge: "Tentang Kami",
					about_us_title: "Solusi mobilitas untuk lingkungan lokal",
					about_us_desc: "Konten bootstrap lokal untuk menguji landing page dan CMS.",
					services_badge: "Layanan",
					services_title: "Layanan Apollo",
					services_desc: "Data lokal untuk pengujian.",
					news_badge: "Berita",
					news_title: "Kabar Terbaru",
					news_desc: "Belum ada berita lokal.",
					partners_badge: "Mitra",
					partners_title: "Mitra Apollo",
					partners_desc: "Belum ada mitra lokal.",
					contact_title: "Hubungi Kami",
					contact_desc: "Kontak lokal untuk pengujian.",
				},
			},
			homePageEn: {
				create: {
					about_us_badge: "About Us",
					about_us_title: "Mobility solutions for local development",
					about_us_desc: "Local bootstrap content to test the landing page and CMS.",
					services_badge: "Services",
					services_title: "Apollo Services",
					services_desc: "Local data for development testing.",
					news_badge: "News",
					news_title: "Latest Updates",
					news_desc: "No local news yet.",
					partners_badge: "Partners",
					partners_title: "Apollo Partners",
					partners_desc: "No local partners yet.",
					contact_title: "Contact Us",
					contact_desc: "Local contact details for testing.",
				},
			},
			heroSlides: {
				create: [
					{
						order: 1,
						title_id: "Apollo Local Development",
						desc_id: "Hero lokal untuk kebutuhan pengujian.",
						title_en: "Apollo Local Development",
						desc_en: "Local hero content for development testing.",
					},
				],
			},
		},
	});
}

async function ensureAboutPage() {
	const existing = await db.aboutUsPage.findFirst();
	if (existing) return;

	await db.aboutUsPage.create({
		data: {
			isActive: true,
			aboutUsPageId: {
				create: {
					hero_badge: "Tentang Kami",
					hero_title: "Apollo Lokal",
					hero_desc: "Halaman about us lokal untuk testing.",
					vision_badge: "Visi",
					vision_title: "Visi Lokal",
					vision_desc: "Visi bootstrap lokal.",
					vision_quote: "Membangun pengembangan yang stabil.",
					vision_list: ["Konsisten", "Terukur"],
					mission_badge: "Misi",
					mission_title: "Misi Lokal",
					mission_desc: "Misi bootstrap lokal.",
					mission_quote: "Pengujian tanpa menyentuh production.",
					mission_list: ["Aman", "Terisolasi"],
					history_badge: "Sejarah",
					history_title: "Perjalanan Lokal",
					history_desc: "Data sejarah lokal.",
					company_structure_badge: "Struktur",
					company_structure_title: "Struktur Perusahaan",
					company_structure_desc: "Struktur lokal untuk pengujian.",
					boc_badge: "BOC",
					boc_title: "Board of Commissioners",
					boc_desc: "Belum ada anggota lokal.",
					bod_badge: "BOD",
					bod_title: "Board of Directors",
					bod_desc: "Belum ada anggota lokal.",
				},
			},
			aboutUsPageEn: {
				create: {
					hero_badge: "About Us",
					hero_title: "Apollo Local",
					hero_desc: "Local about us page for testing.",
					vision_badge: "Vision",
					vision_title: "Local Vision",
					vision_desc: "Local bootstrap vision.",
					vision_quote: "Build a stable development environment.",
					vision_list: ["Consistent", "Measurable"],
					mission_badge: "Mission",
					mission_title: "Local Mission",
					mission_desc: "Local bootstrap mission.",
					mission_quote: "Testing without touching production.",
					mission_list: ["Safe", "Isolated"],
					history_badge: "History",
					history_title: "Local Journey",
					history_desc: "Local history data.",
					company_structure_badge: "Structure",
					company_structure_title: "Company Structure",
					company_structure_desc: "Local company structure for testing.",
					boc_badge: "BOC",
					boc_title: "Board of Commissioners",
					boc_desc: "No local members yet.",
					bod_badge: "BOD",
					bod_title: "Board of Directors",
					bod_desc: "No local members yet.",
				},
			},
		},
	});
}

async function ensureServicePage() {
	const existing = await db.servicePage.findFirst();
	if (existing) return;

	await db.servicePage.create({
		data: {
			isActive: true,
			servicePageId: {
				create: {
					hero_badge: "Layanan",
					hero_title: "Layanan Apollo",
					hero_desc: "Halaman layanan lokal untuk pengujian.",
					used_car_gallery_badge: "Galeri",
					used_car_gallery_title: "Galeri Mobil",
					used_car_gallery_desc: "Belum ada galeri lokal.",
				},
			},
			servicePageEn: {
				create: {
					hero_badge: "Services",
					hero_title: "Apollo Services",
					hero_desc: "Local services page for testing.",
					used_car_gallery_badge: "Gallery",
					used_car_gallery_title: "Car Gallery",
					used_car_gallery_desc: "No local gallery items yet.",
				},
			},
		},
	});
}

async function ensureNewsPage() {
	const existing = await db.newsPage.findFirst();
	if (existing) return;

	await db.newsPage.create({
		data: {
			isActive: true,
			newsPageId: {
				create: {
					hero_badge: "Berita & CSR",
					hero_title: "Berita Apollo",
					hero_desc: "Halaman berita lokal untuk pengujian.",
					news_badge: "Berita",
					news_title: "Berita Terbaru",
					news_desc: "Belum ada berita lokal.",
					csr_badge: "CSR",
					csr_title: "CSR",
					csr_desc: "Belum ada CSR lokal.",
				},
			},
			newsPageEn: {
				create: {
					hero_badge: "News & CSR",
					hero_title: "Apollo News",
					hero_desc: "Local news page for testing.",
					news_badge: "News",
					news_title: "Latest News",
					news_desc: "No local news yet.",
					csr_badge: "CSR",
					csr_title: "CSR",
					csr_desc: "No local CSR items yet.",
				},
			},
		},
	});
}

async function ensureInvestorPage() {
	const existing = await db.investorPage.findFirst();
	if (existing) return;

	await db.investorPage.create({
		data: {
			isActive: true,
			inverstorPageId: {
				create: {
					hero_badge: "Hubungan Investor",
					hero_title: "Investor Apollo",
					hero_desc: "Halaman investor lokal untuk pengujian.",
					stakeholders_badge: "Pemegang Saham",
					stakeholders_title: "Komposisi Pemegang Saham",
					stakeholders_desc: "Data pemegang saham lokal.",
					report_badge: "Laporan",
					report_title: "Dokumen Investor",
					report_desc: "Belum ada laporan lokal.",
				},
			},
			inverstorPageEn: {
				create: {
					hero_badge: "Investor Relations",
					hero_title: "Apollo Investors",
					hero_desc: "Local investor page for testing.",
					stakeholders_badge: "Stakeholders",
					stakeholders_title: "Shareholder Composition",
					stakeholders_desc: "Local shareholder data.",
					report_badge: "Reports",
					report_title: "Investor Documents",
					report_desc: "No local reports yet.",
				},
			},
		},
	});
}

async function ensureShares() {
	await db.shares.createMany({
		data: [
			{ category: "Public", value: "45" },
			{ category: "Majority", value: "55" },
		],
		skipDuplicates: true,
	});
}

async function ensureReportCategory() {
	await db.reportCategory.createMany({
		data: [
			{
				name: "Annual Report",
				description: "Bootstrap category for local testing.",
			},
		],
		skipDuplicates: true,
	});
}

async function main() {
	await ensureMetadata();
	await ensureHomePage();
	await ensureAboutPage();
	await ensureServicePage();
	await ensureNewsPage();
	await ensureInvestorPage();
	await ensureShares();
	await ensureReportCategory();

	console.log("Local bootstrap completed");
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await db.$disconnect();
		process.exit(1);
	});
