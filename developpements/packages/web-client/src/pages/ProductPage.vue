<template>
    <q-page class=" items-center justify-evenly">
      <ProductSearchComponent
        active 
        title = "Recherche de produits"/>
    </q-page>
</template>

<script lang="ts">
import ProductSearchComponent from 'components/productSearchComponent/ProductSearchComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductPage',
  components: { ProductSearchComponent }
})
</script>