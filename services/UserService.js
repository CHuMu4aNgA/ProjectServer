import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { tokenService } from './TokenService.js'
import { ApiError } from '../exceptions/ApiError.js'
import getUser from '../utils/getUser.js'
import setTokens from '../utils/setTokens.js'


class UserService{

    async registration (email, password, name){
        const candidate = await getUser(email)
        if (candidate){
            throw ApiError.badRequest(`Пользователь с адресом ${email} уже существует`)
        }

        const salt = await bcrypt.genSalt(5)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({email, password: hashPassword, name})
        return setTokens(user)
    }

    async login (email, password){
        const user = await getUser(email)
        if(!user){
            throw ApiError.badRequest('Неверный логин или пароль')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.badRequest('Неверный логин или пароль')
        }
        return setTokens(user)
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if (!refreshToken){
            throw new ApiError.unauthorizedError()
        }
        const tokenData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!tokenData || !tokenFromDb){
            throw ApiError.unauthorizedError()
        }

        const user = await getUser(tokenData.email)
        return setTokens(user)
    }

    async getAllUsers(){
        const users = await User.findAll()
        return users
    }
}

export const userService = new UserService() 
