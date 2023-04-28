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
      <template v-slot:body="props" >
        <q-tr :props="props" >
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
            {{formatDate(props.row.dateDerniereCommande, 'DD/MM/YYYY')}}
          </q-td>
          <q-td key="ville" :props="props">
            <q-form @submit.prevent="deleteHandler(props.row.chronoClient)">
              <q-btn type="submit" icon="delete" />
            </q-form>
          </q-td>
          <q-td key="ville" :props="props">
            <q-form @submit.prevent="editOpener(props.row.chronoClient)">
              <q-btn type="submit" icon="edit" />
            </q-form>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <AddClientComponent />
    <ClientEditComponent
      @onFormSubmit="onFormSubmit"
      @onPoppingUpToFalse="updatePoppingUp"
      :chronoClient="chronoClient"
      :poppingUp="poppingUp"
    />
  </div>
</template>

<script lang="ts" src="./ClientsListComponent.ts"></script>
<style lang="scss" src="./ClientsListComponent.scss"></style>
