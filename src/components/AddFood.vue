<template>
  <v-col cols="4" class="border-primary">
    <v-form v-on:submit.prevent ref="form">
      <div class="form-group">
        <label>Title</label>
        <v-text-field single-line solo clearable name="title" @input="getTitle"></v-text-field>
      </div>
      <div class="form-group">
        <label>Content</label>
        <v-text-field single-line solo clearable  name="content" @input="getContent"></v-text-field>
      </div>
      <div class="form-group">
        <label>Category</label>
        <v-select
          v-model="selected"
          :items="items"
          item-text="nameCategory"
          item-value="id"
          required
          @change="handleChange"
        ></v-select>
      </div>

      <v-row>
        <v-btn @click="logFood" small color="success">Add New Food</v-btn>
      </v-row>
    </v-form>
  </v-col>
</template>

<script>
import dataFirebase from "@/api/dataFirebase";
import Swal from "sweetalert2";

export default {
  data: () => ({
    selected: "",
    dataName: {
      title: "",
      content: "",
      category: ""
    },
    items: [
      {
        id: 1,
        nameCategory: "Cà Phê"
      },
      {
        id: 2,
        nameCategory: "Trà sữa"
      },
      {
        id: 3,
        nameCategory: "Soda"
      }
    ]
  }),
  computed: {},
  methods: {
    logFood(getTitle, getContent) {
      var addData = {};
      var newPostKey = dataFirebase
        .database()
        .ref()
        .push().key;
      addData[newPostKey] = this.dataName;
      dataFirebase
        .database()
        .ref()
        .update(addData);
      this.$store.state.food.push(this.dataName);
      Swal.fire({
        title: "Success !",
        text: "Thêm dữ liệu mới thành công !",
        icon: "success",
        confirmButtonText: "Ok"
      });
    },
    getTitle() {
      var nameTitle = event.target.value;
      this.dataName.title = nameTitle;
    },
    getContent() {
      var nameContent = event.target.value;
      this.dataName.content = nameContent;
    },
    handleChange() {
      var idCategory = this.selected;
      this.dataName.category = idCategory;
    }
  }
};
</script>

<style>
.border-primary {
  border-right: 1px solid #8b7765;
}
</style>