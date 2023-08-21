import * as services from '../services'
import { intenalServerError, badRequest } from '../middlewares/handle_errors'

export const getCurrent = async(req, res) => {
    try {
        const { id } = req.user
        const response = await services.getOne(id)
        return res.status(200).json(response)

    } catch (error) {
        return intenalServerError(res)
    }
}