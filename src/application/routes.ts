import express from 'express'
import crudController from '../domain/crud/application/crudController'
const router = express.Router()

router.post('/createUser', crudController.createUser)
router.get('/getUser', crudController.getUser)
router.post('/updateUser', crudController.updateUser)
router.delete('/deleteUser', crudController.deleteUser)

export = router
