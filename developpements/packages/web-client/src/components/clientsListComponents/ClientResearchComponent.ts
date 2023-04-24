import {
  CodeLabelResultDto,
  CustomerSearchResultDto,
  SearchCustomerDto,
  mandatoryValidator,
  textValidatorToFixed2,
  textValidatorToFixed3,
} from '@formation/shared-lib';
import { date } from 'quasar';
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { customersApiService, refsApiService } from '../../boot/api';
import formatDate = date.formatDate;

export default defineComponent({
  name: 'ClientResearchComponent',
  setup() {
    const allFichierPartenaires = ref<string[]>([]);
    const formChanged = ref(false)

    onBeforeMount(async () => {
      const wd = await refsApiService.getAllFichierPartenaires();
      if (wd.isOk && !!wd.data) {
        allFichierPartenaires.value = wd.data.map((item) => item.label);
      } else {
        return;
      }
    });

    /// Initial form of the form in order to reset it properly
    const initialForm  = {
      codeFichierPartenaire: '',
      chronoClient: '',
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      dateDerniereCommandeFrom: undefined,
      dateDerniereCommandeTo: undefined,
    }

    const researchForm = ref<SearchCustomerDto>({
      codeFichierPartenaire: '',
      chronoClient: '',
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      dateDerniereCommandeFrom: undefined,
      dateDerniereCommandeTo: undefined,
    });

    /// Needed in order to check if the form is ok for submission
    // or not
    function isFormChanged() {
      const form = researchForm.value;
      /// Need to use the charabia below to loop over an object
      let k: keyof typeof form
      for (k in form) {
        if (form[k]) {
          formChanged.value = true
          return 
        }
      }
      formChanged.value = false
    }

    const resetForm = () => {
      Object.assign(researchForm.value, initialForm)
      isFormChanged()
    }

    function filterFichPart(val: string, update: any) {
      if (val === '') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        update(() => {
          allFichierPartenaires.value = allFichierPartenaires.value;
        });
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      update(() => {
        const needle = val.toLowerCase();
        allFichierPartenaires.value = allFichierPartenaires.value.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1,
        );
      });
    }

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
      allFichierPartenaires,
      mandatoryValidator,
      filterFichPart,
      textValidatorToFixed3,
      textValidatorToFixed2,
      isFormChanged,
      resetForm,
      formChanged
    };
  },
});
