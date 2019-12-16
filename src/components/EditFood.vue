<template>
  <v-dialog v-model="dialog" persistent max-width="600px" class="p-4">
    <template v-slot:activator="{ on }">
      <v-btn small color="orange darken-4" dark class="mr-2" v-on="on" @click="getID">Edit</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline brown--text mx-auto font-weight-bold">Edit Food</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <div class="form-group">
            <label>Title</label>
            <v-text-field v-model="itemEdit.title" @input="getTitleEdit"></v-text-field>
          </div>
          <div class="form-group">
            <label>Content</label>
            <v-text-field v-model="itemEdit.content" @input="getContentEdit"></v-text-field>
          </div>
          <div class="form-group">
            <label>Category</label>
            <v-select
              v-model="selectedOld"
              :items="items"
              item-text="nameCategory"
              item-value="nameCategory"
              @change="changeCategory"
            ></v-select>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-3" dark text @click="saveEdit">Save</v-btn>
        <v-btn color="blue darken-3" dark text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dbApp from "@/api/dataFirebase";
import firebase from "firebase/app";
import Swal from "sweetalert2";
const foodRef = dbApp.collection("foods");

export default {
  data: () => ({
    dialog: false,
    selectedOld: "",
    itemEdit: {
      title: "",
      content: "",
      category: "",
      created: ""
    },
    items: [
      {
        id: 1,
        nameCategory: "Coffee"
      },
      {
        id: 2,
        nameCategory: "Milk"
      },
      {
        id: 3,
        nameCategory: "Soda"
      }
    ]
  }),
  methods: {
    getID() {
      var idFoodEdit = this.$attrs.value;
      foodRef
        .doc(idFoodEdit)
        .get()
        .then(element => {
          if (element.exists) {
            this.itemEdit.title = element.data().title;
            this.itemEdit.content = element.data().content;
            this.selectedOld = element.data().category;
            this.itemEdit.category = element.data().category;
          } else {
            alert("No such document!");
          }
        });
    },
    getTitleEdit() {
      var newTitle = event.target.value;
      this.itemEdit.title = newTitle;
    },
    getContentEdit() {
      var newContent = event.target.value;
      this.itemEdit.content = newContent;
    },
    changeCategory(){
        var newCategory = this.selectedOld;
      this.itemEdit.category = newCategory;
    },
    saveEdit() {
      var idFoodEdit = this.$attrs.value;
      var timeCreated = firebase.firestore.Timestamp.now();
      this.itemEdit.created = timeCreated;
      foodRef.doc(idFoodEdit).set(this.itemEdit);
      this.$store.dispatch("loadDataFood");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });
      Toast.fire({
        icon: "success",
        title: "Edit successfully"
      });
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>