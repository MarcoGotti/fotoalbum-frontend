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
  <div class="card">
    <img :src="photo.upload" alt="" />
    <div class="card-body">
      {{ photo.title }}
    </div>
    <div class="card-footer">
      <div class="d-flex flex-wrap gap-1">
        <a
          class="btn btn-sm btn-dark"
          href=""
          v-for="cat in photo.categories"
          >{{ cat.name }}</a
        >
      </div>
    </div>
  </div>
</template>

<style></style>
