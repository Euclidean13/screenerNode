import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import { InvestmentFacade } from '../core/investmentFacade'

// DI
const container = Container.of()

// Get
const getAllUserCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  let resp = undefined
  if (userName !== undefined) {
    resp = await container.get(InvestmentFacade).getAllUserCompanies(userName)
  }
  if (resp === undefined) {
    return res.status(500).json({
      message: `${userName} does not exists`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

const getUserCompanyDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  const companyName = req.query.company?.toString()
  let resp = undefined
  if (userName !== undefined && companyName !== undefined) {
    resp = await container
      .get(InvestmentFacade)
      .getUserCompanyDetails(userName, companyName)
  }
  if (resp === undefined) {
    return res.status(500).json({
      message: `Unable to find ${userName} ${companyName} details`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

// Post
const addUserCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  const company = req.body
  let resp = undefined
  if (userName !== undefined && company !== undefined) {
    resp = await container
      .get(InvestmentFacade)
      .addUserCompany(userName, company)
  }
  if (resp === undefined) {
    return res.status(500).json({
      message: `Unable to add user company`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

const makeADecision = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  const companyName = req.query.company?.toString()
  const decision = Number(req.query.decision)
  let resp = undefined
  if (
    userName !== undefined &&
    companyName !== undefined &&
    decision !== undefined
  ) {
    resp = await container
      .get(InvestmentFacade)
      .makeADecision(userName, companyName, decision)
  }
  if (resp === undefined) {
    return res.status(500).json({
      message: `Unable to save new decision`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

const updateCompanyHaves = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.query.name?.toString()
  const companyName = req.query.company?.toString()
  const companyHaves = req.body
  let resp = undefined
  if (
    userName !== undefined &&
    companyName !== undefined &&
    companyHaves !== undefined
  ) {
    resp = await container
      .get(InvestmentFacade)
      .updateCompanyHaves(userName, companyName, companyHaves)
  }
  if (resp === undefined) {
    return res.status(500).json({
      message: `Unable to update ${userName} haves`,
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

export default {
  getAllUserCompanies,
  getUserCompanyDetails,
  addUserCompany,
  makeADecision,
  updateCompanyHaves,
}
