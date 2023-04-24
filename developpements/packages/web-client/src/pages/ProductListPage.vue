<template>
  <q-page class="items-center justify-evenly">
    <ProductListComponent/>
  </q-page>
</template>

<script lang="ts">

import ProductListComponent from '../components/productListComponents/ProductListComponent.vue';
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'ProductListPage',
  components : { ProductListComponent }
});
</script>