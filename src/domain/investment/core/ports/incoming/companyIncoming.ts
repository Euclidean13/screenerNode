import { Company } from '../../model/company'
import { CompanyHaves } from '../../model/companyHaves'
import { Funnel } from '../../model/funnel'

export interface CompanyIncoming {
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
  updateCompanyHaves(
    user: string,
    company: string,
    companyHaves: CompanyHaves
  ): Promise<string>
  getUserCompaniesFunnel(user: string): Promise<Funnel[]>
}
