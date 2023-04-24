<template>
    <q-page class="items-center justify-evenly">
      <ClientsListComponent/>
    </q-page>
  </template>
  
  <script lang="ts">
  
  import ClientsListComponent from '../components/clientsListComponents/ClientsListComponent.vue';
  import { defineComponent} from 'vue';
  
  export default defineComponent({
    name: 'ClientsListPage',
    components : { ClientsListComponent }
  });
  </script>