import { Company } from './company'
import { Criteria } from './criteria'

export class User {
  public name: string = ''
  public email: string = ''
  public criteria!: Criteria
  public companies: Array<Company> = []

  public constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }
}
