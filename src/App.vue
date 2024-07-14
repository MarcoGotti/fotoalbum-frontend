<script>
import { state } from "../src/state.js";
import PhotoCard from "./components/PhotoCard.vue";

export default {
  name: "App",
  data() {
    return {
      state,
    };
  },

  components: {
    PhotoCard,
  },

  mounted() {
    const url = state.base_api_url + state.photos_endpoint;
    //console.log(url);
    state.fetchData(url);
  },
};
</script>

<template>
  <section class="photos" v-if="state.photos">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="col" v-for="photo in state.photos">
          <PhotoCard :photo="photo"></PhotoCard>
        </div>
      </div>

      <nav
        aria-label="Page navigation"
        v-if="state.results.total > state.results.per_page"
      >
        <ul class="pagination pagination-sm justify-content-center">
          <li
            class="page-item"
            :class="{ disabled: !link.url, active: link.active }"
            v-for="link in state.results.links"
          >
            <button
              type="button"
              class="page-link"
              @click="state.goTo(link.url)"
            >
              <span v-html="link.label"></span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </section>

  <section class="unsuccessful_call" v-else>
    <!-- "state.projects.length == 0" -->
    there are no projects
  </section>
</template>

<style scoped></style>
