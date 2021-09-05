import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import { InvestmentFacade } from '../core/investmentFacade'
import { Criteria } from '../core/model/criteria'

// DI
const container = Container.of()

// Get user criteria
const getUserCriteria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  let resp = null
  if (userName !== undefined) {
    resp = await container.get(InvestmentFacade).getUserCriteria(userName)
  }
  if (resp === null) {
    return res.status(500).json({
      message: `${userName} does not exists`,
    })
  }
  console.log(resp)
  return res.status(200).json({
    message: resp,
  })
}

// Add user criteria
const addUserCriteria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  const userCriteria: Criteria = req.body
  let resp = null
  if (userName !== undefined) {
    resp = await container
      .get(InvestmentFacade)
      .addUserCriteriaHave(userName, userCriteria)
  }
  if (resp === null) {
    return res.status(500).json({
      message: `Unable to add ${userName} criteria`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

// Delete user criteria
const deleteUserCriteria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  const userCriteria: Criteria = req.body
  let resp = null
  if (userName !== undefined) {
    resp = await container
      .get(InvestmentFacade)
      .deleteUserCriteriaHave(userName, userCriteria)
  } else {
    return res.status(500).json({
      message: `Unable to delete ${userName} criteria`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

export default { getUserCriteria, addUserCriteria, deleteUserCriteria }
