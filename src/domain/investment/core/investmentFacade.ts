import Container, { Service } from 'typedi'
import { InvestmentAdapter } from '../infrastructure/investmentAdapter'
import { Company } from './model/company'
import { CompanyHaves } from './model/companyHaves'
import { Criteria } from './model/criteria'
import { CompanyIncoming } from './ports/incoming/companyIncoming'
import { CriteriaIncoming } from './ports/incoming/criteriaIncoming'

const container = Container.of()

@Service({ global: true })
export class InvestmentFacade implements CriteriaIncoming, CompanyIncoming {
  addUserCriteriaHave(user: string, criteria: Criteria): Promise<Criteria> {
    return container.get(InvestmentAdapter).addUserCriteriaHave(user, criteria)
  }

  deleteUserCriteriaHave(user: string, criteria: Criteria): Promise<Criteria> {
    return container
      .get(InvestmentAdapter)
      .deleteUserCriteriaHave(user, criteria)
  }

  getUserCriteria(user: string): Promise<Criteria | null> {
    return container.get(InvestmentAdapter).getUserCriteria(user)
  }

  addUserCompany(user: string, company: Company): Promise<string> {
    return container.get(InvestmentAdapter).addUserCompany(user, company)
  }

  getAllUserCompanies(user: string): Promise<Company[]> {
    return container.get(InvestmentAdapter).getAllUserCompanies(user)
  }

  getUserCompanyDetails(
    user: string,
    company: string
  ): Promise<Company | undefined> {
    return container.get(InvestmentAdapter).getUserCompanyDetails(user, company)
  }

  makeADecision(
    user: string,
    company: string,
    decision: number
  ): Promise<string> {
    return container
      .get(InvestmentAdapter)
      .makeADecision(user, company, decision)
  }

  async updateCompanyHaves(
    user: string,
    company: string,
    companyHaves: CompanyHaves
  ): Promise<string> {
    // Get user company details
    const companyDetails = await this.getUserCompanyDetails(user, company)
    let finalHaves = companyDetails !== undefined ? companyDetails.has : []
    let finalHaveNot = companyDetails !== undefined ? companyDetails.hasNot : []

    // Compare existing with new ones
    if (companyHaves.have.length !== 0 && companyDetails !== undefined) {
      finalHaves = [...new Set([...companyDetails.has, ...companyHaves.have])]
      if (companyDetails.hasNot.length !== 0) {
        finalHaveNot = finalHaveNot.filter(
          (el) => companyHaves.have.indexOf(el) < 0
        )
      }
    }

    if (companyHaves.haveNot.length !== 0 && companyDetails !== undefined) {
      finalHaveNot = [
        ...new Set([...companyDetails.hasNot, ...companyHaves.haveNot]),
      ]
      if (companyDetails.has.length !== 0) {
        finalHaves = finalHaves.filter(
          (el) => companyHaves.missing.indexOf(el) < 0
        )
      }
    }

    if (companyHaves.missing.length !== 0) {
      finalHaves = finalHaves.filter(
        (el) => companyHaves.missing.indexOf(el) < 0
      )
      finalHaveNot = finalHaveNot.filter(
        (el) => companyHaves.missing.indexOf(el) < 0
      )
    }

    // Update company haves
    const newCompany = new Company({
      name: companyDetails?.name,
      email: companyDetails?.email,
      has: finalHaves,
      hasNot: finalHaveNot,
      meet: companyDetails?.meet,
    })

    return container.get(InvestmentAdapter).updateCompanyHaves(user, newCompany)
  }
}
