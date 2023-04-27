<template>
  <template>
    <q-dialog v-model="poppingUp" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit client</div>
        </q-card-section>

        <q-form @submit.prevent="formSubmission">
          <q-card-section class="q-pt-none">
            <q-input
              v-model="editForm.nom"
              :rules="[textValidatorToFixed3]"
              stack-label
              label="Nom"
              dense
              autofocus
            ></q-input>
            <q-input
              v-model="editForm.prenom"
              :rules="[textValidatorToFixed3]"
              stack-label
              label="Prénom"
              dense
              autofocus
            ></q-input>
            <q-input
              v-model="editForm.codePostal"
              :rules="[textValidatorToFixed3]"
              stack-label
              label="Code postal"
              dense
              autofocus
            ></q-input>
            <q-input
              v-model="editForm.ville"
              :rules="[textValidatorToFixed3]"
              stack-label
              label="Ville"
              dense
              autofocus
            ></q-input>
            <q-input
              v-model="editForm.actif"
              :rules="[textValidatorToFixed3]"
              stack-label
              label="Actif"
              dense
              autofocus
            ></q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Cancel"
              @click="setPoppingUpToFalse"
            ></q-btn>
            <q-btn flat type="submit" label="Edit"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </template>
</template>
<script lang="ts" src="./ClientEditComponent.ts"></script>
