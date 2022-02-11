<template>
  <div class="q-pa-md">
    <q-circular-progress
      v-if="loading"
      indeterminate
      size="50px"
      color="lime"
      class="q-ma-md"
    />
    <q-input
      borderless
      dense
      v-model="filter"
      placeholder="Search"
      class="col-10 q-px-xl q-mt-xl q-mb-md"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div v-if="!loading" class="row">
      <div class="col-6">
        <div class="text-h2 q-ml-md">ES</div>
        <app-list :lang="es"  />
      </div>
      <div class="col-6">
        <div class="text-h2 q-ml-md">EN</div>
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
  data () {
    return {
      filter: '',
    }
  },
  async created() {
    const { data } = await this.$apireq.get("/translations")
    this.getTranslation(data)
  },

  computed :{
    ...mapGetters('translationsModule', ['translations', 'langReduce']),
    loading () {
      return this.translations.length <= 0
    },
    en () { return this.filterTranslate.map(item => item.en)},
    es () { return this.filterTranslate.map(item => item.es)},
    filterTranslate () {
      if (!this.translations) {
        return;
      }
      if (!this.filter) {
        return this.translations;
      }
      const arg = this.filter.toLowerCase();
      return this.translations.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(arg);
      });
    }
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
