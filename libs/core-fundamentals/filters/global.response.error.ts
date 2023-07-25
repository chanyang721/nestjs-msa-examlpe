export const GlobalResponseError = ( data: IResponseErrorInput ): IResponseError => ( {
    error: {
        statusCode   : data.statusCode,
        exceptionCode: data.exceptionCode,
        method       : data.method,
        path         : data.path,
        message      : data.message,
        timestamp    : new Date().toISOString(),
        errors       : data.errors,
    },
} )


export interface IResponseError {
    error: {
        statusCode: number
        exceptionCode: string
        method: string
        path: string
        message: string
        timestamp: string
        errors?: any
    }
}


export interface IResponseErrorInput {
    statusCode: number
    exceptionCode: string
    method: string
    path: string
    message: string
    errors?: any
}


export interface IError {
    message: string
    info: string
}