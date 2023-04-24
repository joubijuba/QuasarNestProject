import {
  CodeLabelResultDto,
  IPaginatedListDto,
  ISearchDto,
  ProductDto,
  SearchProductDto,
  WorkDone,
} from '@formation/shared-lib';
import { AxiosInstance } from 'axios';
import { AbstractApiService } from './abstract-api.service';

export class RefsApiService extends AbstractApiService {
  constructor(axiosInstance: AxiosInstance, serviceApiBaseUrl: string) {
    super(axiosInstance, serviceApiBaseUrl);
  }

  // Get "cdFichPart"'s customers list according to search criterias
  public async getAllFichierPartenaires(): Promise<
    WorkDone<CodeLabelResultDto[]>
  > {
    return this.doGet<CodeLabelResultDto[]>('/fichparts');
  }

  public async getProductListByCriterias(
    searchCriterias?: ISearchDto<SearchProductDto>,
  ): Promise<WorkDone<IPaginatedListDto<ProductDto>>> {
    return this.doGet('/products', searchCriterias);
  }

  public async getProductList(
    filters: SearchProductDto,
  ): Promise<WorkDone<ProductDto[]>> {
    return this.doGet('/productList', filters);
  }

  public async updateProduct(
    product: Omit<ProductDto, 'commentaire'>,
    newLibelle: any,
  ): Promise<WorkDone<boolean>> {
    //const {code, oldLibelle} = product
    const { code, libelle } = product;
    return this.doPut(
      `/productDetail/code=${code}&libelle=${libelle}`,
      newLibelle,
    );
  }

  public async deleteProduct(
    product: Omit<ProductDto, 'commentaire'>,
  ): Promise<WorkDone<boolean>> {
    const { code, libelle } = product;
    return this.doDelete(`/productDetail/code=${code}&libelle=${libelle}`);
  }

  public async addProduct(product: ProductDto): Promise<WorkDone<boolean>> {
    return this.doPost('/productList', product);
  }
}
