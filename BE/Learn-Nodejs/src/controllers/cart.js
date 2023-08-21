import * as services from '../services'
import { intenalServerError } from '../middlewares/handle_errors'

export const getCartItems = async(req, res) => {
    try {
        const items = req.body
        const response = await services.getCartItems(items)
        return res.status(200).json(response)

    } catch (error) {
        return intenalServerError(res)
    }
}