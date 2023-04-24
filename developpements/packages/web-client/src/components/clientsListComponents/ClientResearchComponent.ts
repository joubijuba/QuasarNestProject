import {
  CodeLabelResultDto,
  CustomerSearchResultDto,
  SearchCustomerDto,
} from '@formation/shared-lib';
import { date } from 'quasar';
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { customersApiService, refsApiService } from '../../boot/api';
import formatDate = date.formatDate;

export default defineComponent({
  name: 'ClientResearchComponent',
  setup() {
    let allFichierPartenaires: CodeLabelResultDto[] = [];

    onBeforeMount(async () => {
      const wd = await refsApiService.getAllFichierPartenaires();
      if (wd.isOk && !!wd.data) {
        allFichierPartenaires = wd.data;
      } else {
        allFichierPartenaires = [];
      }
    });

    // Define the initial state of the form
    const researchForm: SearchCustomerDto = {
      codeFichierPartenaire: '',
      chronoClient: '',
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      dateDerniereCommandeFrom: undefined,
      dateDerniereCommandeTo: undefined,
    };

    const columns = [
      {
        name: 'chronoClient',
        required: true,
        label: 'Chrono #',
        align: 'left',
        field: (row: CustomerSearchResultDto) => row.chronoClient,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'prenom',
        required: true,
        label: 'Prénom',
        align: 'left',
        field: (row: CustomerSearchResultDto) => row.prenom,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'nom',
        required: true,
        label: 'Nom',
        align: 'left',
        field: (row: CustomerSearchResultDto) => row.nom,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'codePostal',
        required: true,
        label: 'CP',
        align: 'center',
        field: (row: CustomerSearchResultDto) => row.codePostal,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'ville',
        required: true,
        label: 'Ville',
        align: 'left',
        field: (row: CustomerSearchResultDto) => row.ville,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'dateDerniereCommande',
        required: false,
        label: 'Date de dernière commande',
        align: 'center',
        field: (row: CustomerSearchResultDto) => row.dateDerniereCommande,
        format: (val: string) =>
          `${!!val ? formatDate(val, 'DD/MM/YYYY') : '---'}`,
        sortable: true,
      },
    ];

    return {
      columns,
      researchForm,
      allFichierPartenaires
    };
  },
});
