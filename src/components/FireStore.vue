<template>
  <v-col cols="8">
    <h4 class="teal--text text-center headline font-weight-bold mb-6">List Food</h4>
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
              <td>{{items.category}}</td>
            
              <td>
                <EditFood :value="items.id"></EditFood>
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
import EditFood from "@/components/EditFood"
export default {
  components: {
    EditFood
  },
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
  }
};
</script>

<style>
</style>