import db from '../models'
import data from '../../data/data.json'
import { generateCode } from '../helpers/fn'

const hashPassword = password => hashSync(password, bcrypt.genSaltSync(10))

export const insertData = () => new Promise ( async(resolve, reject) => {
    try {
        //đưa lên bảng category
        const categories = Object.keys(data)
        categories.forEach(async(item) => {
            await db.Category.create({
                code: generateCode(item),
                value: item
            })
        })

        //đưa lên bảng book
        const dataArr = Object.entries(data)
        dataArr.forEach((item) => {
            item[1]?.map(async(book) => {
                await db.Book.create({
                    title: book.bookTitle,
                    price: +book.bookPrice,
                    available: +book.available,
                    image: book.imageUrl,
                    description: book.bookDescription,
                    category_code: generateCode(item[0])
                })
            })
        })

        resolve('OK')
    } catch (error) {
        reject(error)
    }
})
