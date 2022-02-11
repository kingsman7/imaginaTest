<template>
  <div>
    <q-card class="my-card">
      <q-card-section @click="open">
        <div class="text-subtitle2">{{ getLabelqName(qname) }}</div>
      </q-card-section>
    </q-card>
    <div v-if="!!edit">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import nameMixins from "src/mixins/getLabelName"

export default defineComponent({
  props: {
    qname: {},
  },
  mixins: [ nameMixins ],
  name: "appCard",
  data () {
    return {
      edit: false,
    }
  },
  methods: {
    open(){
      this.edit = !this.edit;
    },
  }
})
</script>
