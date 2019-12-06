import firebase from "firebase/app";
import "firebase/database";

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
 
firebase.initializeApp(firebaseConfig);

const dbApp = firebase;

export default dbApp;

 
   //  dataFirebase.database().ref(itemFood.id).once("value",function(snapshot){
            //     var bb = snapshot.val();
            //     console.log(bb);
            //  })