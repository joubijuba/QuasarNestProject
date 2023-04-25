import {
  CustomerSearchResultDto,
  mandatoryValidator,
  textValidatorToFixed2,
  textValidatorToFixed3,
} from '@formation/shared-lib';
import { date } from 'quasar';
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { customersApiService, refsApiService } from '../../boot/api';
import formatDate = date.formatDate;

export default defineComponent({
  name: 'AddClientComponent',
  methods: {
    async addHandler() {
      console.log(this.addForm)
      const wd = await customersApiService.addClient(this.addForm);
      if (!wd.isOk) {
        alert("something went wrong")
        return;
      }
      alert('you successfully added a new client');
    },
    toggle() {
      this.toggled = !this.toggled;
      this.icon = this.icon === 'add' ? 'directions' : 'add';
    },
  },
  setup() {
    const allFichierPartenaires = ref<any[]>([]);
    const formOptions = ref<any[]>([]);
    const formChanged = ref(false);

    /// ::: FOR BUTTON TOGGLING ::: ///
    const toggled = ref(false);
    const icon = ref('add');
    /// ::: ::: ///

    onBeforeMount(async () => {
      const wd = await refsApiService.getAllFichierPartenaires();
      if (wd.isOk && !!wd.data) {
        allFichierPartenaires.value = wd.data;
      } else {
        return;
      }
    });

    /// Initial form of the form in order to reset it properly
    const initialForm = {
      codeFichierPartenaire: '',
      chronoClient: '',
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      dateDerniereCommande: undefined,
      actif: null
    };

    const addForm = ref<CustomerSearchResultDto>(initialForm);

    /// Needed in order to check if the form is ok for submission
    // or not. We will also add a condition for submission, we will need
    // the "codeFichierPartenaire" to exist
    function isFormChanged() {
      const form = addForm.value;
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
      Object.assign(addForm.value, initialForm);
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
      addForm,
      allFichierPartenaires,
      mandatoryValidator,
      filterFichPart,
      textValidatorToFixed3,
      textValidatorToFixed2,
      isFormChanged,
      resetForm,
      formOptions,
      formChanged,
      toggled,
      icon,
    };
  },
});
