<template>
  <v-col cols="8">
    <h4>List Food</h4>
    <v-card outline>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col" style="width:25%">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Category</th>
              <th scope="col" style="width:25%">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(items,index) in stateFoods" v-bind:key="index">
              <th scope="row">{{index+1}}</th>
              <td>{{items.title}}</td>
              <td>{{items.content}}</td>
              <td v-if="items.category == '1'">Cà Phê</td>
              <td v-else-if="items.category == '2'">Trà Sữa</td>
              <td v-else-if="items.category == '3'">Soda</td>
              <td>
                <v-btn small color="orange darken-4" dark :value="items.id" class="mr-2">Edit</v-btn>
                <v-btn small color="teal darken-3" dark @click="delFood" :value="items.id">Delete</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row align="center" justify="center" v-if="statusLoading === true">
        <v-progress-circular indeterminate color="red" size="70" width="4" class="mt-6 mb-6"></v-progress-circular>
      </v-row>
      
    </v-card>
  </v-col>
</template>

<script>
import dbApp from "@/api/dataFirebase";
import Swal from "sweetalert2";

export default {
  computed: {
    stateFoods() {
      return this.$store.getters.availableFood;
    },
    statusLoading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    delFood(idFood) {
      idFood = event.currentTarget.value;
      this.$store.dispatch("actionDelFood", idFood);
    },
  },
  created() {
    setTimeout(() => {
      this.$store.dispatch("loadDataFood").then(() => {
        this.$store.state.loading = false;
      });
    }, 2000);
  },
};
</script>

<style>
</style>