import { Criteria } from '../core/model/criteria'
import { Company } from '../core/model/company'
import { CompanyHaves } from '../core/model/companyHaves'
import { CompanyOutgoing } from '../core/ports/outgoing/companyOutgoing'
import { CriteriaOutgoing } from '../core/ports/outgoing/criteriaOutgoing'
import { db } from '../../../infrastructure/firestore/firebaseInitialize'
import { User } from '../core/model/user'
import { Service } from 'typedi'

const COLLECTION_NAME = 'users'
const admin = require('firebase-admin')

@Service({ global: true })
export class InvestmentAdapter implements CriteriaOutgoing, CompanyOutgoing {
  /** Criteria -------------------------------------------------------------- */

  async addUserCriteriaHave(
    user: string,
    criteria: Criteria
  ): Promise<Criteria> {
    const doc = db.collection(COLLECTION_NAME).doc(user)
    if (criteria.mustHave.length !== 0) {
      for (const mustHave in criteria.mustHave) {
        await doc.update({
          criteria: {
            mustHave: admin.firestore.FieldValue.arrayUnion(mustHave),
          },
        })
      }
    }
    if (criteria.superNiceToHave.length !== 0) {
      for (const superNiceToHave in criteria.superNiceToHave) {
        await doc.update({
          criteria: {
            superNiceToHave:
              admin.firestore.FieldValue.arrayUnion(superNiceToHave),
          },
        })
      }
    }
    if (criteria.niceToHave.length !== 0) {
      for (const niceToHave in criteria.niceToHave) {
        await doc.update({
          criteria: {
            niceToHave: admin.firestore.FieldValue.arrayUnion(niceToHave),
          },
        })
      }
    }
    const finalCriteria: User = await doc.get()
    return finalCriteria.criteria
  }

  async deleteUserCriteriaHave(
    user: string,
    criteria: Criteria
  ): Promise<Criteria> {
    const doc = db.collection(COLLECTION_NAME).doc(user)
    if (criteria.mustHave.length !== 0) {
      for (const mustHave in criteria.mustHave) {
        await doc.update({
          criteria: {
            mustHave: admin.firestore.FieldValue.arrayRemove(mustHave),
          },
        })
      }
    }
    if (criteria.superNiceToHave.length !== 0) {
      for (const superNiceToHave in criteria.superNiceToHave) {
        await doc.update({
          criteria: {
            superNiceToHave:
              admin.firestore.FieldValue.arrayRemove(superNiceToHave),
          },
        })
      }
    }
    if (criteria.niceToHave.length !== 0) {
      for (const niceToHave in criteria.niceToHave) {
        await doc.update({
          criteria: {
            niceToHave: admin.firestore.FieldValue.arrayRemove(niceToHave),
          },
        })
      }
    }
    const finalCriteria: User = await doc.get().data()
    return finalCriteria.criteria
  }
  async getUserCriteria(user: string): Promise<Criteria | null> {
    const ref = db.collection(COLLECTION_NAME).doc(user)
    const doc = await ref.get()
    if (!doc.exists) {
      return null
    } else {
      return doc.data
    }
  }

  /** Company --------------------------------------------------------------- */

  async getAllUserCompanies(user: string): Promise<Company[]> {
    const ref = db.collection(COLLECTION_NAME).doc(user)
    const doc = await ref.get()
    if (!doc.exists) {
      return []
    } else {
      const user: User = doc.data
      return user.companies
    }
  }
  async getUserCompanyDetails(
    user: string,
    company: string
  ): Promise<Company | undefined> {
    const ref = db.collection(COLLECTION_NAME).doc(user)
    const doc = await ref.get()
    if (!doc.exists) {
      return undefined
    } else {
      return ref
        .get()
        .data.companies.filter((e: Company) => e.name === company)[0]
    }
  }
  async makeADecision(
    user: string,
    company: string,
    decision: number
  ): Promise<string> {
    const ref = db.collection(COLLECTION_NAME).doc(user)
    const userSelected: User = await ref.get().data
    userSelected.companies.forEach((e) => {
      if (e.name === company) {
        e.meet = decision
      }
    })
    return ref
      .update(userSelected)
      .then(() => `Decision user: ${user}, company: ${company} updated`)
      .catch((err: any) => 'Unable to update decision')
  }
  async updateCompanyHaves(user: string, company: Company): Promise<string> {
    const ref = db.collection(COLLECTION_NAME).doc(user)
    const userSelected: User = await ref.get().data
    userSelected.companies.forEach((e) => {
      if (e.name === company.name) {
        e.has = company.has
        e.hasNot = company.hasNot
      }
    })
    return ref
      .update(userSelected)
      .then(() => `Company haves user: ${user}, company: ${company} updated`)
      .catch((err: any) => 'Unable to update company haves')
  }
}
