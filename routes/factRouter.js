import { Router } from 'express'
import { factController } from '../controllers/FactController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
import { factValidation } from '../utils/validations.js'

const router = new Router()

router.get('/', factController.getFacts)

router.get('/:factId', factController.getFact)

router.post(
    '/',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    factValidation,
    validationMiddleware,
    factController.createFact
)

router.delete(
    '/:factId',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    factController.deleteFact
)

router.patch(
    '/:factId',
    authMiddleware,
    checkRoleMiddleware('ADMIN'),
    factValidation,
    validationMiddleware,
    factController.updateFact
)

export { router }
