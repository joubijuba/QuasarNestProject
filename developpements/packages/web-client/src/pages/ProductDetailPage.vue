<template>
  <q-page class="items-center justify-evenly">
    <ProductDetailComponent/>
  </q-page>
</template>

<script lang="ts">
import ProductDetailComponent from '../components/productDetailComponents/ProductDetailComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductDetailPage',
  components: { ProductDetailComponent },
});
</script>
