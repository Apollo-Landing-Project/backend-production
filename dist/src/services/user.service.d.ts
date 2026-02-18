import type { User } from "../../generated/prisma/client.js";
export declare class UserServices {
    static findUserByEmail(email: string): Promise<User | null>;
    static findUserByEmailAndPassword(email: string, password: string): Promise<User>;
    static createUser({ email, password, name, }: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import("../../generated/prisma/enums.js").Role;
        profile_image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map