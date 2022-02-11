<template>
  <div class="q-pa-md">
    <q-list
      bordered
      class="rounded-borders"
      v-for="(items, key) in format" :key="key"
    >
      <app-card class="q-mb-sm" :qname="items">
        <q-list
          bordered
          class="rounded-borders"
          v-for="(item, key) in getArray(items[getLabelqName(items)])" :key="key"
        >
          <app-card :qname="item">
            {{ item[getLabelqName(item)].title}}
            {{ item[getLabelqName(item)].image}}
          </app-card>
        </q-list>
      </app-card>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import appCard from "components/card"
import nameMixins from "src/mixins/getLabelName"

export default defineComponent({
  name: "appList",
  components: { appCard },
  mixins: [ nameMixins ],
  props: {
    lang: {
      type: Array,
    }
  },
  data () {
    return {
      translations: []
    }
  },
  computed: {
    format () {
      if (!this.lang) return [];
      const clon = JSON.parse(JSON.stringify(this.lang))
       return this.setTranslations(clon)
    }
  },
  methods: {
    getLabelName (obj) {
      if (!obj) return;
      return `${Object.entries(Object.entries(obj)[0][1])[0][0]}`
    },
    getValue (obj) {
      if (!obj) return;
      return Object.entries(Object.entries(obj)[0][1])[0][1]
    },
    getArray (obj) {
      if (!obj) return [];
      const arr = []
      for (let key in obj) {
        arr.push({[key]: obj[key]})
      }
      return arr
    },
    setTranslations (array) {
      const newArray = array.reduce((acc, item) => {
        if (acc.length > 0 ) {
          acc.map((val) => {
            if (Object.entries(val)[0].includes(`${Object.entries(item)[0][0]}`)) {
              val[`${Object.entries(item)[0][0]}`] = {
                ...Object.values(val)[0],
                ...item[`${Object.entries(item)[0][0]}`]}
            } else {
              const arr = []
                acc.map(val => arr.push(`${Object.entries(val)[0][0]}`))
                if(!arr.includes(`${Object.entries(item)[0][0]}`)) {
                  acc.push(item)
                }
              }
          })
        } else {
          acc.push(item)
        }
        return acc
      },[])
      return newArray
    }
  }
});
</script>

<style lang="scss" scoped>
  .container {
    padding: 0, 10%;
  }
</style>
