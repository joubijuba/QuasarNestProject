<template>
  <div class="q-pa-sm q-pa-md-md">
    <h4>Reaseach some products</h4>
    <q-form @submit.prevent="researchHandler" @reset="resetForm">
      <div class="q-pa-md">
        <div class="row q-col-gutter-xs q-col-gutter-md-md">
          <q-input
            v-model="labelLike"
            :lazy-rules="true"
            class="col-12 col-md-4"
            hint="(min: 3 char)"
            label="Libellé"
            stack-label
          />
					<q-input
            v-model="codeStartsWith"
            :lazy-rules="true"
            class="col-12 col-md-4"
            hint="(min: 0 char)"
            label="code starts with"
            stack-label
          />
        </div>

        <div class="row justify-end">
          <q-btn
						:disable = "labelLike.trim().length < 3"
            color="primary"
            icon="fa fa-search"
            label="Rechercher"
            type="submit"
          />
          <q-btn
            class="q-ml-sm"
            color="primary"
            flat
            label="R.A.Z."
            type="reset"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { ProductDto } from 'app/../libs/shared-lib/dist';
import { refsApiService } from '../../../src/boot/api';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProductSearchComponent',
  methods: {
    async researchHandler() {
			const wd = await refsApiService.getProductList({
				labelLike : this.labelLike.trim(),
				codeStartsWith : this.codeStartsWith
			})
			if (!wd.isOk){
				alert ("something went wrong")
			}
			this.productsList = wd.data!
			this.$emit("onTransferList", this.productsList)
    },
    resetForm(){
      this.labelLike = ''
      this.productsList = []
      this.codeStartsWith = ''
    }
  },
  setup() {
    let labelLike = ref('');
    let productsList = ref<ProductDto[]>([]);
		let codeStartsWith = ref('')

    return {
			labelLike,
			codeStartsWith,
			productsList,
		};
  },
});
</script>
