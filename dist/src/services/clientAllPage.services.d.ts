export declare class ClientAllService {
    private static resolveLinkedReport;
    static getMetadata(lang: string, destination: string): Promise<{
        title: string | null;
        description: string | null;
    }>;
    static getHomePage(lang: string): Promise<{
        id: string;
        hero: {
            id: string;
            title: string | null;
            desc: string | null;
            background: string | null;
        }[];
        about: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            yearsExp: number | null;
            products: number | null;
            countries: number | null;
            brands: number | null;
        };
        services: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            serviceItems: {
                id: string;
                title: string | null | undefined;
                desc: string | null | undefined;
                image: string | null;
            }[];
        };
        partners: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            partnersFunding: {
                id: string;
                name: string | null;
                image: string | null;
            }[];
            partnersInsurance: {
                id: string;
                name: string | null;
                image: string | null;
            }[];
        };
        contact: {
            title: string | null;
            desc: string | null;
            email: string[];
            phone: string[];
            address: string | null;
            mapLink: string | null;
        };
    }>;
    static getAboutUsPage(lang: string): Promise<{
        id: string;
        hero: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            background: string | null;
        };
        vision: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            quote: string | null;
            list: string[];
            imageParent: string | null;
            imageChild: string | null;
        };
        mission: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            quote: string | null;
            list: string[];
            imageParent: string | null;
            imageChild: string | null;
        };
        history: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            imageParent: string | null;
            imageChild: string | null;
        };
        companyStructure: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            items: {
                id: string;
                name: string;
                icon: string | null;
            }[];
        };
        boc: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            members: {
                id: string;
                name: string;
                positionDesc: string;
                photo: string | null;
            }[];
        };
        bod: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            members: {
                id: string;
                name: string;
                positionDesc: string;
                photo: string | null;
            }[];
        };
    }>;
    static getServicePage(lang: string): Promise<{
        id: string;
        hero: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            background: string | null;
        };
        services: {
            badge: string | null | undefined;
            id: string;
            image: string | null;
            order: number;
            title: string | null | undefined;
            desc: string | null | undefined;
            location: string | null | undefined;
            contact: string[] | undefined;
            email: string[] | undefined;
            quote: string | null | undefined;
        }[];
        usedCarGallery: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            items: {
                id: string;
                image: string | null;
                title: string | null | undefined;
                desc: string | null | undefined;
            }[];
        };
    }>;
    static getNewsPage(lang: string): Promise<{
        id: string;
        hero: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            background: string | null;
        };
        news: {
            id: string;
            title: string | null | undefined;
            description: string | null | undefined;
            image: string | null;
            author: string | null;
            authorImage: string | null;
            publishedAt: Date;
            has_report: boolean;
            report_id: string | null;
            download_url: string | null;
            file_url: string | null;
        }[];
        csr: {
            id: string;
            title: string | null | undefined;
            description: string | null | undefined;
            author: string | null;
            authorImage: string | null;
            publishedAt: Date;
            images: {
                id: string;
                image: string;
                description: string | null;
            }[];
        }[];
    }>;
    static getNewsDetail(id: string, lang: string): Promise<{
        id: string;
        title: string | null;
        description: string | null;
        content: string | null;
        image: string | null;
        author: string | null;
        authorImage: string | null;
        publishedAt: Date;
        has_report: boolean;
        report_id: string | null;
        download_url: string | null;
        attachment: string | null;
        file_url: string | null;
    }>;
    static getNewsCSRDetail(id: string, lang: string): Promise<{
        id: string;
        title: string | null;
        description: string | null;
        content: string | null;
        image: {
            image: string;
            description: string | null;
        }[];
        author: string | null;
        authorImage: string | null;
        publishedAt: Date;
    }>;
    static getInvestorRelationPage(lang: string): Promise<{
        id: string;
        hero: {
            badge: string | null;
            title: string | null;
            desc: string;
            background: string | null;
        };
        stakeholders: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            shares: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                value: string;
                category: string;
            }[];
        };
        report: {
            badge: string | null;
            title: string | null;
            desc: string | null;
            reportItems: {
                id: string;
                news_id: string | undefined;
                title: string | null;
                description: string | null;
                file_url: string | null;
                original_filename: string | null;
                published_at: Date;
                category: string;
            }[];
        };
    }>;
}
//# sourceMappingURL=clientAllPage.services.d.ts.map