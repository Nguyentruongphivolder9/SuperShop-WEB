type Role = 'USER' | 'ADMIN' | "SELLER";

export interface User {
    _id: string;
    avatarUrl: string;
    isActive: boolean;
    email: string;
    exp: number;
    fullName: string;
    gender: string;
    birthDay: Date;
    phoneNumber: string;
    role: Role;
    address: string;
    sub: string;
    userName: string;
    fullNameChanges: number
}