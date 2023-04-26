<template>
  <ClientResearchComponent @onTransferList="updateList" />
  <div class="q-px-sm q-px-md-md">
    <q-table
      :columns="columns"
      :grid="$q.screen.lt.md"
      :rows="clientsList"
      binary-state-sort
      row-key="chronoClient"
      style="with: 100%"
      title="Liste des clients"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="chronoClient"
            :props="props"
            :class="props.row.actif === 'Oui' ? 'actif' : 'inactif'"
          >
            {{ props.row.chronoClient }}
          </q-td>
          <q-td key="prenom" :props="props">
            {{ props.row.prenom }}
          </q-td>
          <q-td key="nom" :props="props">
            {{ props.row.nom }}
          </q-td>
          <q-td key="codePostal" :props="props">
            {{ props.row.codePostal }}
          </q-td>
          <q-td key="ville" :props="props">
            {{ props.row.ville }}
          </q-td>
          <q-td key="dateDerniereCommande" :props="props">
            {{ props.row.dateDerniereCommande }}
          </q-td>
          <q-td key="ville" :props="props">
            <q-form @submit.prevent="deleteHandler(props.row.chronoClient)">
              <q-btn type="submit" icon="delete" />
            </q-form>
          </q-td>
          <q-td key="ville" :props="props">
            <q-form @submit.prevent="editHandler(props.row.chronoClient)">
              <q-btn type="submit" icon="edit" />
            </q-form>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <AddClientComponent />
    <template>
      <q-dialog v-model="poppingUp" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Edit client</div>
          </q-card-section>

          <q-form @submit.prevent="editSubmitter">
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
              <q-btn flat label="Cancel" v-close-popup></q-btn>
              <q-btn flat type ="submit" label="Edit" v-close-popup></q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </template>
  </div>
</template>

<script lang="ts" src="./ClientsListComponent.ts"></script>
<style lang="scss" src="./ClientsListComponent.scss"></style>
