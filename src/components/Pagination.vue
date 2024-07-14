<script>
import { state } from "../state.js";
export default {
  name: "Pagination",
  data() {
    return {
      state,
    };
  },
};
</script>
<template>
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
        <button type="button" class="page-link" @click="state.goTo(link.url)">
          <span v-html="link.label"></span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style></style>
