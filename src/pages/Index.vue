<template>
  <div class="q-pa-md">
    <q-table
      title="Translations"
      :rows="translations"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      filter:null,
      colomns: [
        {
          name: 'name',
          required: true,
          label: 'key',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'en',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'es',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
      ],
    }
  },
  async created() {
    const { data } = await this.$apireq.get("/translations")
    this.getTranslation(data)
  },

  computed :{
    ...mapGetters('translationsModule', ['translations']),
  },

  methods: {
    ...mapActions('translationsModule', ['getTranslation']),
  }

});
</script>
