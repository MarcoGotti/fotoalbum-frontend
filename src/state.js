import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
  base_api_url: "http://127.0.0.1:8000",
  photos_endpoint: "/api/photos",
  categories_endpoint: "/api/categories/",
  photos: null,
  filteredPhotos: null,
  results: null,
  category: "",
  search: "",
  checked: false,
  highlights: false,
  categories: [],
  loader: true,
  /* IL PROBLEMA STA NEL PAGINATE()  */
  fetchData(url) {
    axios
      .get(url)
      .then((response) => {
        console.log(response);

        /* if (response.data.results.data) {
          this.photos = response.data.results.data;
          this.results = response.data.results;

        } else if (response.data.results.photos) {
          this.photos = response.data.results.photos.filter(
            (photo) => photo.is_draft != 1);

        } else {
          this.photos = response.data.results;
        } */

        /* response.data.results.data
          ? (this.photos = response.data.results.data) &&
            (this.results = response.data.results)
          : response.data.results.photos
          ? (this.photos = response.data.results.photos.filter(
              (photo) => photo.is_draft != 1
            ))
          : (this.photos = response.data.results);
        */

        /* this.photos = response.data.results.data; */
        this.photos = response.data.results;
        this.results = response.data.results;

        this.photos.forEach(
          (photo) =>
            (photo.category_ids = photo.categories.map((cat) => cat.id))
        );

        this.applyFilters(state.photos, state.category, state.search);
        //this.applyFilters();
        this.loader = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /* filterSelect(arr, category) {
    if (!category) return arr;
    return arr.filter((photo) => photo.category_ids.includes(category));
  }, */

  showHighlights() {
    //this.filterPhotos = this.filterSelect(this.photos, this.category);
    if (this.checked) {
      this.filterCheck(this.photos);
      this.category = "";
      this.search = "";
    } else {
      //this.filterSelect(this.photos, this.category);
      this.applyFilters(this.photos, this.category, this.search);
    }
    console.log(this.filteredPhotos);
  },

  filterCheck(arr) {
    this.filteredPhotos = arr.filter((photo) => photo.is_highlight);
  },

  applyFilters(arr, category, search) {
    if (!category) {
      console.log("all");
      this.filteredPhotos = arr.filter((photo) =>
        photo.title.toLowerCase().includes(this.search.trim().toLowerCase())
      );
    } else {
      console.log("select");
      this.filteredPhotos = arr.filter((photo) => {
        return (
          photo.category_ids.includes(category) &&
          photo.title.toLowerCase().includes(search.trim().toLowerCase())
        );
      });
    }
    console.log(this.filteredPhotos);
  },

  filterSelect(arr, category) {
    if (!category) {
      this.filteredPhotos = arr;
    } else {
      this.checked = false;
      this.filteredPhotos = arr.filter((photo) =>
        photo.category_ids.includes(category)
      );
    }
  },

  filtersearch() {
    this.filteredPhotos = this.photos.filter((photo) =>
      photo.title.toLowerCase().includes(this.search.trim().toLowerCase())
    );
  },

  /* filterSelect() {
    if (!this.category) {
      const url = state.base_api_url + state.photos_endpoint;
      state.fetchData(url);
    } else {
      this.highlights = false;
      const url = this.base_api_url + this.categories_endpoint + this.category;
      console.log(url);
      state.fetchData(url);
    }
  }, */

  /* filterCheck() {
    this.category = "";
    const url =
      this.base_api_url +
      this.photos_endpoint +
      (this.highlights ? `?is_highlight=${this.highlights}` : "");
    console.log(url);
    state.fetchData(url);
  }, */

  goTo(url) {
    this.fetchData(url);
  },
});
