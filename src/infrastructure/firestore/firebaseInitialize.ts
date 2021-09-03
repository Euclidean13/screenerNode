/** Firebase config */
const fs = require('firebase-admin')

const serviceAccount = require('../../../screener-7ce36-firebase-adminsdk-l8jpz-d7a1127383.json')
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
})
export const db = fs.firestore()
