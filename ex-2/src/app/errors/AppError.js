export class AppError extends Error{
    constructor(status = 500, title = "Internal Server Error", detail){
        super(detail || title)
        this.name = this.constructor.name
        this.status = status
        this.title = title
        this.detail = detail
    }
}

export class BadRequestError extends AppError{
    constructor(detail = "Requisição invalida"){
        super(400, "Bad Request", detail)
    }
}

export class NotFoundError extends AppError{
    constructor(detail = "Recurso não encontrado"){
        super(404, "Not Found", detail)
    }
}