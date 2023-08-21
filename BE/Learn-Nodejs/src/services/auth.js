import db from '../models'
import jwt from 'jsonwebtoken'
import bcrypt, { hashSync } from 'bcryptjs'

const hashPassword = password => hashSync(password, bcrypt.genSaltSync(10))

export const register = ({name, email, phone, address, password, role_code}) => new Promise ( async(resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: {email},
            defaults: {
                name,
                email,
                phone,
                address,
                role_code,
                password: hashPassword(password),  
            }
        })

        const token = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn: '10d'}) : null

        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Register is successfully' : 'Email already exists',
            'access_token': token ? `Bearer ${token}` : null
        })
    } catch (error) {
        reject(error)
    }
})

export const login = ({email, password}) => new Promise ( async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: {email},
            raw: true
        })

        const isChecked = response && bcrypt.compareSync(password, response.password)
        const token = isChecked ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '10d'} ) : null
        resolve({
            err: token ? 0 : 1,
            mes: token ? 'Login is successfully' : response ? 'Password is wrong' : 'Email is not registed',
            'access_token': token ? `Bearer ${token}` : null
        })
    } catch (error) {
        reject(error)
    }
})