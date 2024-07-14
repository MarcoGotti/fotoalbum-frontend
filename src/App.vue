<script>
import { state } from "../src/state.js";
import PhotoCard from "./components/PhotoCard.vue";
import Pagination from "./components/Pagination.vue";
import CategoryOptions from "./components/CategoryOptions.vue";
export default {
  name: "App",
  data() {
    return {
      state,
    };
  },

  components: {
    PhotoCard,
    Pagination,
    CategoryOptions,
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

  <section class="photos" v-if="state.photos">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="col" v-for="photo in state.photos">
          <PhotoCard :photo="photo"></PhotoCard>
        </div>
      </div>

      <Pagination></Pagination>
    </div>
  </section>

  <section class="unsuccessful_call" v-else>there are no projects</section>
</template>

<style scoped></style>
