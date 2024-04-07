import jwt from 'jsonwebtoken'
import { SECRET_KEY, SECRET_KEY2 } from '../utils/secret.js'
import {Token} from '../models/Token.js'

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, SECRET_KEY, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, SECRET_KEY2, {expiresIn: '90d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, SECRET_KEY)
            return userData
        }catch(e){
            return null 
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, SECRET_KEY2)
            return userData
        } catch(e){
            return null
        }
    }

    async findToken(refreshToken){
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where: {userId}})
        if (tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({userId, refreshToken})
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }
}

export const tokenService = new TokenService()