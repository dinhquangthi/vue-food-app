import Vuex from 'vuex'
import Vue from 'vue'
import dataFirebase from '../api/dataFirebase';
import { getField, updateField } from 'vuex-map-fields';
import Swal from "sweetalert2";

Vue.use(Vuex)

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
            var dataValue = dataFirebase.database().ref().once("value").then(function (snapshot) {
                var foodItem = snapshot.forEach(function (item) {
                    state.food.push({
                        id: item.key,
                        title: item.child("title").val(),
                        content: item.child("content").val(),
                        category: item.child("category").val()
                    })
                });
            });
            state.food = [];
        },
        updateTitleFood(state, value) {
            state.formInput.titleFood = value
        },
        updateContentFood(state, value) {
            state.formInput.contentFood = value
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
                        var itemDel = dataFirebase.database().ref(itemFood.id);
                        itemDel.remove();
                        // Pop-up delete success !
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Delete successfully'
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