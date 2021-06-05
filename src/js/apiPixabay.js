const apiPixabay = {
  keyPixabay: '21857111-8554c096d1798b5dae4546d72',
  urlPixabay: 'https://pixabay.com/api/',
  searchInput: '',
  page: 1,


  fetchImages() {
    return fetch(`${this.urlPixabay}?image_type=photo&orientation=horizontal&q=${this.searchInput}&page=${this.page}&per_page=12&key=${this.keyPixabay}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Error");
      })
      .then(({hits}) => {
        this.incrementpage();
        return hits;
      });
  },

  resetpage() {
    this.page = 1;
  },

  incrementpage() {
    this.page += 1;
  },
};

export default apiPixabay;