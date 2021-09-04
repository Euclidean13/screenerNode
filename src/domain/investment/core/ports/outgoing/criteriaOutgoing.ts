import { Criteria } from '../../model/criteria'

export interface CriteriaOutgoing {
  addUserCriteriaHave(user: string, criteria: Criteria): Promise<Criteria>
  deleteUserCriteriaHave(user: string, criteria: Criteria): Promise<Criteria>
  getUserCriteria(user: string): Promise<Criteria | null>
}
