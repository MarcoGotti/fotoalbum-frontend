import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
  base_api_url: "http://127.0.0.1:8000",
  photos_endpoint: "/api/photos",
  categories_endpoint: "/api/categories/",
  photos: null,
  results: null,
  category: "",
  categories: [],
  loader: true,
  highlights: false,

  fetchData(url) {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        response.data.results.data
          ? (this.photos = response.data.results.data)
          : (this.photos = response.data.results.photos);

        /* this.photos.forEach(
          (photo) =>
            (photo.category_ids = photo.categories.map((cat) => cat.id))
        ); */

        this.results = response.data.results;
        this.loader = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  goTo(url) {
    this.fetchData(url);
  },

  /* filterByCategory(arr, category) {
    if (!category) return arr;
    return arr.filter((photo) => photo.category_ids.includes(category));
  }, */

  filterSelect() {
    if (!this.category) {
      const url = state.base_api_url + state.photos_endpoint;
      state.fetchData(url);
    } else {
      const url = this.base_api_url + this.categories_endpoint + this.category;
      console.log(url);
      state.fetchData(url);
    }
  },

  filterCheck() {
    const url =
      this.base_api_url +
      this.photos_endpoint +
      (this.highlights ? `?is_highlight=${this.highlights}` : "");
    console.log(url);
    state.fetchData(url);
  },
});
