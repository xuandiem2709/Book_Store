import * as services from '../services'
import { intenalServerError } from '../middlewares/handle_errors'

export const getBooks = async(req, res) => {
    try {
        const response = await services.getBooks(req.query)
        return res.status(200).json(response)

    } catch (error) {
        return intenalServerError(res)
    }
}