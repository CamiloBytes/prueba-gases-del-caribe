export interface IUser  {
    id?:number
    first_name : string,
    last_name:string,
    email:string,
    password:string,
    birth_date?:Date,
    document_number?:string
    document_types_id?: number,
    phone:string,
    address?:string,
    create_at?:Date
}

export interface DocumentType{
    id?: number,
    name:string,
    abbreviation:string,
    create_at?:Date
}