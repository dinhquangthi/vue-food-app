<template>
  <v-app >
    <v-container>
      <v-row mt="4">
        <v-col col="12">
          <h2 class="text-center font-weight-bold">Data Firebase</h2>
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