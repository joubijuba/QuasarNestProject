<template>
  <div class="q-px-sm q-px-md-md">
    <q-table
      :columns="columns"
      :grid="$q.screen.lt.md"
      :rows="product"
      binary-state-sort
      row-key="code"
      style="width: 100%"
      title="Product interface"
    >
      <template v-slot:body="props">
        <q-td key="code" :props="props">
          {{ props.row.code }}
        </q-td>
        <q-td key="oldLibelle" :props="props">
          {{ props.row.oldLibelle }}
        </q-td>
        <q-td key="commentaire" :props="props">
          {{ props.row.commentaire }}
        </q-td>
        <q-td key="newLibelle" :props="props">
          <q-form @submit.prevent="changeHandler(props.row)" class="">
            <div>
              <div>
                <q-input v-model="newLibelle" label="new libelle" />
              </div>
              <div class="row justify-end">
                <q-btn type="submit" label="submit" />
              </div>
            </div>
          </q-form>
        </q-td>
        <q-td key="delete" :props="props">
          <q-form @submit.prevent="deleteHandler(props.row)">
            <q-btn type="submit" label="delete" icon="delete" />
          </q-form>
        </q-td>
      </template>
    </q-table>
    <q-btn color="blue" icon="directions" @click="goBack"> Return </q-btn>
  </div>
</template>

<script lang="ts">
import { ProductDto, SearchProductDto } from 'app/../libs/shared-lib/dist';
import { defineComponent, onBeforeMount, PropType, ref } from 'vue';
import { refsApiService } from '../../../src/boot/api';

export default defineComponent({
  name: 'ProductDetailComponent',
  data() {
    return {
      newLibelle: '',
      product: [
        {
          /// Need all those keys to display proper column names
          code: this.$route.params.code,
          oldLibelle: this.$route.params.libelle,
          commentaire: 'this product is amazing',
          newLibelle: this.newLibelle,
          delete: false,
        },
      ],
    };
  },
  methods: {
    async changeHandler(row: any) {
      const popup: any = confirm(
        'you are about to change this article label, please click on confirm before continuing',
      );
      if (!popup){
        return ;
      }
      const product = {
        code: this.product[0].code as string,
        libelle: this.product[0].oldLibelle as string,
      };
      const request = await refsApiService.updateProduct(product, {
        newLibelle: this.newLibelle,
      });
      if (request && !request.isOk) {
        alert('unable to change the the label name');
        return;
      }
      alert('you successfully changed the label name');
      this.product[0].oldLibelle = this.newLibelle;
    },
    async deleteHandler(row: any) {
      const popup: any = confirm(
        'you are about to delete this article, please click on confirm before continuing',
      );
      if (!popup){
        return ;
      }
      const product = {
        code: this.product[0].code as string,
        libelle: this.product[0].oldLibelle as string,
      };
      const request = await refsApiService.deleteProduct(product);
      if (request && !request.isOk) {
        alert('unable to delete this product');
        return;
      }
      alert('product deleted');
      this.product.pop();
    },
    async goBack() {
      await this.$router.push({
        path: '../productList',
      });
    },
  },
  setup() {
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
        name: 'old libelle',
        required: true,
        label: 'old libellé',
        align: 'left',
        field: (row: any): any => row.newLibelle,
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
      /// Looks like we don't need to add other columns
      // as it's dealt inside the template tag
    ];
  },
});
</script>
