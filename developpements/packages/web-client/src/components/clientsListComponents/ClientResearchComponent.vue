<template>
  <div>
    <div class="q-pa-sm q-pa-md-md">
      <h4>Research clients</h4>
      <q-form @submit="researchHandler" @reset="resetForm">
        <div class="q-pa-md">
          <div class="row q-col-gutter-xs q-col-gutter-md-md">
            <q-select
              v-model="researchForm.codeFichierPartenaire"
              :lazy-rules="true"
              :options="formOptions"
              :rules="[mandatoryValidator]"
              class="col-12 col-md-4"
              emit-value
              hint="Recherche possible (contient)"
              input-debounce="0"
              label="Fichier partenaire *"
              map-options
              option-value="code"
              stack-label
              use-input
              @filter="filterFichPart"
              @update:model-value="isFormChanged"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Aucun fichier partenaire trouvé
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              v-model="researchForm.chronoClient"
              class="col-12 col-md-2"
              hint="Format: 99999999"
              label="N° de client"
              mask="########"
              stack-label
              @update:model-value="isFormChanged"
            />
            <q-input
              v-model="researchForm.nom"
              :lazy-rules="true"
              :rules="[textValidatorToFixed3]"
              class="col-12 col-md-4"
              hint="(min: 3)"
              label="Nom"
              stack-label
              @update:model-value="isFormChanged"
            />
            <q-input
              v-model="researchForm.codePostal"
              :lazy-rules="true"
              :rules="[textValidatorToFixed2]"
              class="col-12 col-md-2"
              hint="(min: 2) - Format: 99999"
              label="Code postal"
              mask="#####"
              stack-label
              @update:model-value="isFormChanged"
            />
          </div>
          <q-list bordered class="q-my-md rounded-borders">
            <q-expansion-item
              caption=""
              default-close
              expand-separator
              header-class="text-primary"
              icon="filter"
              label="Critères avancés..."
            >
              <q-card>
                <q-card-section>
                  <div class="row q-col-gutter-xs q-col-gutter-md-md">
                    <q-input
                      v-model="researchForm.prenom"
                      :lazy-rules="true"
                      :rules="[textValidatorToFixed3]"
                      class="col-12 col-md-2"
                      hint="(min: 3)"
                      label="Prénom"
                      stack-label
                      @update:model-value="isFormChanged"
                    />
                    <q-input
                      v-model="researchForm.ville"
                      :lazy-rules="true"
                      :rules="[textValidatorToFixed3]"
                      class="col-12 col-md-2"
                      hint="(min: 3)"
                      label="Ville"
                      stack-label
                      @update:model-value="isFormChanged"
                    />
                    <q-select
                      v-model="researchForm.actif"
                      :lazy-rules="true"
                      :options="['Oui', 'Non']"
                      class="col-12 col-md-2"
                      emit-value
                      hint="Oui/Non"
                      input-debounce="0"
                      label="Actif"
                      stack-label
                      use-input
                      @update:model-value="isFormChanged"
                    />
                    <q-input
                      v-model="researchForm.dateDerniereCommandeFrom"
                      class="col-6 col-md-3"
                      hint="Date comprise"
                      label="Dernière commande après le"
                      stack-label
                      @update:model-value="isFormChanged"
                    >
                      <template v-slot:prepend>
                        <q-icon
                          class="cursor-pointer"
                          color="primary"
                          name="event"
                        >
                          <q-popup-proxy
                            ref="qDateProxy"
                            cover
                            transition-hide="scale"
                            transition-show="scale"
                          >
                            <q-date
                              v-model="researchForm.dateDerniereCommandeFrom"
                              mask="DD/MM/YYYY"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  color="primary"
                                  flat
                                  label="Fermer"
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      v-model="researchForm.dateDerniereCommandeTo"
                      class="col-6 col-md-3"
                      hint="Date comprise"
                      label="Dernière commande avant le"
                      stack-label
                      @update:model-value="isFormChanged"
                    >
                      <template v-slot:prepend>
                        <q-icon
                          class="cursor-pointer"
                          color="primary"
                          name="event"
                        >
                          <q-popup-proxy
                            ref="qDateProxy"
                            cover
                            transition-hide="scale"
                            transition-show="scale"
                          >
                            <q-date
                              v-model="researchForm.dateDerniereCommandeTo"
                              mask="DD/MM/YYYY"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  color="primary"
                                  flat
                                  label="Fermer"
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>

          <div class="row justify-end">
            <q-btn
              :disable="!formChanged || !researchForm.codeFichierPartenaire"
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
  </div>
</template>

<script lang="ts" src="./ClientResearchComponent.ts"></script>
