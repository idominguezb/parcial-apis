import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { PartnerService } from './partner.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { PartnerDto } from './partner.dto';
import { PartnerEntity } from './partner.entity';

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async findAll() {
    return await this.partnerService.findAll();
  }

  @Get(':partnerId')
  async findOne(@Param('partnerId') partnerId: string) {
    return await this.partnerService.findOne(partnerId);
  }

  @Post()
  async create(@Body() partnerDto: PartnerDto) {
    const partner: PartnerEntity = plainToInstance(PartnerEntity, partnerDto);
    return await this.partnerService.create(partner);
  }

  @Put(':partnerId')
  async update(@Param('partnerId') partnerId: string, @Body() partnerDto: PartnerDto) {
    const partner: PartnerEntity = plainToInstance(PartnerEntity, partnerDto);
    return await this.partnerService.update(partnerId, partner);
  }
  @Delete(':partnerId')
  @HttpCode(204)
  async delete(@Param('partnerId') partnerId: string) {
    return await this.partnerService.delete(partnerId);
  }
}
