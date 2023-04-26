import {
  LoggerService,
  PrismaService,
} from '@formation/servers-lib/dist/services';
import {
  CustomerSearchResultDto,
  IPaginatedListDto,
  ISearchDto,
  SearchCustomerDto,
  WorkDone,
} from '@formation/shared-lib';
import { Injectable } from '@nestjs/common';

// function toCustomerSearchResultDtoRowMapper (row: any): CustomerSearchResultDto {
//   return {
//     codeFichierPartenaire: row.CD_FICHPART,
//     chronoClient: row.NM_CHROCLIE,
//     prenom: row.LB_PREN,
//     nom: row.LB_NOM,
//     codePostal: row.CD_POST,
//     ville: row.LB_COMM,
//     dateDerniereCommande: row.DT_COMM
//   }
// }

@Injectable()
export class CustomersService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {
    this.logger.info('CustomersService created');
  }

  /// From JS date (DD/MM/YYYY) to timpestamptz(0) format
  dateConverter(date: Date) : Date{
    const [day, month, year] = date.toString().split("/")
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`)
  }

  async getClientsList(
    searchCriterias: SearchCustomerDto,
  ): Promise<WorkDone<CustomerSearchResultDto[]>> {
    try {
      /// We need to build this 'where' object here in order to
      // filter out the empty inputs. If we don't, the request
      // will be most likely unsuccessful as it will use empty strings
      // as 'mandatory' filters (where : name : '' will give nothing)
      const where = {};
      let key: keyof typeof searchCriterias;
      for (key in searchCriterias) {
        if (searchCriterias[key]) {
          if (key === 'dateDerniereCommandeFrom') {
            where['dateDerniereCommande'] = {
              gte: this.dateConverter(searchCriterias[key]),
            };
          } else if (key === 'dateDerniereCommandeTo') {
            where['dateDerniereCommande'] = {
              ...where['dateDerniereCommande'],
              lte: this.dateConverter(searchCriterias[key]),
            };
          } else {
            where[key] = searchCriterias[key];
          }
        }
      }
      this.logger.info(where)
      const clientsList = await this.prismaService.client.findMany({
        where: where,
      });
      if (!clientsList) {
        return WorkDone.buildError('Get request failed');
      }
      return WorkDone.buildOk(clientsList);
    } catch (e) {
      return WorkDone.buildError(JSON.stringify(e));
    }
  }

  async addClient(
    addForm: CustomerSearchResultDto,
  ): Promise<WorkDone<boolean>> {
    try {
      const addRequest = await this.prismaService.client.create({
        data: addForm,
      });
      if (!addRequest) {
        return WorkDone.buildError(
          'Add request failed, probably a wrong input',
        );
      }
      return WorkDone.buildOk(true);
    } catch (e) {
      return WorkDone.buildError(JSON.stringify(e));
    }
  }

  async deleteClient(chronoClient: string): Promise<WorkDone<boolean>> {
    this.logger.info(chronoClient[0]);
    try {
      const deleteRequest = await this.prismaService.client.delete({
        where: {
          chronoClient: chronoClient[0].toString(),
        },
      });
      if (!deleteRequest) {
        return WorkDone.buildError(
          "Delete request failed, this product probably doesn't exist yet",
        );
      }
      return WorkDone.buildOk(true);
    } catch (e) {
      return WorkDone.buildError(JSON.stringify(e));
    }
  }
}
