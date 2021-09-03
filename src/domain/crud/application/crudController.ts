import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import { CrudFacade } from '../core/crudFacade'
import { User } from '../core/model/user'

// DI
const container = Container.of()

// Create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body
  const resp = await container.get(CrudFacade).createUser(user)
  if (resp === undefined) {
    return res.status(500).json({
      message: 'Unable to create user',
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

// Get user
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userName = req.query.name?.toString()
  let resp = null
  if (userName !== undefined) {
    resp = await container.get(CrudFacade).getUser(userName)
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

// Update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body
  const resp = await container.get(CrudFacade).updateUserDetails(user)
  if (resp === undefined) {
    return res.status(500).json({
      message: 'Unable to update user',
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

// Delete user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userName = req.query.name?.toString()
  let resp = undefined
  if (userName !== undefined) {
    resp = await container.get(CrudFacade).deleteUser(userName)
  }
  if (resp === undefined) {
    return res.status(500).json({
      message: 'Unable to update user',
    })
  }
  return res.status(200).json({
    message: resp,
  })
}

export default { createUser, getUser, updateUser, deleteUser }
