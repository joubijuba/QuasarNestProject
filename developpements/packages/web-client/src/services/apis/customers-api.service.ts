import {
  CustomerSearchResultDto,
  IPaginatedListDto,
  ISearchDto,
  SearchCustomerByChronoClientDto,
  SearchCustomerDto,
  WorkDone,
} from '@formation/shared-lib';
import { AxiosInstance } from 'axios';
import { AbstractApiService } from './abstract-api.service';

export class CustomersApiService extends AbstractApiService {
  constructor(axiosInstance: AxiosInstance, serviceApiBaseUrl: string) {
    super(axiosInstance, serviceApiBaseUrl);
  }

  // Get an customer by "cdFichPart" en "nmChroClie"
  public async getCustomerById(
    searchParams: SearchCustomerByChronoClientDto,
  ): Promise<WorkDone<CustomerSearchResultDto>> {
    return this.doGet('/search/one', searchParams);
  }

  // Get "cdFichPart"'s customers list according to search criterias
  public async getCustomerListByCriterias(
    searchCriterias?: ISearchDto<SearchCustomerDto>,
  ): Promise<WorkDone<IPaginatedListDto<CustomerSearchResultDto>>> {
    return this.doGet('/search/multi-criterias', searchCriterias);
  }

  public async getClientsList(
    searchCriterias: SearchCustomerDto,
  ): Promise<WorkDone<CustomerSearchResultDto[]>> {
    return this.doGet('/clientsList', searchCriterias);
  }

  public async addClient(
    addForm: CustomerSearchResultDto,
  ): Promise<WorkDone<boolean>> {
    return this.doPost('/clientsList', addForm);
  }

  public async deleteClient(chronoClient: string): Promise<WorkDone<boolean>> {
    return this.doDelete('/clientsList', chronoClient);
  }

  public async editClient(
    editForm: Omit<SearchCustomerDto, 'codeFichierPartenaire'>,
  ): Promise<WorkDone<CustomerSearchResultDto>> {
    return this.doPut('/clientsList', editForm);
  }
}
