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
  <header class="bg-warning shadow-lg position-relative z-2 d-flex p-5 gap-5">
    <div class="col-12 col-sm-4 col-md-3">
      <label for="category" class="form-label">Search with categories</label>
      <select
        class="form-select form-select-sm"
        name="category"
        id="category"
        v-model="state.category"
        @change="state.filterSelect()"
      >
        <CategoryOptions></CategoryOptions>
      </select>
    </div>
    <div class="col-12 col-sm-4 col-md-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="state.highlights"
          id="checkbox"
          @change="state.filterCheck()"
        />
        <label class="form-check-label" for=""> Highlights </label>
      </div>
    </div>
  </header>
  <Loader v-if="state.loader"></Loader>
  <AppMain v-else></AppMain>
</template>

<style scoped></style>
