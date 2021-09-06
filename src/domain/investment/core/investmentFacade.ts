import Container, { Service } from 'typedi'
import { InvestmentAdapter } from '../infrastructure/investmentAdapter'
import { Company } from './model/company'
import { CompanyHaves } from './model/companyHaves'
import { Criteria } from './model/criteria'
import { Funnel } from './model/funnel'
import { User } from './model/user'
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
          (el) => companyHaves.haveNot.indexOf(el) < 0
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

  async getUserCompaniesFunnel(user: string): Promise<Funnel[]> {
    const userSelected: User | undefined = await container
      .get(InvestmentAdapter)
      .userDetails(user)
    if (userSelected !== undefined) {
      return userSelected.companies.map((el: Company) => {
        return new Funnel({
          company: el.name,
          email: el.email,
          matchingScore: this.calculateMatchingScore(userSelected.criteria, el),
          warnings: this.calculateWarnings(
            el.hasNot.length,
            userSelected.criteria
          ),
          missingInfo: this.calculateMissingInfo(userSelected.criteria, el),
          mustHaves: this.calculateMustHavesMatchPercentage(
            userSelected.criteria.mustHave,
            el.has
          ),
          superNiceToHave: this.calculateSuperNiceToHaveMatchPercentage(
            userSelected.criteria.superNiceToHave,
            el.has
          ),
          niceToHaves: this.calculateNiceToHaveMatchPercentage(
            userSelected.criteria.niceToHave,
            el.has
          ),
          meet: el.meet,
        })
      })
    } else {
      return []
    }
  }

  calculateMatchingScore(criteria: Criteria, company: Company): number {
    const mustHave: number = this.findNumberOfCommonElements(
      criteria.mustHave,
      company.has
    )
    const superNiceToHave: number = this.findNumberOfCommonElements(
      criteria.superNiceToHave,
      company.has
    )
    const niceToHave: number = this.findNumberOfCommonElements(
      criteria.niceToHave,
      company.has
    )
    const criteriaElements = [
      ...criteria.mustHave,
      ...criteria.superNiceToHave,
      ...criteria.niceToHave,
    ]
    return (
      ((mustHave + superNiceToHave + niceToHave) / criteriaElements.length) *
      100
    )
  }

  calculateMustHavesMatchPercentage(
    criteriaMustHave: Array<string>,
    companyMustHave: Array<string>
  ): number {
    return (
      (this.findNumberOfCommonElements(criteriaMustHave, companyMustHave) /
        criteriaMustHave.length) *
      100
    )
  }

  calculateSuperNiceToHaveMatchPercentage(
    criteriaSuperNiceToHave: Array<string>,
    companySuperNiceToHave: Array<string>
  ): number {
    return (
      (this.findNumberOfCommonElements(
        criteriaSuperNiceToHave,
        companySuperNiceToHave
      ) /
        criteriaSuperNiceToHave.length) *
      100
    )
  }

  calculateNiceToHaveMatchPercentage(
    criteriaNiceToHave: Array<string>,
    companyNiceToHave: Array<string>
  ): number {
    return (
      (this.findNumberOfCommonElements(criteriaNiceToHave, companyNiceToHave) /
        criteriaNiceToHave.length) *
      100
    )
  }

  calculateWarnings(companyHasNot: number, criteria: Criteria): number {
    const criteriaElements = [
      ...criteria.mustHave,
      ...criteria.superNiceToHave,
      ...criteria.niceToHave,
    ]
    return (companyHasNot / criteriaElements.length) * 100
  }

  calculateMissingInfo(criteria: Criteria, company: Company): number {
    const criteriaElements = [
      ...criteria.mustHave,
      ...criteria.superNiceToHave,
      ...criteria.niceToHave,
    ]
    const companyElements = [...company.has, ...company.hasNot]
    const commonElements = this.findNumberOfCommonElements(
      criteriaElements,
      companyElements
    )
    return (
      ((criteriaElements.length - commonElements) / criteriaElements.length) *
      100
    )
  }

  findNumberOfCommonElements(
    array1: Array<string>,
    array2: Array<string>
  ): number {
    let commonElements: Array<string> = []
    for (const el1 of array1) {
      for (const el2 of array2) {
        if (el1 === el2) {
          if (!commonElements.includes(el1)) {
            commonElements.push(el1)
          }
        }
      }
    }
    return commonElements.length
  }
}
