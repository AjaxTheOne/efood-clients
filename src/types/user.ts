export type User = {
    id: number;
    email: string;
    name: string;

    created_at: string;
    updated_at: string;

    phone?: string;
    avatar?: string;
};

export type LoginResponse = {
    data: {
        token: string;
        user: User;
    };
    message: string;
    success: boolean;
};