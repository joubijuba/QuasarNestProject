import ClientResearchComponent from './ClientResearchComponent.vue';
import { customersApiService } from '../../boot/api';
import AddClientComponent from './AddClientComponent.vue';
import ClientEditComponent from './ClientEditComponent.vue';
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
  components: {
    ClientResearchComponent,
    AddClientComponent,
    ClientEditComponent,
  },
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
      const updatedList = this.clientsList.filter((client) => {
        return client.chronoClient !== chronoClient;
      });
      this.updateList(updatedList);
    },
    editOpener(chronoClient: string) {
      this.poppingUp = true;
      this.chronoClient = chronoClient;
    },
    async editSubmitter(
      form: Omit<SearchCustomerDto, 'codeFichierPartenaire'>,
    ): Promise<boolean> {
      const clientsList = this.clientsList;
      const wd = await customersApiService.editClient(form);
      if (!wd.isOk) {
        alert('Something went wrong');
        return false;
      }
      /// The part below is just used to update on the front-end
      // the line of the table we just changed.
      // Better to use a w:s.
      for (const client of clientsList) {
        if (client.chronoClient === form.chronoClient) {
          let key: keyof typeof form;
          for (key in form) {
            if (form[key]) {
              let keyBis: keyof typeof client;
              for (keyBis in client) {
                if (keyBis === key) {
                  /// Need the "!" to avoid type issues
                  client[keyBis] = form[key]!;
                }
              }
            }
          }
        }
      }
      alert('Client edited with success');
      return true;
    },
    async onFormSubmit(editForm: Omit<SearchCustomerDto, 'codeFichierPartenaire'>) {
      await this.editSubmitter(editForm)
    },
    updatePoppingUp() {
      this.poppingUp = false;
    },
  },
  setup() {
    const clientsList = ref<CustomerSearchResultDto[]>([]);
    const chronoClient = ref('');
    const poppingUp = ref(false);

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
      chronoClient,
      textValidatorToFixed3,
      formatDate
    };
  },
});
