import { Company } from '../../model/company'
import { CompanyHaves } from '../../model/companyHaves'

export interface CompanyIncoming {
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
  updateCompanyHaves(
    user: string,
    company: string,
    companyHaves: CompanyHaves
  ): Promise<string>
}
