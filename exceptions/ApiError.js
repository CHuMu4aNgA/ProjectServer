


export class ApiError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    // функция прокидывает ошибку о недостаточности прав
    static forbidden() {
        return new ApiError(403, 'Вам не хватает прав. Доступ запрещен')
    }
}
