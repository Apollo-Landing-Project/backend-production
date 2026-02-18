import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.homePage`: Exposes CRUD operations for the **HomePage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HomePages
      * const homePages = await prisma.homePage.findMany()
      * ```
      */
    get homePage(): Prisma.HomePageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.homePageId`: Exposes CRUD operations for the **HomePageId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HomePageIds
      * const homePageIds = await prisma.homePageId.findMany()
      * ```
      */
    get homePageId(): Prisma.HomePageIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.homePageEn`: Exposes CRUD operations for the **HomePageEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HomePageEns
      * const homePageEns = await prisma.homePageEn.findMany()
      * ```
      */
    get homePageEn(): Prisma.HomePageEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.heroSlide`: Exposes CRUD operations for the **HeroSlide** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HeroSlides
      * const heroSlides = await prisma.heroSlide.findMany()
      * ```
      */
    get heroSlide(): Prisma.HeroSlideDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.aboutUsPage`: Exposes CRUD operations for the **AboutUsPage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AboutUsPages
      * const aboutUsPages = await prisma.aboutUsPage.findMany()
      * ```
      */
    get aboutUsPage(): Prisma.AboutUsPageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.aboutUsPageId`: Exposes CRUD operations for the **AboutUsPageId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AboutUsPageIds
      * const aboutUsPageIds = await prisma.aboutUsPageId.findMany()
      * ```
      */
    get aboutUsPageId(): Prisma.AboutUsPageIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.aboutUsPageEn`: Exposes CRUD operations for the **AboutUsPageEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AboutUsPageEns
      * const aboutUsPageEns = await prisma.aboutUsPageEn.findMany()
      * ```
      */
    get aboutUsPageEn(): Prisma.AboutUsPageEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.governance`: Exposes CRUD operations for the **Governance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Governances
      * const governances = await prisma.governance.findMany()
      * ```
      */
    get governance(): Prisma.GovernanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.companyStructure`: Exposes CRUD operations for the **CompanyStructure** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CompanyStructures
      * const companyStructures = await prisma.companyStructure.findMany()
      * ```
      */
    get companyStructure(): Prisma.CompanyStructureDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsPage`: Exposes CRUD operations for the **NewsPage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsPages
      * const newsPages = await prisma.newsPage.findMany()
      * ```
      */
    get newsPage(): Prisma.NewsPageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsPageEn`: Exposes CRUD operations for the **NewsPageEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsPageEns
      * const newsPageEns = await prisma.newsPageEn.findMany()
      * ```
      */
    get newsPageEn(): Prisma.NewsPageEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsPageId`: Exposes CRUD operations for the **NewsPageId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsPageIds
      * const newsPageIds = await prisma.newsPageId.findMany()
      * ```
      */
    get newsPageId(): Prisma.NewsPageIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.servicePage`: Exposes CRUD operations for the **ServicePage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ServicePages
      * const servicePages = await prisma.servicePage.findMany()
      * ```
      */
    get servicePage(): Prisma.ServicePageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.servicePageId`: Exposes CRUD operations for the **ServicePageId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ServicePageIds
      * const servicePageIds = await prisma.servicePageId.findMany()
      * ```
      */
    get servicePageId(): Prisma.ServicePageIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.servicePageEn`: Exposes CRUD operations for the **ServicePageEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ServicePageEns
      * const servicePageEns = await prisma.servicePageEn.findMany()
      * ```
      */
    get servicePageEn(): Prisma.ServicePageEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.service`: Exposes CRUD operations for the **Service** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Services
      * const services = await prisma.service.findMany()
      * ```
      */
    get service(): Prisma.ServiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.serviceId`: Exposes CRUD operations for the **ServiceId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ServiceIds
      * const serviceIds = await prisma.serviceId.findMany()
      * ```
      */
    get serviceId(): Prisma.ServiceIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.serviceEn`: Exposes CRUD operations for the **ServiceEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ServiceEns
      * const serviceEns = await prisma.serviceEn.findMany()
      * ```
      */
    get serviceEn(): Prisma.ServiceEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.carGallery`: Exposes CRUD operations for the **CarGallery** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CarGalleries
      * const carGalleries = await prisma.carGallery.findMany()
      * ```
      */
    get carGallery(): Prisma.CarGalleryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.carGalleryId`: Exposes CRUD operations for the **CarGalleryId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CarGalleryIds
      * const carGalleryIds = await prisma.carGalleryId.findMany()
      * ```
      */
    get carGalleryId(): Prisma.CarGalleryIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.carGalleryEn`: Exposes CRUD operations for the **CarGalleryEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CarGalleryEns
      * const carGalleryEns = await prisma.carGalleryEn.findMany()
      * ```
      */
    get carGalleryEn(): Prisma.CarGalleryEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Partners
      * const partners = await prisma.partner.findMany()
      * ```
      */
    get partner(): Prisma.PartnerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsNews`: Exposes CRUD operations for the **NewsNews** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsNews
      * const newsNews = await prisma.newsNews.findMany()
      * ```
      */
    get newsNews(): Prisma.NewsNewsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsNewsId`: Exposes CRUD operations for the **NewsNewsId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsNewsIds
      * const newsNewsIds = await prisma.newsNewsId.findMany()
      * ```
      */
    get newsNewsId(): Prisma.NewsNewsIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsNewsEn`: Exposes CRUD operations for the **NewsNewsEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsNewsEns
      * const newsNewsEns = await prisma.newsNewsEn.findMany()
      * ```
      */
    get newsNewsEn(): Prisma.NewsNewsEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsCSR`: Exposes CRUD operations for the **NewsCSR** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsCSRS
      * const newsCSRS = await prisma.newsCSR.findMany()
      * ```
      */
    get newsCSR(): Prisma.NewsCSRDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsCSRImage`: Exposes CRUD operations for the **NewsCSRImage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsCSRImages
      * const newsCSRImages = await prisma.newsCSRImage.findMany()
      * ```
      */
    get newsCSRImage(): Prisma.NewsCSRImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsCSRId`: Exposes CRUD operations for the **NewsCSRId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsCSRIds
      * const newsCSRIds = await prisma.newsCSRId.findMany()
      * ```
      */
    get newsCSRId(): Prisma.NewsCSRIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.newsCSREn`: Exposes CRUD operations for the **NewsCSREn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NewsCSREns
      * const newsCSREns = await prisma.newsCSREn.findMany()
      * ```
      */
    get newsCSREn(): Prisma.NewsCSREnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.investorPage`: Exposes CRUD operations for the **InvestorPage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InvestorPages
      * const investorPages = await prisma.investorPage.findMany()
      * ```
      */
    get investorPage(): Prisma.InvestorPageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.investorPageId`: Exposes CRUD operations for the **InvestorPageId** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InvestorPageIds
      * const investorPageIds = await prisma.investorPageId.findMany()
      * ```
      */
    get investorPageId(): Prisma.InvestorPageIdDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.investorPageEn`: Exposes CRUD operations for the **InvestorPageEn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InvestorPageEns
      * const investorPageEns = await prisma.investorPageEn.findMany()
      * ```
      */
    get investorPageEn(): Prisma.InvestorPageEnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.shares`: Exposes CRUD operations for the **Shares** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Shares
      * const shares = await prisma.shares.findMany()
      * ```
      */
    get shares(): Prisma.SharesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.report`: Exposes CRUD operations for the **Report** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reports
      * const reports = await prisma.report.findMany()
      * ```
      */
    get report(): Prisma.ReportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.reportCategory`: Exposes CRUD operations for the **ReportCategory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ReportCategories
      * const reportCategories = await prisma.reportCategory.findMany()
      * ```
      */
    get reportCategory(): Prisma.ReportCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.metadata`: Exposes CRUD operations for the **Metadata** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Metadata
      * const metadata = await prisma.metadata.findMany()
      * ```
      */
    get metadata(): Prisma.MetadataDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map