import express from 'express'
import crudController from '../domain/crud/application/crudController'
import screeningCriteriaController from '../domain/investment/application/screeningCriteriaController'
import investmentController from '../domain/investment/application/investmentController'
const router = express.Router()

router.post('/createUser', crudController.createUser)
router.get('/getUser', crudController.getUser)
router.post('/updateUser', crudController.updateUser)
router.delete('/deleteUser', crudController.deleteUser)

router.get('/userCriteria', screeningCriteriaController.getUserCriteria)
router.post('/addCriteria', screeningCriteriaController.addUserCriteria)
router.delete('/deleteCriteria', screeningCriteriaController.deleteUserCriteria)

router.get('/userCompanies', investmentController.getAllUserCompanies)
router.get('/userCompanyDetails', investmentController.getUserCompanyDetails)
router.get(
  '/getUserCompaniesFunnel',
  investmentController.getUserCompaniesFunnel
)
router.post('/addUserCompany', investmentController.addUserCompany)
router.post('/decision', investmentController.makeADecision)
router.post('/updateCompanyHaves', investmentController.updateCompanyHaves)

export = router
