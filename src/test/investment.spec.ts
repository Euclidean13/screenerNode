import { expect } from 'chai'
import 'mocha'
import { InvestmentFacade } from '../domain/investment/core/investmentFacade'
import { Company } from '../domain/investment/core/model/company'
import { Criteria } from '../domain/investment/core/model/criteria'

describe('Investment', () => {
  const investment = new InvestmentFacade()
  const userName = 'tonyStark'
  const companyName = 'Umbrella Corp'
  const email = 'umbrella@gmail.com'
  const has = ['Zombies', 'employees']
  const hasNot = ['CTO', 'Angeles']

  it('should return number of common elements', () => {
    const array1 = ['Zombies', 'employees']
    const array2 = ['Zombies', 'CTO', 'Angeles', 'employees']
    const commonElements = investment.findNumberOfCommonElements(array1, array2)
    expect(commonElements).to.equal(2)
  })

  it('should return percentage missing info', () => {
    const company = new Company({
      name: userName,
      email: email,
      has: has,
      hasNot: hasNot,
      meet: 0,
    })
    const criteria = new Criteria({
      mustHave: ['Zombies', 'employees'],
      superNiceToHave: ['CTO'],
      niceToHave: ['Boston'],
    })
    const missingInfoPercentage = investment.calculateMissingInfo(
      criteria,
      company
    )
    expect(missingInfoPercentage).to.equal(25)
  })

  it('should return warnings percentage', () => {
    const companyHasNot = 2
    const criteria = new Criteria({
      mustHave: ['Zombies', 'employees'],
      superNiceToHave: ['CTO'],
      niceToHave: ['Boston'],
    })
    const warnPercentage = investment.calculateWarnings(companyHasNot, criteria)
    expect(warnPercentage).to.equal(50)
  })

  it('should return matching score', () => {
    const company = new Company({
      name: userName,
      email: email,
      has: has,
      hasNot: hasNot,
      meet: 0,
    })
    const criteria = new Criteria({
      mustHave: ['Zombies', 'employees'],
      superNiceToHave: ['CTO'],
      niceToHave: ['Boston'],
    })
    const matchingScore = investment.calculateMatchingScore(criteria, company)
    expect(matchingScore).to.equal(50)
  })
})
