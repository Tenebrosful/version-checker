<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Version Checker</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/register" text v-if="!isLogged">
        <span class="mr-2">Register</span>
      </v-btn>

      <v-btn to="/login" text v-if="!isLogged">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component, Watch } from 'vue-property-decorator'


@Component({})
export default class App extends Vue {
  public logged = false;

  mounted() {
    let tokenLS = localStorage.getItem("token");
    if (tokenLS) {
      axios
        .get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${tokenLS}`,
          },
        })
        .then(() => {
          this.$store.commit('setToken', tokenLS);
        });
    }
  }




  @Watch('$store.state')
  get isLogged(){
    return this.$store.getters.isLogged;
  }

}
</script>
