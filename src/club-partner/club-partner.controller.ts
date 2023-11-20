import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ClubPartnerService } from './club-partner.service';
import { PartnerDto } from '../partner/partner.dto';
import { plainToInstance } from 'class-transformer';
import { PartnerEntity } from '../partner/partner.entity';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubPartnerController {
  constructor(private readonly clubPartnerService: ClubPartnerService) {}

  @Post(':clubId/members/:partnerId')
  async addArtworkMuseum(@Param('clubId') clubId: string, @Param('partnerId') partnerId: string){
    console.log('aaaaaaaaaa clubId', clubId, partnerId);
    return await this.clubPartnerService.addMemberToClub(clubId, partnerId);
  }

  @Get(':clubId/members/:partnerId')
  async findMembersFromClub(@Param('clubId') clubId: string, @Param('partnerId') partnerId: string){
    return await this.clubPartnerService.findMemberFromClub(clubId, partnerId);
  }
  @Get(':clubId/members/:partnerId')
  async findMemberFromClub(@Param('clubId') clubId: string, @Param('partnerId') partnerId: string){
    return await this.clubPartnerService.findMemberFromClub(clubId, partnerId);
  }
  @Put(':clubId/members/')
  async updateMembersFromClub(@Param('clubId') clubId: string, @Body() partnerDto: PartnerDto[]){
    const partners = plainToInstance(PartnerEntity, partnerDto);
    return await this.clubPartnerService.updateMembersFromClub(clubId, partners);
  }

  @Delete(':clubId/members/:partnerId')
  @HttpCode(204)
  async deleteArtworkMuseum(@Param('clubId') clubId: string, @Param('partnerId') partnerId: string){
    return await this.clubPartnerService.deleteMemberFromClub(clubId, partnerId);
  }
}
