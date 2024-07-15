<script>
import { state } from "../src/state.js";
import AppMain from "./components/AppMain.vue";
import CategoryOptions from "./components/CategoryOptions.vue";
import Loader from "./components/Loader.vue";

export default {
  name: "App",
  data() {
    return {
      state,
    };
  },

  components: {
    AppMain,
    CategoryOptions,
    Loader,
  },

  mounted() {
    const url = state.base_api_url + state.photos_endpoint;
    state.fetchData(url);
  },
};
</script>

<template>
  <header class="d-flex p-5">
    <div class="col-12 col-sm-4 col-md-3">
      <!-- <label for="" class="form-label">City</label> -->
      <select
        class="form-select form-select-sm"
        name="category"
        id="category"
        v-model="state.category"
        @change="state.applyFilter()"
      >
        <CategoryOptions></CategoryOptions>
      </select>
    </div>
  </header>
  <Loader v-if="state.loader"></Loader>
  <AppMain v-else></AppMain>
</template>

<style scoped></style>
