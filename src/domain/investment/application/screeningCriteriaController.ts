import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import { InvestmentAdapter } from '../infrastructure/investmentAdapter'

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
    resp = await container.get(InvestmentAdapter).getUserCriteria(userName)
  }
  if (resp === null) {
    return res.status(500).json({
      message: `${userName} does not exists`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

// Add user criteria

// Delete user criteria
