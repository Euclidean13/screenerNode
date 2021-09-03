import { Container, Service } from 'typedi'
import { CrudAdapter } from '../infrastructure/crudAdapter'
import { User } from './model/user'
import { UserIncoming } from './ports/incoming/userIncoming'

const container = Container.of()

@Service({ global: true })
export class CrudFacade implements UserIncoming {
  async createUser(user: User): Promise<string> {
    return await container.get(CrudAdapter).createUser(user)
  }
  async getUser(name: string): Promise<User | null> {
    return await container.get(CrudAdapter).getUser(name)
  }
  async updateUserDetails(user: User): Promise<string> {
    return await container.get(CrudAdapter).updateUserDetails(user)
  }
  async deleteUser(name: string): Promise<string> {
    return await container.get(CrudAdapter).deleteUser(name)
  }
}
