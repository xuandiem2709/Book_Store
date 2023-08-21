import * as controllers from '../controllers'
import express from 'express'
import verityToken from '../middlewares/verify_token'

const router = express.Router()

router.use(verityToken)
router.get('/', controllers.getCurrent )

module.exports = router