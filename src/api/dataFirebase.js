import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBiBnL9t2LfrOxbsQJvzIPCnnsXJDDySJg",
    authDomain: "vue-food-app.firebaseapp.com",
    databaseURL: "https://vue-food-app.firebaseio.com",
    projectId: "vue-food-app",
    storageBucket: "vue-food-app.appspot.com",
    messagingSenderId: "925815299346",
    appId: "1:925815299346:web:0c627e29a0cc0a2167e7cb",
    measurementId: "G-JC1LC9WTJT"
};
 const dbApp = firebase
    .initializeApp(firebaseConfig)
    .firestore();
export default dbApp;

// var data = [
//     {
//         title: 'Matcha Iceblend', content: '100% da', category: 'Tra Sua'
//     },
//     {
//         title: 'Ca Phe Sua', content: 'Latte', category: 'Coffee'
//     },
//     {
//         title: 'Soda Chanh', content: 'Khong Duong', category: 'Soda'
//     },
// ]


// data.forEach((items) => {
//     foodRef.doc().set({
//        title: items.title,
//        content: items.content,
//        category: items.category,
//     })
// });
// var foodDel = dbApp.collection("foods") .onSnapshot(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//      console.log(doc.data());
//     });
// })
