import { Service } from 'typedi'
import { User } from '../core/model/user'
import { UserOutgoing } from '../core/ports/outgoing/userOutgoing'
import { db } from '../../../infrastructure/firestore/firebaseInitialize'

const COLLECTION_NAME = 'users'

@Service({ global: true })
export class CrudAdapter implements UserOutgoing {
  async createUser(user: User): Promise<string> {
    const res = await db
      .collection(COLLECTION_NAME)
      .doc(user.name)
      .set(user)
      .then((docRef: any) => {
        return `UserId: ${docRef.id}`
      })
      .catch((err: any) => {
        console.log(err)
        return undefined
      })
    return res
  }
  async getUser(name: string): Promise<User | null> {
    const user = db.collection(COLLECTION_NAME).doc(name)
    const doc = await user.get()
    if (!doc.exists) {
      return null
    } else {
      return doc.data()
    }
  }
  async updateUserDetails(user: User): Promise<string> {
    const aux = db.collection(COLLECTION_NAME).doc(user.name)
    const res = await aux
      .update(user)
      .then((docRef: any) => {
        return `UserId: ${docRef.id}`
      })
      .catch((err: any) => {
        console.log(err)
        return undefined
      })
    return res
  }
  async deleteUser(name: string): Promise<string> {
    const res = await db
      .collection(COLLECTION_NAME)
      .doc(name)
      .delete()
      .then((docRef: any) => {
        return `UserId: ${docRef.id}`
      })
      .catch((err: any) => {
        console.log(err)
        return undefined
      })
    return res
  }
}
