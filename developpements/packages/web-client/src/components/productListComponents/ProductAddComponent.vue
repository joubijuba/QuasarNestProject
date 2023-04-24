<template>
  <div class="q-pa-sm q-pa-md-md">
    <h4>Add a product</h4>
    <q-form @submit.prevent="addHandler">
      <div class="q-pa-md">
        <div class="row q-col-gutter-xs q-col-gutter-md-md">
          <q-input
            v-model="code"
            :lazy-rules="true"
            class="col-12 col-md-4"
            hint="(min: 3 char)"
            label="Code"
            stack-label
          />
          <q-input
            v-model="libelle"
            :lazy-rules="true"
            class="col-12 col-md-4"
            hint="(min: 1 char)"
            label="Libellé"
            stack-label
          />
          <q-input
            v-model="commentaire"
            :lazy-rules="true"
            class="col-12 col-md-4"
            hint="(min: 2 char)"
            label="Commentaire"
            stack-label
          />
        </div>

        <div class="row justify-end">
          <q-btn
            :disable="
              libelle.trim().length < 3 ||
              code.trim().length === 0 ||
              commentaire.trim().length < 2
            "
            color="primary"
            icon="fa fa-search"
            label="Add"
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
import { refsApiService } from '../../../src/boot/api';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProductAddComponent',
  methods: {
    async addHandler() {
      const produit = {
        code: this.code.trim(),
        libelle: this.libelle.trim(),
        commentaire: this.commentaire.trim(),
      };
      const wd = await refsApiService.addProduct(produit);
      console.log(wd);
      if (!wd.isOk) {
        if (wd.error && wd.error.message === 'P2002') {
          alert('this record already exists');
          return;
        }
        alert('something went wrong');
        return;
      }
      alert('product successfully added');
    },
  },
  setup() {
    let code = ref('');
    let libelle = ref('');
    let commentaire = ref('');

    return {
      code,
      libelle,
      commentaire,
    };
  },
});
</script>
