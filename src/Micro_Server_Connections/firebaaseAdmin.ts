import admin from 'firebase-admin'
var serviceAccount =require('../../service_acount_firebase.json')

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL: "https://beru-36801.firebaseio.com"
})

export default admin