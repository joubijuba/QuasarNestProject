<template>
  <ProductAddComponent/>
  <ProductResearchComponent @onTransferList="updateList"/>
  <div class="q-px-sm q-px-md-md">
    <q-table
      v-if="!loading"
      :columns="columns"
      :grid="$q.screen.lt.md"
      :rows="productsList"
      binary-state-sort
      row-key="code"
      style="with: 100%"
      title="Products List"
      @row-click="selectHandler"
    >
    </q-table>
  </div>
</template>

<script lang="ts">
import { ProductDto } from 'app/../libs/shared-lib/dist';
import { refsApiService } from '../../../src/boot/api';
import { defineComponent, onBeforeMount, ref } from 'vue';
import ProductResearchComponent from '../productListComponents/ProductResearchComponent.vue';
import ProductAddComponent from "../productListComponents/ProductAddComponent.vue"

export default defineComponent({
  name: 'ProductListComponent',
  components: { ProductResearchComponent, ProductAddComponent },
  methods: {
    async selectHandler(e: any, row: any) {
      let { selectedProduct } = this;
      selectedProduct = {
        code: row.code,
        libelle: row.libelle,
        commentaire: row.commentaire,
      };
      let { code, libelle } = selectedProduct;
      await this.$router.push({
        path: `productDetail/code=${code}&libelle=${libelle}`,
      });
    },
    updateList(updatedProductList: ProductDto[]) {
      this.productsList = updatedProductList;
    },
    /// We will use this in order to refetch the datas automatically 
    // when : 1) a new product is added 2) to be defined
    toggleListNeedUpdate(){
      this.listNeedUpdate = !this.listNeedUpdate
    }
  },
  setup() {
    let productsList = ref<ProductDto[]>([]);
    /// No need to use 'loading' as there is a spinner automatically
    // getting in during data fetching
    let loading = ref(false);
    let selectedProduct = ref<ProductDto>({
      code: '',
      libelle: '',
      commentaire: '',
    });
    let listNeedUpdate = false

    const columns = [
      {
        name: 'code',
        required: true,
        label: 'Code',
        align: 'left',
        field: (row: any): any => row.code,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'libelle',
        required: true,
        label: 'Libellé',
        align: 'left',
        field: (row: any): any => row.libelle,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'commentaire',
        required: true,
        label: 'Commentaire',
        align: 'left',
        field: (row: any): any => row.commentaire,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'nbOffres',
        required: true,
        label: 'Nb offres',
        align: 'left',
        field: (row: any): any => row.offres.length,
        format: (val: string) => `${val}`,
        sortable: true,
      },
    ];

    /// Fetching the 10 first products at first rendering /// 
    async function fetchList () {
      loading.value = true;
      const wd = await refsApiService.getProductList({
        labelLike: '',
        numOfItems: '10',
      });
      if (!wd.isOk) {
        loading.value = false;
      }
      loading.value = false;
      productsList.value = wd.data!; /// ! tells that wd.data is not NULL
    }

    onBeforeMount(async () => {
      await fetchList()
    })

    return {
      productsList,
      loading,
      columns,
      selectedProduct,
      listNeedUpdate
    };
  },
  watch : {

  }
});
</script>
