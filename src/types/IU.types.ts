export interface InputInterface {
    label: string,
    type?: string,
    className:string,
}

export interface ButtonInterface {
    label: string,
    className:string,
    onClick?: () => void
}