import { ApiError } from '../exceptions/ApiError.js'

export default function(err, req, res, next) {
    // если полученная ошибка экземпляр класса ApiError
    if(err instanceof ApiError) {
        // ответ на клиент в статус будет либо 401, либо 400
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(500).json({message: 'Заголовок должен быть уникальным'})
    }
    // если полученная ошибка какого-то другого вида,
    // которого мы не предусмотрели, то возращаем 500 статус
    return res.status(500).json({message: 'Произошла непредвиденная ошибка сервера'})
}
