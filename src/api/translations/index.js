export default  {
  getTranslations: () => this.$apireq.get('/translations'),
  findTranslation: (key) => this.$api.get(`translations?filter`)
}

