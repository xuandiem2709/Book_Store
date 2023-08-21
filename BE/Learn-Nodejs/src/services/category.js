import db from '../models'
import { Op } from 'sequelize'


export const getCategories = () => new Promise ( async(resolve, reject) => {
    try {
        const response = await db.Category.findAll()
        resolve({
            error: response ? 0 : 1,
            message: response ? 'success' : 'cannot found category',
            categoryData: response
        })

    } catch (error) {
        reject(error)
    }
})