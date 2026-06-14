import { db } from "../lib/prisma.js";
import { envConfig } from "../config/env.config.js";
const buildReportDownloadUrl = (reportId) => reportId ? `${envConfig.api_url}/client/download/${reportId}` : null;
const normalizeTitle = (value) => {
    if (typeof value !== "string")
        return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
};
export class ClientAllService {
    static async resolveLinkedReport(options) {
        if (options.reportId) {
            const directReport = await db.report.findUnique({
                where: { id: options.reportId },
                select: { id: true, file_url: true },
            });
            if (directReport)
                return directReport;
        }
        const titles = [normalizeTitle(options.titleId), normalizeTitle(options.titleEn)].filter((value) => Boolean(value));
        if (titles.length === 0)
            return null;
        return await db.report.findFirst({
            where: {
                OR: titles.flatMap((title) => [{ title_id: title }, { title_en: title }]),
            },
            select: { id: true, file_url: true },
        });
    }
    static async getMetadata(lang, destination) {
        const metadata = await db.metadata.findUnique({
            where: {
                destination,
            },
        });
        if (!metadata)
            throw new Error("Metadata not found");
        const metadatafilter = {
            title: lang === "en" ? metadata.title_en : metadata.title_id,
            description: lang === "en" ? metadata.description_en : metadata.description_id,
        };
        return metadatafilter;
    }
    static async getHomePage(lang) {
        const home = await db.homePage.findFirst({
            where: {
                isActive: true,
            },
            include: {
                heroSlides: true,
            },
        });
        if (!home)
            throw new Error("Home Page not found");
        // Fetch content separately to avoid potential Prisma include issues
        const [homePageEn, homePageId] = await Promise.all([
            db.homePageEn.findUnique({ where: { homePageId: home.id } }),
            db.homePageId.findUnique({ where: { homePageId: home.id } }),
        ]);
        const content = lang === "en" ? homePageEn : homePageId;
        if (!content)
            throw new Error("Home Page Content not found");
        const serviceItems = await db.service.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: "asc",
            },
            include: {
                serviceEn: true,
                serviceId: true,
            },
        });
        const newsItems = await db.newsNews.findMany({
            where: {
                isPublished: true,
            },
            orderBy: {
                publishedAt: "desc",
            },
            include: {
                newsNewsEn: true,
                newsNewsId: true,
            },
            take: 5,
        });
        const partnersFunding = await db.partner.findMany({
            where: {
                category: "FUNDING",
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        const partnersInsurance = await db.partner.findMany({
            where: {
                category: "INSURANCE",
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        const heroSlides = lang == "en" ?
            home.heroSlides.map((slide) => ({
                id: slide.id,
                title: slide.title_en,
                desc: slide.desc_en,
                background: slide.bg_image,
            }))
            : home.heroSlides.map((slide) => ({
                id: slide.id,
                title: slide.title_id,
                desc: slide.desc_id,
                background: slide.bg_image,
            }));
        const homeNewsItems = await Promise.all(newsItems.map(async (item) => {
            const linkedReport = await this.resolveLinkedReport({
                reportId: item.report_id,
                titleId: item.newsNewsId?.title,
                titleEn: item.newsNewsEn?.title,
            });
            return {
                id: item.id,
                title: lang === "en" ? item.newsNewsEn?.title : item.newsNewsId?.title,
                desc: lang === "en" ?
                    item.newsNewsEn?.description
                    : item.newsNewsId?.description,
                publishedAt: item.publishedAt,
                image: item.image,
                has_report: !!linkedReport,
                report_id: linkedReport?.id ?? null,
                download_url: buildReportDownloadUrl(linkedReport?.id),
                file_url: linkedReport?.file_url ?? null,
            };
        }));
        return {
            hero: heroSlides,
            aboutUs: {
                badge: content.about_us_badge,
                title: content.about_us_title,
                desc: content.about_us_desc,
                yearsExp: home.about_us_years_exp,
                products: home.about_us_products,
                countries: home.about_us_countries,
                brands: home.about_us_brands,
            },
            services: {
                badge: content.services_badge,
                title: content.services_title,
                desc: content.services_desc,
                items: serviceItems.map((svc) => {
                    const svcContent = lang === "en" ? svc.serviceEn : svc.serviceId;
                    return {
                        badge: svcContent?.badge,
                        title: svcContent?.title,
                        desc: svcContent?.desc_sort || svcContent?.desc,
                        background: svc.bg_image,
                    };
                }),
            },
            news: {
                badge: content.news_badge,
                title: content.news_title,
                desc: content.news_desc,
                items: homeNewsItems,
            },
            partners: {
                badge: content.partners_badge,
                title: content.partners_title,
                desc: content.partners_desc,
                funding: partnersFunding.map((p) => ({ name: p.name, logo: p.logo_image })),
                insurance: partnersInsurance.map((p) => ({
                    name: p.name,
                    logo: p.logo_image,
                })),
            },
            contact: {
                title: content.contact_title,
                desc: content.contact_desc,
                email: home.contact_email,
                phone: home.contact_phone,
                address: home.contact_address,
                mapLink: home.contact_link_map,
            },
        };
    }
    static async getAboutUsPage(lang) {
        const aboutUs = await db.aboutUsPage.findFirst({
            where: {
                isActive: true,
            },
            include: {
                governances: true,
                companyStructures: true,
            },
        });
        if (!aboutUs)
            throw new Error("About Us Page not found");
        // Fetch content separately to avoid potential Prisma include issues
        const [aboutUsEn, aboutUsId] = await Promise.all([
            db.aboutUsPageEn.findUnique({ where: { aboutUsPageId: aboutUs.id } }),
            db.aboutUsPageId.findUnique({ where: { aboutUsPageId: aboutUs.id } }),
        ]);
        const content = lang === "en" ? aboutUsEn : aboutUsId;
        if (!content)
            throw new Error("About Us Page Content not found");
        // Separate governance into BOC and BOD
        const bocMembers = aboutUs.governances
            .filter((g) => g.position === "BOC")
            .map((g) => ({
            name: g.name,
            photo: g.photo_image,
            position: g.position_desc,
        }));
        const bodMembers = aboutUs.governances
            .filter((g) => g.position === "BOD")
            .map((g) => ({
            name: g.name,
            photo: g.photo_image,
            position: g.position_desc,
        }));
        return {
            hero: {
                badge: content.hero_badge,
                title: content.hero_title,
                desc: content.hero_desc,
                background: aboutUs.hero_bg,
            },
            vision: {
                badge: content.vision_badge,
                title: content.vision_title,
                desc: content.vision_desc,
                quote: content.vision_quote,
                list: content.vision_list,
                imageParent: aboutUs.vision_image_parent,
                imageChild: aboutUs.vision_image_child,
            },
            mission: {
                badge: content.mission_badge,
                title: content.mission_title,
                desc: content.mission_desc,
                quote: content.mission_quote,
                list: content.mission_list,
                imageParent: aboutUs.mission_image_parent,
                imageChild: aboutUs.mission_image_child,
            },
            history: {
                badge: content.history_badge,
                title: content.history_title,
                desc: content.history_desc,
                imageParent: aboutUs.history_image_parent,
                imageChild: aboutUs.history_image_child,
            },
            companyStructure: {
                badge: content.company_structure_badge,
                title: content.company_structure_title,
                desc: content.company_structure_desc,
                items: aboutUs.companyStructures.map((s) => ({
                    name: s.name,
                    icon: s.icon_image,
                })),
            },
            boc: {
                badge: content.boc_badge,
                title: content.boc_title,
                desc: content.boc_desc,
                members: bocMembers,
            },
            bod: {
                badge: content.bod_badge,
                title: content.bod_title,
                desc: content.bod_desc,
                members: bodMembers,
            },
        };
    }
    static async getServicePage(lang) {
        // 1. Get active ServicePage
        const servicePage = await db.servicePage.findFirst({
            where: {
                isActive: true,
            },
        });
        if (!servicePage)
            throw new Error("Service Page not found");
        // Fetch content separately to avoid potential Prisma include issues
        const [servicePageEn, servicePageId] = await Promise.all([
            db.servicePageEn.findUnique({ where: { servicePageId: servicePage.id } }),
            db.servicePageId.findUnique({ where: { servicePageId: servicePage.id } }),
        ]);
        const pageContent = lang === "en" ? servicePageEn : servicePageId;
        if (!pageContent)
            throw new Error("Service Page Content not found");
        // 2. Get active Services
        const services = await db.service.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: "asc",
            },
            include: {
                serviceEn: true,
                serviceId: true,
            },
        });
        const serviceItems = services.map((svc) => {
            const svcContent = lang === "en" ? svc.serviceEn : svc.serviceId;
            return {
                badge: svcContent?.badge,
                id: svc.id,
                image: svc.bg_image,
                order: svc.order,
                title: svcContent?.title,
                desc: svcContent?.desc,
                desc_sort: svcContent?.desc_sort,
                location: svcContent?.location,
                contact: svcContent?.contact,
                email: svcContent?.email,
                quote: svcContent?.quote,
            };
        });
        // 3. Get CarGallery
        const carGalleries = await db.carGallery.findMany({
            include: {
                carGalleryEn: true,
                carGalleryId: true,
            },
        });
        const galleryItems = carGalleries.map((gallery) => {
            const galleryContent = lang === "en" ? gallery.carGalleryEn : gallery.carGalleryId;
            return {
                id: gallery.id,
                image: gallery.car_image,
                title: galleryContent?.title,
                desc: galleryContent?.desc,
            };
        });
        return {
            hero: {
                badge: pageContent.hero_badge,
                title: pageContent.hero_title,
                desc: pageContent.hero_desc,
                background: servicePage.hero_bg,
            },
            services: serviceItems,
            usedCarGallery: {
                badge: pageContent.used_car_gallery_badge,
                title: pageContent.used_car_gallery_title,
                desc: pageContent.used_car_gallery_desc,
                items: galleryItems,
            },
        };
    }
    static async getNewsPage(lang) {
        // 1. Get active NewsPage
        const newsPage = await db.newsPage.findFirst({
            where: { isActive: true },
        });
        if (!newsPage)
            throw new Error("News Page not found");
        // Fetch content separately to avoid potential Prisma include issues
        const [newsPageEn, newsPageId] = await Promise.all([
            db.newsPageEn.findUnique({ where: { newsPageId: newsPage.id } }),
            db.newsPageId.findUnique({ where: { newsPageId: newsPage.id } }),
        ]);
        const pageContent = lang === "en" ? newsPageEn : newsPageId;
        if (!pageContent)
            throw new Error("News Page Content not found");
        // 2. Get published NewsNews
        const newsNewsList = await db.newsNews.findMany({
            where: { isPublished: true },
            orderBy: { publishedAt: "desc" },
            include: {
                newsNewsEn: true,
                newsNewsId: true,
            },
        });
        const newsItems = await Promise.all(newsNewsList.map(async (item) => {
            const content = lang === "en" ? item.newsNewsEn : item.newsNewsId;
            const linkedReport = await this.resolveLinkedReport({
                reportId: item.report_id,
                titleId: item.newsNewsId?.title,
                titleEn: item.newsNewsEn?.title,
            });
            return {
                id: item.id,
                title: content?.title,
                description: content?.description,
                image: item.image,
                author: item.author,
                authorImage: item.author_image,
                publishedAt: item.publishedAt,
                has_report: !!linkedReport,
                report_id: linkedReport?.id ?? null,
                download_url: buildReportDownloadUrl(linkedReport?.id),
                file_url: linkedReport?.file_url ?? null,
            };
        }));
        // 3. Get published NewsCSR
        const csrList = await db.newsCSR.findMany({
            where: { isPublished: true },
            orderBy: { publishedAt: "desc" },
            include: {
                newsCSREn: true,
                newsCSRId: true,
                newsCSRImage: true,
            },
        });
        const csrItems = csrList.map((item) => {
            const content = lang === "en" ? item.newsCSREn : item.newsCSRId;
            return {
                id: item.id,
                title: content?.title,
                description: content?.description,
                author: item.author,
                authorImage: item.author_image,
                publishedAt: item.publishedAt,
                images: item.newsCSRImage.map((img) => ({
                    id: img.id,
                    image: img.image,
                    description: lang === "en" ? img.description_en : img.description_id,
                })),
            };
        });
        return {
            id: newsPage.id,
            hero: {
                badge: pageContent.hero_badge,
                title: pageContent.hero_title,
                desc: pageContent.hero_desc,
                background: newsPage.hero_bg,
            },
            news: newsItems,
            csr: csrItems,
        };
    }
    static async getNewsDetail(id, lang) {
        const news = await db.newsNews.findUnique({
            where: { id },
            include: {
                newsNewsEn: true,
                newsNewsId: true,
            },
        });
        if (!news)
            throw new Error("News not found");
        const content = lang === "en" ? news.newsNewsEn : news.newsNewsId;
        if (!content)
            throw new Error("News Content not found");
        const linkedReport = await this.resolveLinkedReport({
            reportId: news.report_id,
            titleId: news.newsNewsId?.title,
            titleEn: news.newsNewsEn?.title,
        });
        return {
            id: news.id,
            title: content.title,
            description: content.description,
            content: content.content,
            image: news.image,
            author: news.author,
            authorImage: news.author_image,
            publishedAt: news.publishedAt,
            has_report: !!linkedReport,
            report_id: linkedReport?.id ?? null,
            download_url: buildReportDownloadUrl(linkedReport?.id),
            attachment: linkedReport?.file_url ?? buildReportDownloadUrl(linkedReport?.id),
            file_url: linkedReport?.file_url ?? null,
        };
    }
    static async getNewsCSRDetail(id, lang) {
        const news = await db.newsCSR.findUnique({
            where: { id },
            include: {
                newsCSREn: true,
                newsCSRId: true,
                newsCSRImage: true,
            },
        });
        if (!news)
            throw new Error("News CSR not found");
        const content = lang === "en" ? news.newsCSREn : news.newsCSRId;
        if (!content)
            throw new Error("News CSR Content not found");
        return {
            id: news.id,
            title: content.title,
            description: content.description,
            content: content.content,
            image: news.newsCSRImage.map((img) => ({
                image: img.image,
                description: lang === "en" ? img.description_en : img.description_id,
            })),
            author: news.author,
            authorImage: news.author_image,
            publishedAt: news.publishedAt,
        };
    }
    static async getInvestorRelationPage(lang) {
        const investorRelationPage = await db.investorPage.findFirst({
            where: { isActive: true },
        });
        if (!investorRelationPage)
            throw new Error("Investor Relation Page not found");
        // Fetch content separately to avoid potential Prisma include issues
        const [inverstorPageEn, inverstorPageId] = await Promise.all([
            db.investorPageEn.findUnique({ where: { investorPageId: investorRelationPage.id } }),
            db.investorPageId.findUnique({ where: { investorPageId: investorRelationPage.id } }),
        ]);
        const pageContent = lang === "en" ? inverstorPageEn : inverstorPageId;
        if (!pageContent)
            throw new Error("Investor Relation Page Content not found");
        // Saham
        const shares = await db.shares.findMany({
            orderBy: { createdAt: "asc" },
        });
        // Reports
        const reports = await db.report.findMany({
            where: {
                is_publish: true,
                news: { none: {} }, // Only reports WITHOUT news
            },
            orderBy: {
                publish_at: "desc",
            },
            include: {
                reportCategory: true,
                news: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        return {
            id: investorRelationPage.id,
            hero: {
                badge: pageContent.hero_badge,
                title: pageContent.hero_title,
                desc: pageContent.hero_desc,
                background: investorRelationPage.hero_bg,
            },
            stakeholders: {
                badge: pageContent.stakeholders_badge,
                title: pageContent.stakeholders_title,
                desc: pageContent.stakeholders_desc,
                shares: shares,
            },
            report: {
                badge: pageContent.report_badge,
                title: pageContent.report_title,
                desc: pageContent.report_desc,
                reportItems: reports.map((report) => ({
                    id: report.id,
                    news_id: report.news[0]?.id,
                    title: lang === "en" ? report.title_en : report.title_id,
                    description: lang === "en" ? report.description_en : report.description_id,
                    file_url: report.file_url,
                    original_filename: report.original_filename,
                    published_at: report.publish_at,
                    category: report.reportCategory.name,
                })),
            },
        };
    }
}
//# sourceMappingURL=clientAllPage.services.js.map