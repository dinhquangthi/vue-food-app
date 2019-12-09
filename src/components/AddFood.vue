<template>
  <v-col cols="4" class="border-primary">
    <v-form  ref="form" >
      <div class="form-group">
        <label>Title</label>
        <v-text-field
          :rules="[rules.required]"
          single-line
          solo
          clearable
          name="title"
          @input="getTitle"
        ></v-text-field>
      </div>
      <div class="form-group">
        <label>Content</label>
        <v-text-field
          :rules="[rules.required]"
          single-line
          solo
          clearable
          name="content"
          @input="getContent"
        ></v-text-field>
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
import dbApp from "@/api/dataFirebase";
import firebase from 'firebase/app'
import Swal from "sweetalert2";

export default {
  data: () => ({
    selected: "",
    dataName: {
      title: null,
      content: null,
      category: null,
      created: firebase.firestore.Timestamp.now(),
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
    ],
    rules: {
      required: value => !!value || "Không được để trống."
    }
  }),
  computed: {

  },
  methods: {
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
    },
    logFood(getTitle, getContent) {
      var foodRef = dbApp.collection("foods");
      if (this.dataName.title == null || this.dataName.title == "") {
        Swal.fire({
          title: "Warning !",
          text: "Vui lòng nhập Title",
          icon: "warning",
          confirmButtonText: "Ok"
        });
      } else if (this.dataName.content == null || this.dataName.content == "") {
        Swal.fire({
          title: "Warning !",
          text: "Vui lòng nhập Content",
          icon: "warning",
          confirmButtonText: "Ok"
        });
      } else if (
        this.dataName.category == null ||
        this.dataName.category == ""
      ) {
        Swal.fire({
          title: "Warning !",
          text: "Vui lòng chọn Category",
          icon: "warning",
          confirmButtonText: "Ok"
        });
      } else {
        foodRef.doc().set(this.dataName);
        this.$store.state.food.push(this.dataName);
        Swal.fire({
          title: "Success !",
          text: "Thêm dữ liệu mới thành công !",
          icon: "success",
          confirmButtonText: "Ok"
        });
         this.$store.dispatch("loadDataFood").then(() => {this.$refs.form.reset();});
       // this.$refs.form.reset();
      }
    }
  }
};
</script>

<style>
.border-primary {
  border-right: 1px solid #8b7765;
}
</style>