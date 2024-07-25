<script>
import { state } from "../state.js";
export default {
  name: "PhotoCard",
  props: {
    photo: Object,
  },
  data() {
    return {
      state,
    };
  },
};
</script>

<template>
  <div class="card bg-warning-subtle">
    <img
      :class="photo.is_highlight ? 'border border-warning border-3' : ''"
      :src="photo.upload"
      alt=""
    />
    <div class="card-body">
      {{ photo.title }}
    </div>
    <div class="card-footer">
      <div class="d-flex flex-wrap gap-1">
        <button
          class="btn btn-sm btn-dark"
          @click="
            state.category = cat.id;
            state.filterSelect();
          "
          v-for="cat in photo.categories"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
