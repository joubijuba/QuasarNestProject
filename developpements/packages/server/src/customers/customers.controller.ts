import { LoggerService } from '@formation/servers-lib/dist/services';
import { AbstractController } from '@formation/servers-lib/dist/utils';
import {
  CustomerSearchResultDto,
  IPaginatedListDto,
  ISearchDto,
  SearchCustomerDto,
  WorkDone,
} from '@formation/shared-lib';
import { Controller, Get, Query, Post, Body, Delete, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController extends AbstractController {
  constructor(
    private readonly logger: LoggerService,
    private readonly customersService: CustomersService,
  ) {
    super();
    this.logger.info('CustomersController created');
  }

  @Get('/clientsList')
  async getClientsList(
    @Query() searchCriterias: SearchCustomerDto,
  ): Promise<WorkDone<CustomerSearchResultDto[]>> {
    return this.customersService.getClientsList(searchCriterias);
  }

  @Post('/clientsList')
  async addClient(
    @Body() addForm: CustomerSearchResultDto,
  ): Promise<WorkDone<boolean>> {
    return this.customersService.addClient(addForm);
  }

  @Delete('/clientsList')
  async deleteClient(
    @Query() chronoClient : string
  ): Promise<WorkDone<boolean>> {
    return this.customersService.deleteClient(chronoClient)
  }

  @Put("/clientsList")
  async editClient(
    @Body() editForm : Omit<SearchCustomerDto, 'codeFichierPartenaire'>
  ): Promise<WorkDone<CustomerSearchResultDto>> {
    return this.customersService.editClient(editForm)
  }
}