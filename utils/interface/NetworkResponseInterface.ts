export interface IErrorResponse {
    error: boolean
    message: string
}

export interface IAuthResponse {
    $id: string
    code: number
    message: string
}

export interface ILogin {
    $id: string
    Id: string
    Name: string
    Email: string
    Token: string
}

export interface ILoginResponse extends IAuthResponse {
    data: ILogin
}

export interface IRegister {
    id: string
    email: string
    name: string
}

export interface IRegisterResponse extends IAuthResponse {
    data: IRegister
}


export interface Tourist {
    $id: string;
    createdat: string;
    id: string;
    tourist_email: string;
    tourist_location: string;
    tourist_name: string;
    tourist_profilepicture: string;
}

export interface TouristListResponse {
    data: Tourist[];
    page: string;
    per_page: number;
    total_pages: number;
    totalrecord: number;
}
