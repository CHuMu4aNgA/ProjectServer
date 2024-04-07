import { userService } from "../services/UserService.js"
import { MAX_AGE } from "../utils/constants.js"

class UserController{
        async registration(req, res, next){
            try{
                const {email, password, name} = req.body
                const userData = await userService.registration(email, password, name)
                res.cookie('refreshToken', userData.refreshToken, MAX_AGE)
                return res.json(userData)
            } catch (e){
                next(e)
            }
        }

        async login(req, res, next){
            try{
                const {email, password} = req.body
                const userData = await userService.login(email, password)
                res.cookie('refreshToken', userData.refreshToken, MAX_AGE)
                return res.json(userData)
            } catch (e){
                next(e)
            }
        }

        async logout(req, res, next){
            try{
                const { refreshToken } = req.cookies
                const token = await userService.logout(refreshToken)
                res.clearCookie('refreshToken')
                return res.json(token)
            } catch (e){
                next(e)
            }
        }

        async refresh(req, res, next){
            try{
                const { refreshToken } = req.cookies
                const userData = await userService.refresh(refreshToken)
                res.cookie('refreshToken', userData.refreshToken, MAX_AGE)
                return res.json(userData)
            } catch (e){
                next(e)
            }   
        }


        async getUsers(req, res, next){
            try{
                const users = await userService.getAllUsers()
                return res.json(users)
                
            } catch (e){
                next(e)
            }
        }
}


export const userController = new UserController()