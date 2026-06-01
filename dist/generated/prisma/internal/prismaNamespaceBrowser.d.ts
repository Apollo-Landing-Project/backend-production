import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly HomePage: "HomePage";
    readonly HomePageId: "HomePageId";
    readonly HomePageEn: "HomePageEn";
    readonly HeroSlide: "HeroSlide";
    readonly AboutUsPage: "AboutUsPage";
    readonly AboutUsPageId: "AboutUsPageId";
    readonly AboutUsPageEn: "AboutUsPageEn";
    readonly Governance: "Governance";
    readonly CompanyStructure: "CompanyStructure";
    readonly NewsPage: "NewsPage";
    readonly NewsPageEn: "NewsPageEn";
    readonly NewsPageId: "NewsPageId";
    readonly ServicePage: "ServicePage";
    readonly ServicePageId: "ServicePageId";
    readonly ServicePageEn: "ServicePageEn";
    readonly Service: "Service";
    readonly ServiceId: "ServiceId";
    readonly ServiceEn: "ServiceEn";
    readonly CarGallery: "CarGallery";
    readonly CarGalleryId: "CarGalleryId";
    readonly CarGalleryEn: "CarGalleryEn";
    readonly Partner: "Partner";
    readonly NewsNews: "NewsNews";
    readonly NewsNewsId: "NewsNewsId";
    readonly NewsNewsEn: "NewsNewsEn";
    readonly NewsCSR: "NewsCSR";
    readonly NewsCSRImage: "NewsCSRImage";
    readonly NewsCSRId: "NewsCSRId";
    readonly NewsCSREn: "NewsCSREn";
    readonly InvestorPage: "InvestorPage";
    readonly InvestorPageId: "InvestorPageId";
    readonly InvestorPageEn: "InvestorPageEn";
    readonly Shares: "Shares";
    readonly Report: "Report";
    readonly ReportCategory: "ReportCategory";
    readonly Metadata: "Metadata";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly role: "role";
    readonly profile_image: "profile_image";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const HomePageScalarFieldEnum: {
    readonly id: "id";
    readonly isActive: "isActive";
    readonly about_us_years_exp: "about_us_years_exp";
    readonly about_us_products: "about_us_products";
    readonly about_us_countries: "about_us_countries";
    readonly about_us_brands: "about_us_brands";
    readonly contact_email: "contact_email";
    readonly contact_phone: "contact_phone";
    readonly contact_link_map: "contact_link_map";
    readonly contact_address: "contact_address";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HomePageScalarFieldEnum = (typeof HomePageScalarFieldEnum)[keyof typeof HomePageScalarFieldEnum];
export declare const HomePageIdScalarFieldEnum: {
    readonly id: "id";
    readonly about_us_badge: "about_us_badge";
    readonly about_us_title: "about_us_title";
    readonly about_us_desc: "about_us_desc";
    readonly services_badge: "services_badge";
    readonly services_title: "services_title";
    readonly services_desc: "services_desc";
    readonly news_badge: "news_badge";
    readonly news_title: "news_title";
    readonly news_desc: "news_desc";
    readonly partners_badge: "partners_badge";
    readonly partners_title: "partners_title";
    readonly partners_desc: "partners_desc";
    readonly contact_title: "contact_title";
    readonly contact_desc: "contact_desc";
    readonly homePageId: "homePageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HomePageIdScalarFieldEnum = (typeof HomePageIdScalarFieldEnum)[keyof typeof HomePageIdScalarFieldEnum];
export declare const HomePageEnScalarFieldEnum: {
    readonly id: "id";
    readonly about_us_badge: "about_us_badge";
    readonly about_us_title: "about_us_title";
    readonly about_us_desc: "about_us_desc";
    readonly services_badge: "services_badge";
    readonly services_title: "services_title";
    readonly services_desc: "services_desc";
    readonly news_badge: "news_badge";
    readonly news_title: "news_title";
    readonly news_desc: "news_desc";
    readonly partners_badge: "partners_badge";
    readonly partners_title: "partners_title";
    readonly partners_desc: "partners_desc";
    readonly contact_title: "contact_title";
    readonly contact_desc: "contact_desc";
    readonly homePageId: "homePageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HomePageEnScalarFieldEnum = (typeof HomePageEnScalarFieldEnum)[keyof typeof HomePageEnScalarFieldEnum];
export declare const HeroSlideScalarFieldEnum: {
    readonly id: "id";
    readonly order: "order";
    readonly bg_image: "bg_image";
    readonly title_id: "title_id";
    readonly desc_id: "desc_id";
    readonly title_en: "title_en";
    readonly desc_en: "desc_en";
    readonly homePageId: "homePageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HeroSlideScalarFieldEnum = (typeof HeroSlideScalarFieldEnum)[keyof typeof HeroSlideScalarFieldEnum];
export declare const AboutUsPageScalarFieldEnum: {
    readonly id: "id";
    readonly isActive: "isActive";
    readonly hero_bg: "hero_bg";
    readonly vision_image_parent: "vision_image_parent";
    readonly vision_image_child: "vision_image_child";
    readonly mission_image_parent: "mission_image_parent";
    readonly mission_image_child: "mission_image_child";
    readonly history_image_parent: "history_image_parent";
    readonly history_image_child: "history_image_child";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AboutUsPageScalarFieldEnum = (typeof AboutUsPageScalarFieldEnum)[keyof typeof AboutUsPageScalarFieldEnum];
export declare const AboutUsPageIdScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly vision_badge: "vision_badge";
    readonly vision_title: "vision_title";
    readonly vision_desc: "vision_desc";
    readonly vision_quote: "vision_quote";
    readonly vision_list: "vision_list";
    readonly mission_badge: "mission_badge";
    readonly mission_title: "mission_title";
    readonly mission_desc: "mission_desc";
    readonly mission_quote: "mission_quote";
    readonly mission_list: "mission_list";
    readonly history_badge: "history_badge";
    readonly history_title: "history_title";
    readonly history_desc: "history_desc";
    readonly company_structure_badge: "company_structure_badge";
    readonly company_structure_title: "company_structure_title";
    readonly company_structure_desc: "company_structure_desc";
    readonly boc_badge: "boc_badge";
    readonly boc_title: "boc_title";
    readonly boc_desc: "boc_desc";
    readonly bod_badge: "bod_badge";
    readonly bod_title: "bod_title";
    readonly bod_desc: "bod_desc";
    readonly aboutUsPageId: "aboutUsPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AboutUsPageIdScalarFieldEnum = (typeof AboutUsPageIdScalarFieldEnum)[keyof typeof AboutUsPageIdScalarFieldEnum];
export declare const AboutUsPageEnScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly vision_badge: "vision_badge";
    readonly vision_title: "vision_title";
    readonly vision_desc: "vision_desc";
    readonly vision_quote: "vision_quote";
    readonly vision_list: "vision_list";
    readonly mission_badge: "mission_badge";
    readonly mission_title: "mission_title";
    readonly mission_desc: "mission_desc";
    readonly mission_quote: "mission_quote";
    readonly mission_list: "mission_list";
    readonly history_badge: "history_badge";
    readonly history_title: "history_title";
    readonly history_desc: "history_desc";
    readonly company_structure_badge: "company_structure_badge";
    readonly company_structure_title: "company_structure_title";
    readonly company_structure_desc: "company_structure_desc";
    readonly boc_badge: "boc_badge";
    readonly boc_title: "boc_title";
    readonly boc_desc: "boc_desc";
    readonly bod_badge: "bod_badge";
    readonly bod_title: "bod_title";
    readonly bod_desc: "bod_desc";
    readonly aboutUsPageId: "aboutUsPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AboutUsPageEnScalarFieldEnum = (typeof AboutUsPageEnScalarFieldEnum)[keyof typeof AboutUsPageEnScalarFieldEnum];
export declare const GovernanceScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly position: "position";
    readonly position_desc: "position_desc";
    readonly photo_image: "photo_image";
    readonly aboutUsPageId: "aboutUsPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type GovernanceScalarFieldEnum = (typeof GovernanceScalarFieldEnum)[keyof typeof GovernanceScalarFieldEnum];
export declare const CompanyStructureScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly icon_image: "icon_image";
    readonly aboutUsPageId: "aboutUsPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CompanyStructureScalarFieldEnum = (typeof CompanyStructureScalarFieldEnum)[keyof typeof CompanyStructureScalarFieldEnum];
export declare const NewsPageScalarFieldEnum: {
    readonly id: "id";
    readonly isActive: "isActive";
    readonly hero_bg: "hero_bg";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NewsPageScalarFieldEnum = (typeof NewsPageScalarFieldEnum)[keyof typeof NewsPageScalarFieldEnum];
export declare const NewsPageEnScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly news_badge: "news_badge";
    readonly news_title: "news_title";
    readonly news_desc: "news_desc";
    readonly csr_badge: "csr_badge";
    readonly csr_title: "csr_title";
    readonly csr_desc: "csr_desc";
    readonly newsPageId: "newsPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NewsPageEnScalarFieldEnum = (typeof NewsPageEnScalarFieldEnum)[keyof typeof NewsPageEnScalarFieldEnum];
export declare const NewsPageIdScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly news_badge: "news_badge";
    readonly news_title: "news_title";
    readonly news_desc: "news_desc";
    readonly csr_badge: "csr_badge";
    readonly csr_title: "csr_title";
    readonly csr_desc: "csr_desc";
    readonly newsPageId: "newsPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NewsPageIdScalarFieldEnum = (typeof NewsPageIdScalarFieldEnum)[keyof typeof NewsPageIdScalarFieldEnum];
export declare const ServicePageScalarFieldEnum: {
    readonly id: "id";
    readonly hero_bg: "hero_bg";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ServicePageScalarFieldEnum = (typeof ServicePageScalarFieldEnum)[keyof typeof ServicePageScalarFieldEnum];
export declare const ServicePageIdScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly used_car_gallery_badge: "used_car_gallery_badge";
    readonly used_car_gallery_title: "used_car_gallery_title";
    readonly used_car_gallery_desc: "used_car_gallery_desc";
    readonly servicePageId: "servicePageId";
};
export type ServicePageIdScalarFieldEnum = (typeof ServicePageIdScalarFieldEnum)[keyof typeof ServicePageIdScalarFieldEnum];
export declare const ServicePageEnScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly used_car_gallery_badge: "used_car_gallery_badge";
    readonly used_car_gallery_title: "used_car_gallery_title";
    readonly used_car_gallery_desc: "used_car_gallery_desc";
    readonly servicePageId: "servicePageId";
};
export type ServicePageEnScalarFieldEnum = (typeof ServicePageEnScalarFieldEnum)[keyof typeof ServicePageEnScalarFieldEnum];
export declare const ServiceScalarFieldEnum: {
    readonly id: "id";
    readonly bg_image: "bg_image";
    readonly isActive: "isActive";
    readonly order: "order";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum];
export declare const ServiceIdScalarFieldEnum: {
    readonly id: "id";
    readonly badge: "badge";
    readonly title: "title";
    readonly desc: "desc";
    readonly desc_sort: "desc_sort";
    readonly location: "location";
    readonly contact: "contact";
    readonly email: "email";
    readonly quote: "quote";
    readonly serviceId: "serviceId";
};
export type ServiceIdScalarFieldEnum = (typeof ServiceIdScalarFieldEnum)[keyof typeof ServiceIdScalarFieldEnum];
export declare const ServiceEnScalarFieldEnum: {
    readonly id: "id";
    readonly badge: "badge";
    readonly title: "title";
    readonly desc: "desc";
    readonly desc_sort: "desc_sort";
    readonly location: "location";
    readonly contact: "contact";
    readonly email: "email";
    readonly quote: "quote";
    readonly serviceId: "serviceId";
};
export type ServiceEnScalarFieldEnum = (typeof ServiceEnScalarFieldEnum)[keyof typeof ServiceEnScalarFieldEnum];
export declare const CarGalleryScalarFieldEnum: {
    readonly id: "id";
    readonly car_image: "car_image";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CarGalleryScalarFieldEnum = (typeof CarGalleryScalarFieldEnum)[keyof typeof CarGalleryScalarFieldEnum];
export declare const CarGalleryIdScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly desc: "desc";
    readonly carGalleryId: "carGalleryId";
};
export type CarGalleryIdScalarFieldEnum = (typeof CarGalleryIdScalarFieldEnum)[keyof typeof CarGalleryIdScalarFieldEnum];
export declare const CarGalleryEnScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly desc: "desc";
    readonly carGalleryId: "carGalleryId";
};
export type CarGalleryEnScalarFieldEnum = (typeof CarGalleryEnScalarFieldEnum)[keyof typeof CarGalleryEnScalarFieldEnum];
export declare const PartnerScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly logo_image: "logo_image";
    readonly category: "category";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum];
export declare const NewsNewsScalarFieldEnum: {
    readonly id: "id";
    readonly isPublished: "isPublished";
    readonly image: "image";
    readonly author: "author";
    readonly author_image: "author_image";
    readonly publishedAt: "publishedAt";
    readonly report_id: "report_id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NewsNewsScalarFieldEnum = (typeof NewsNewsScalarFieldEnum)[keyof typeof NewsNewsScalarFieldEnum];
export declare const NewsNewsIdScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly content: "content";
    readonly newsNewsId: "newsNewsId";
};
export type NewsNewsIdScalarFieldEnum = (typeof NewsNewsIdScalarFieldEnum)[keyof typeof NewsNewsIdScalarFieldEnum];
export declare const NewsNewsEnScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly content: "content";
    readonly newsNewsId: "newsNewsId";
};
export type NewsNewsEnScalarFieldEnum = (typeof NewsNewsEnScalarFieldEnum)[keyof typeof NewsNewsEnScalarFieldEnum];
export declare const NewsCSRScalarFieldEnum: {
    readonly id: "id";
    readonly isPublished: "isPublished";
    readonly author: "author";
    readonly author_image: "author_image";
    readonly publishedAt: "publishedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NewsCSRScalarFieldEnum = (typeof NewsCSRScalarFieldEnum)[keyof typeof NewsCSRScalarFieldEnum];
export declare const NewsCSRImageScalarFieldEnum: {
    readonly id: "id";
    readonly image: "image";
    readonly description_en: "description_en";
    readonly description_id: "description_id";
    readonly newsCSRId: "newsCSRId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NewsCSRImageScalarFieldEnum = (typeof NewsCSRImageScalarFieldEnum)[keyof typeof NewsCSRImageScalarFieldEnum];
export declare const NewsCSRIdScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly content: "content";
    readonly newsCSRId: "newsCSRId";
};
export type NewsCSRIdScalarFieldEnum = (typeof NewsCSRIdScalarFieldEnum)[keyof typeof NewsCSRIdScalarFieldEnum];
export declare const NewsCSREnScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly content: "content";
    readonly newsCSRId: "newsCSRId";
};
export type NewsCSREnScalarFieldEnum = (typeof NewsCSREnScalarFieldEnum)[keyof typeof NewsCSREnScalarFieldEnum];
export declare const InvestorPageScalarFieldEnum: {
    readonly id: "id";
    readonly isActive: "isActive";
    readonly hero_bg: "hero_bg";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InvestorPageScalarFieldEnum = (typeof InvestorPageScalarFieldEnum)[keyof typeof InvestorPageScalarFieldEnum];
export declare const InvestorPageIdScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly stakeholders_badge: "stakeholders_badge";
    readonly stakeholders_title: "stakeholders_title";
    readonly stakeholders_desc: "stakeholders_desc";
    readonly report_badge: "report_badge";
    readonly report_title: "report_title";
    readonly report_desc: "report_desc";
    readonly investorPageId: "investorPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InvestorPageIdScalarFieldEnum = (typeof InvestorPageIdScalarFieldEnum)[keyof typeof InvestorPageIdScalarFieldEnum];
export declare const InvestorPageEnScalarFieldEnum: {
    readonly id: "id";
    readonly hero_badge: "hero_badge";
    readonly hero_title: "hero_title";
    readonly hero_desc: "hero_desc";
    readonly stakeholders_badge: "stakeholders_badge";
    readonly stakeholders_title: "stakeholders_title";
    readonly stakeholders_desc: "stakeholders_desc";
    readonly report_badge: "report_badge";
    readonly report_title: "report_title";
    readonly report_desc: "report_desc";
    readonly investorPageId: "investorPageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InvestorPageEnScalarFieldEnum = (typeof InvestorPageEnScalarFieldEnum)[keyof typeof InvestorPageEnScalarFieldEnum];
export declare const SharesScalarFieldEnum: {
    readonly id: "id";
    readonly category: "category";
    readonly value: "value";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SharesScalarFieldEnum = (typeof SharesScalarFieldEnum)[keyof typeof SharesScalarFieldEnum];
export declare const ReportScalarFieldEnum: {
    readonly id: "id";
    readonly title_id: "title_id";
    readonly title_en: "title_en";
    readonly description_id: "description_id";
    readonly description_en: "description_en";
    readonly file_url: "file_url";
    readonly original_filename: "original_filename";
    readonly publish_at: "publish_at";
    readonly is_publish: "is_publish";
    readonly reportCategoryId: "reportCategoryId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum];
export declare const ReportCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
};
export type ReportCategoryScalarFieldEnum = (typeof ReportCategoryScalarFieldEnum)[keyof typeof ReportCategoryScalarFieldEnum];
export declare const MetadataScalarFieldEnum: {
    readonly id: "id";
    readonly destination: "destination";
    readonly title_id: "title_id";
    readonly title_en: "title_en";
    readonly description_id: "description_id";
    readonly description_en: "description_en";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MetadataScalarFieldEnum = (typeof MetadataScalarFieldEnum)[keyof typeof MetadataScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map