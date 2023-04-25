
import ClientResearchComponent from './ClientResearchComponent.vue';
import { customersApiService } from '../../boot/api';
import AddClientComponent from './AddClientComponent.vue';
import { defineComponent, ref } from 'vue';
import { CustomerSearchResultDto } from '@formation/shared-lib';
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
      if (!wd.isOk){
        alert("Something went wrong")
      }
      alert ("client successfully deleted")
      /// Update the list when the client is deleted from the list
      // without a web socket. Need to look for w-s implementation
      const updatedList = this.clientsList.filter((client) => {
        return client.chronoClient !== chronoClient
      })
      this.updateList(updatedList)
    },
    editHandler(chronoClient : string){
      console.log(`editing ${chronoClient} client`)
    }
  },
  setup() {
    const clientsList = ref<CustomerSearchResultDto[]>([]);

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
      columns,
    };
  },
});