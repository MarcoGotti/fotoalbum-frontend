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
  <header
    class="bg-warning shadow-lg position-relative z-2 d-flex flex-wrap p-5 gap-3"
  >
    <div class="col-12 col-sm-4 col-md-3">
      <label
        for="category"
        class="form-label"
        :class="state.checked ? 'text-muted' : ''"
        >Search with categories</label
      >
      <select
        class="form-select form-select-sm"
        name="category"
        id="category"
        v-model="state.category"
        @change="state.applyFilters(state.photos, state.category, state.search)"
        :disabled="state.checked"
      >
        <CategoryOptions></CategoryOptions>
      </select>
    </div>

    <div class="col-12 col-sm-4 col-md-3">
      <div class="mb-3">
        <label
          for="search"
          class="form-label"
          :class="state.checked ? 'text-muted' : ''"
          >Search by word</label
        >
        <input
          type="text"
          class="form-control form-control-sm"
          name="search"
          id=""
          v-model="state.search"
          @change="
            state.applyFilters(state.photos, state.category, state.search)
          "
          :disabled="state.checked"
        />
      </div>
    </div>

    <div
      class="col-12 col-sm-4 col-md-3 d-flex align-items-center justify-content-end pt-3"
    >
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="state.checked"
          id="checkbox"
          @change="state.showHighlights()"
        /><!-- state.checked = !state.checked -->
        <label class="form-check-label" for=""> Highlights </label>
      </div>
    </div>
  </header>
  <Loader v-if="state.loader"></Loader>
  <AppMain v-else></AppMain>
</template>

<style scoped></style>
