import Vuex from 'vuex'
import Vue from 'vue'
import  dbApp from '../api/dataFirebase';
import { getField, updateField } from 'vuex-map-fields';
import Swal from "sweetalert2";
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
Vue.use(Vuex)
var foodRef = dbApp.collection("foods");
export default new Vuex.Store({
    state: {
        food: [],
        loading: true,
    },
    getters: {
        availableFood(state, getters) {
            return state.food;
        }
    },
    actions: {
        loadDataFood(context) {
            context.commit('setFoods');
        },
        actionDelFood(context, idFood) {
            const foodItem = context.state.food.find(item => item.id == idFood);
            // console.log(foodItem);
            context.commit('removeFood', foodItem);
        }
    },
    mutations: {
        setFoods(state, foods) {
            foodRef.orderBy("created").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (items) {
                    state.food.push({
                        id: items.id,
                        title: items.data().title,
                        content: items.data().content,
                        category: items.data().category,
                        created: (new Date()).toLocaleString(),
                    })
                    // console.log(items.id);
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
            state.food = [];
        },
        removeFood(state, itemFood) {
            return new Promise((resolve, reject) => {
                // Pop-up Yes/No 
                Swal.fire({
                    title: "Are you sure delete this food ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#4caf50",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then(result => {
                    if (result.value == true) {
                        var myArray = state.food;
                        for (var i = 0; i < myArray.length; i++) {
                            if (myArray[i].id == itemFood.id) {
                                myArray.splice(i, 1);
                                break;
                            }
                        }
                        foodRef.doc(itemFood.id).delete();
                        // Pop-up delete success !
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2500,
                            timerProgressBar: true,
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Delete successfully',
                        })
                        //--------------------------//
                    } else {
                        return false;
                    }
                });
                //------------------------//
                resolve();
            }).catch(() => {
                console.log('Error !');
            })
        }
    },
})