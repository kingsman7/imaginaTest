export default {
  methods: {
    getLabelqName (obj) {
      if (!obj) return;
      return `${Object.entries(obj)[0][0]}`
    }
  }
}
