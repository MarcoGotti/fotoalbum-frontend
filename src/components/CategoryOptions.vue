<script>
import axios from "axios";
import { state } from "../state.js";
export default {
  name: "CategoryOptions",
  data() {
    return {
      state,
    };
  },
  created() {
    this.getCategories;
  },
  computed: {
    getCategories() {
      axios
        .get(state.base_api_url + state.categories_endpoint)
        .then((response) => {
          state.categories = response.data.results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <option value="" selected>All</option>
  <option v-for="cat in state.categories" :value="cat.id">
    {{ cat.name }}
  </option>
</template>

<style scoped></style>
