import { User } from '../../model/user'

export interface UserOutgoing {
  createUser(user: User): Promise<string>
  getUser(name: string): Promise<User | null>
  updateUserDetails(user: User): Promise<string>
  deleteUser(name: string): Promise<string>
}
