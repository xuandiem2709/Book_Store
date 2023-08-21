import db from '../models'
import { Op } from 'sequelize'


export const getBooks = ({page, limit, order, name, category, id_book, ...query}) => new Promise ( async(resolve, reject) => {
    try {
        const queries = { raw: true, nest: true}
        const offset = (!page || +page <= 1) ? 0 :  (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_BOOK
        queries.offset = offset * fLimit
        queries.limit = fLimit
        if (order) queries.order = [order]
        if (name) query.title = { [Op.substring]: name }
        if (category) query.category_code = { [Op.like]: category }
        if (id_book) query.id = { [Op.like]: id_book }
        const response = await db.Book.findAndCountAll({
            where: query,
            ...queries           
        })
        resolve({
            error: response ? 0 : 1,
            message: response ? 'success' : 'cannot found book',
            bookData: response
        })

    } catch (error) {
        reject(error)
    }
})