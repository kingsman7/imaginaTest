<template>
  <div class="q-pa-md">
    <q-circular-progress
      v-if="loading"
      indeterminate
      size="50px"
      color="lime"
      class="q-ma-md"
    />
    <div v-else class="row">
      <div class="col-6">
        <h1>ES</h1>
        <app-list :lang="es"  />
      </div>
      <div class="col-6">
        <h1>EN</h1>
        <app-list :lang="en"  />
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import appList from "components/lists"

export default defineComponent({
  name: "PageIndex",

  components: { appList },

  async created() {
    const { data } = await this.$apireq.get("/translations")
    this.getTranslation(data)
  },

  computed :{
    ...mapGetters('translationsModule', ['translations', 'langReduce']),
    loading () {
      return this.translations.length <= 0
    },
    en () { return this.translations.map(item => item.en)},
    es () { return this.translations.map(item => item.es)}
  },

  methods: {
    ...mapActions('translationsModule', ['getTranslation', 'triggerReduce']),
  }

});
</script>

<style lang="scss" scoped>
  .container {
    padding: 0, 10%;
  }
</style>
