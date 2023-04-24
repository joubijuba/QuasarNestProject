<template>
  <ClientResearchComponent />
</template>

<script lang="ts">
import ClientResearchComponent from './ClientResearchComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClientsListComponent',
  components: { ClientResearchComponent }
});
</script>
