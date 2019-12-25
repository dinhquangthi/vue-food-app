<template>
  <v-app >
    <div class="blue darken-1 pt-8 pb-6">
          <h2 class="text-center white--text font-weight-bold">Todo App VueJS + Firebase</h2>
    </div>
    <v-container>
      <v-row mt="4">
        <v-col col="12">
          <v-row>
            <AddFood />
            <FireStore />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import FireStore from './components/FireStore'
import AddFood from './components/AddFood'


export default {
  name: "App",
  components: {
    AddFood,
    FireStore,
    
  }
};
</script>
<style>
.theme--light.v-application{
  background: white;
}
</style>