import { Company } from '../../model/company'
import { CompanyHaves } from '../../model/companyHaves'
import { User } from '../../model/user'

export interface CompanyOutgoing {
  addUserCompany(user: string, company: Company): Promise<string>
  getAllUserCompanies(user: string): Promise<Company[]>
  getUserCompanyDetails(
    user: string,
    company: string
  ): Promise<Company | undefined>
  makeADecision(
    user: string,
    company: string,
    decision: number
  ): Promise<string>
  updateCompanyHaves(user: string, company: Company): Promise<string>
  userDetails(user: string): Promise<User | undefined>
}
