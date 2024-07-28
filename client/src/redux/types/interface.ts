export interface IUser {
    id: string;
    name: string;
    email: string;
    message: string
}

export interface IRegisterFormData {
    username: string;
    password: string;
    fullName: string;
    avatar: Blob | null;
    coverImage: Blob | null;
    email: string;
}