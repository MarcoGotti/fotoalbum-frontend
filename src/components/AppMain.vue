<script>
import { state } from "../state.js";
import PhotoCard from "./PhotoCard.vue";
import Pagination from "./Pagination.vue";

export default {
  name: "AppMain",
  data() {
    return {
      state,
    };
  },

  components: {
    PhotoCard,
    Pagination,
  },
};
</script>
<template>
  <main>
    <section class="photos" v-if="state.filteredPhotos.length > 0">
      <div class="container py-5">
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
          <div class="col" v-for="photo in state.filteredPhotos">
            <!-- v-show="!photo.is_draft" mi dà colonna vuota -->
            <PhotoCard :photo="photo"></PhotoCard>
          </div>
        </div>

        <Pagination v-show="!state.category && !state.highlights"></Pagination>
      </div>
    </section>

    <section class="no_results d-flex justify-content-center" v-else>
      there are no projects
    </section>
  </main>
</template>
