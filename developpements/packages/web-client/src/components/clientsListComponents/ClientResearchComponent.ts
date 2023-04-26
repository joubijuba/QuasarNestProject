import {
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
  methods: {
    async researchHandler() {
      const filters = this.researchForm;
      const wd = await customersApiService.getClientsList(filters);
      if (!wd.isOk) {
        alert('something went wrong');
      }
      this.clientsList = wd.data!;
      this.$emit('onTransferList', this.clientsList);
     console.log(filters)
    },
  },
  setup() {
    const allFichierPartenaires = ref<any[]>([]);
    const formOptions = ref<any[]>([]);
    const formChanged = ref(false);
    const clientsList = ref<CustomerSearchResultDto[]>([]);

    /// Initial form of the form in order to reset it properly
    const initialForm = {
      codeFichierPartenaire: '',
      chronoClient: '',
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      dateDerniereCommandeFrom: undefined,
      dateDerniereCommandeTo: undefined,
      actif: '',
    };

    const researchForm = ref<SearchCustomerDto>(initialForm);

    onBeforeMount(async () => {
      const wd = await refsApiService.getAllFichierPartenaires();
      if (wd.isOk && !!wd.data) {
        allFichierPartenaires.value = wd.data;
      } else {
        return;
      }
    });

    /// Needed in order to check if the form is ok for submission
    // or not. We will also add a condition for submission, we will need
    // the "codeFichierPartenaire" to exist
    function isFormChanged() {
      const form = researchForm.value;
      /// Need to use the charabia below to loop over an object
      let k: keyof typeof form;
      for (k in form) {
        if (form[k]) {
          formChanged.value = true;
          return;
        }
      }
      formChanged.value = false;
    }

    const resetForm = () => {
      Object.assign(researchForm.value, initialForm);
      isFormChanged();
    };

    /// This function is needed in order to filter the select field
    // when being filled by the user, to propose adequate options
    function filterFichPart(val: string, update: any) {
      if (val === '') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        update(() => {
          /// Because if we do allFichierPartenaires.value = allFichiersPartenaires.value,
          // it will empy up the allFichierPartenaires object and then we will
          // have nothing left inside. That's why we need the formOptions object
          // in order to have select options that we can alter
          // for filtering purposes when user is typing inside this field
          formOptions.value = allFichierPartenaires.value;
        });
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      update(() => {
        const needle = val.toLowerCase();
        formOptions.value = allFichierPartenaires.value.filter(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          (v) => v.libelle.toLowerCase().indexOf(needle) > -1,
        );
      });
    }

    return {
      researchForm,
      allFichierPartenaires,
      mandatoryValidator,
      filterFichPart,
      textValidatorToFixed3,
      textValidatorToFixed2,
      isFormChanged,
      resetForm,
      formOptions,
      formChanged,
      clientsList
    };
  },
});
