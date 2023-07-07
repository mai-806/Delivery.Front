export interface OrderFormProps {
    theme: string,
    isMap: boolean,
    whereFrom: string,
    setWhereFrom: (e: any) => void,
    whereTo: string,
    setWhereTo: (e: any) => void,
    details: string,
    setDetails: (e: any) => void,
    isErrorWF: boolean,
    isErrorWT: boolean,
}