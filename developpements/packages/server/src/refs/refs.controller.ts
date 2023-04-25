import { LoggerService } from '@formation/servers-lib/dist/services';
import { AbstractController } from '@formation/servers-lib/dist/utils';
import {
  CodeLabelResultDto,
  OffreReferenceResultDto,
  WorkDone,
  SearchProductDto,
  ProductDto,
  UpdateProductDto,
} from '@formation/shared-lib';
import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Body,
  Delete,
  Post
} from '@nestjs/common';
import { RefsService } from './refs.service';

@Controller('refs')
export class RefsController extends AbstractController {
  constructor(
    private readonly logger: LoggerService,
    private readonly refsService: RefsService,
  ) {
    super();
    this.logger.info('RefsController created');
  }

  @Get('/campagne/:codeCampagne/offres-ref/:codeOffre')
  async findOffreReference(
    @Param('codeCampagne') codeCampagne: string,
    @Param('codeOffre') codeOffre: string,
  ): Promise<WorkDone<OffreReferenceResultDto>> {
    const wd = await this.refsService.searchOffreReference(
      parseInt(codeCampagne, 10),
      codeOffre,
    );
    if (wd.isOk && !!wd.data) {
      // Mise à jour de la date de dernière modification
      return this.refsService.updateOffreReferenceDateDerniereModification(
        wd.data[0],
      );
    }
    return WorkDone.toError(wd);
  }

  @Get('/fichparts')
  async getAllFichParts(): Promise<WorkDone<CodeLabelResultDto[]>> {
    return this.refsService.getAllFichParts();
  }

  @Get('/campagne/:codeCampagne/offres-ref')
  async searchOffresReferences(
    @Param('codeCampagne') codeCampagne: string,
    @Query('codeProduit') codeProduit?: string,
  ): Promise<WorkDone<OffreReferenceResultDto[]>> {
    return this.refsService.searchOffreReference(
      parseInt(codeCampagne, 10),
      null,
      codeProduit,
    );
  }

  @Get('/productList')
  async getProduits(
    @Query() filters: SearchProductDto,
  ): Promise<WorkDone<ProductDto[]>> {
    return this.refsService.getProduits(filters);
  }

  //@Get("/*/:code")
  /// @Param decorator is used to retrieve :codeProduit, it's any string
  // that is inserted after "/""
  /*
  async getOneProductByCode (@Param("code") code : string) :
    Promise<WorkDone<ProductDto>> {
      return this.refsService.getOneProduct(code)
  }
  */

  @Put('/productDetail/code=:code&libelle=:libelle')
  async updateProduct(
    @Param('code') code: string,
    @Body('newLibelle') newLibelle: any,
  ): Promise<WorkDone<Boolean>> {
    return this.refsService.updateProduct(code, newLibelle);
  }

  @Delete('/productDetail/code=:code&libelle=:libelle')
  async deleteProduct(@Param('code') code: string): Promise<WorkDone<Boolean>> {
    return this.refsService.deleteProduct(code);
  }

  @Post('/productList')
  async addProduct(
    @Body() product : ProductDto
  ): Promise<WorkDone<Boolean>> {
    return this.refsService.addProduct(product)
  }
}
