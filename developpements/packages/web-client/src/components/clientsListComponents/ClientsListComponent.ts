import ClientResearchComponent from './ClientResearchComponent.vue';
import { customersApiService } from '../../boot/api';
import AddClientComponent from './AddClientComponent.vue';
import { defineComponent, ref } from 'vue';
import {
  CustomerSearchResultDto,
  SearchCustomerDto,
  textValidatorToFixed3,
} from '@formation/shared-lib';
import { date } from 'quasar';
import formatDate = date.formatDate;

export default defineComponent({
  name: 'ClientsListComponent',
  components: { ClientResearchComponent, AddClientComponent },
  methods: {
    updateList(clientsList: CustomerSearchResultDto[]) {
      this.clientsList = clientsList;
    },
    async deleteHandler(chronoClient: string) {
      const wd = await customersApiService.deleteClient(chronoClient);
      if (!wd.isOk) {
        alert('Something went wrong');
      }
      alert('client successfully deleted');
      /// Update the list when the client is deleted from the list
      // without a web socket. Need to look for w-s implementation
      const updatedList = this.clientsList.filter((client) => {
        return client.chronoClient !== chronoClient;
      });
      this.updateList(updatedList);
    },
    editHandler(chronoClient: string) {
      this.poppingUp = true;
      this.editForm.chronoClient = chronoClient;
    },
    async editSubmitter() {
      const editForm = this.editForm;
      const clientsList = this.clientsList;
      const wd = await customersApiService.editClient(this.editForm);
      if (!wd.isOk) {
        alert('Something went wrong');
      }
      alert('Client edited with success');
      /// The part below is just used to update on the front-end
      // the line of the table we just changed.
      // Better to use a w:s.
      for (const client of clientsList) {
        if (client.chronoClient === editForm.chronoClient) {
          let key: keyof typeof editForm ;
          for (key in editForm) {
            if (editForm[key]) {
              let keyBis: keyof typeof client
              for (keyBis in client) {
                if (keyBis === key){
                  /// Need the "!" to avoid type issues
                  client[keyBis] = editForm[key]!
                }
              }
            }
          }
        }
      }
      this.editForm = this.initialEditForm ;
    },
  },
  setup() {
    const clientsList = ref<CustomerSearchResultDto[]>([]);
    const poppingUp = ref(false);
    const initialEditForm = {
      /// This one won't be edited but we need it for the request
      chronoClient: '',
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      actif: '',
    };
    /// Need to omit "codeFichierPartenaire"
    const editForm =
      ref<Omit<SearchCustomerDto, 'codeFichierPartenaire'>>(initialEditForm);

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
        align: 'left',
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
        align: 'left',
        field: (row: CustomerSearchResultDto) => row.dateDerniereCommande,
        format: (val: string) =>
          `${!!val ? formatDate(val, 'DD/MM/YYYY') : '---'}`,
        sortable: true,
      },
    ];
    return {
      clientsList,
      poppingUp,
      columns,
      initialEditForm,
      editForm,
      textValidatorToFixed3,
    };
  },
});
