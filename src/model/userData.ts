export interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}


export interface RegisterUserDto {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
}


export interface LoginUserDto {
    email: string;
    password: string;
}
