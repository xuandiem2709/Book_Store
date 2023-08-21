import db from '../models'


export const getCartItems = (items) => new Promise ( async(resolve, reject) => {
    try {
        const itemIds = Object.keys(items).map(Number);

        const response = await db.Book.findAll({
            where: {
                id: itemIds
            },
        })
        .then((res) => {
            const cartItems = res.map((item) => ({
                // Object.keys(items).map((key, index) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    available: item.available,
                    image: item.image,
                    description: item.description,
                    category_code: item.category_code,
                    quantity: items[item.id]
                // }))
            }))
            return cartItems;
        })
        .catch((err) => { throw err })

        resolve({
            error: response ? 0 : 1,
            message: response ? 'success' : 'cannot found book',
            bookData: response
        })

    } catch (error) {
        reject(error)
    }
})