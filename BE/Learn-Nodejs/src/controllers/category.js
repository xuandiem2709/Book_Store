import * as services from '../services'
import { intenalServerError } from '../middlewares/handle_errors'

export const getCategories = async(req, res) => {
    try {
        const response = await services.getCategories(req.query)
        return res.status(200).json(response)

    } catch (error) {
        return intenalServerError(res)
    }
}