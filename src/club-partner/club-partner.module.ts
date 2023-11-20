import { Module } from '@nestjs/common';
import { ClubPartnerService } from './club-partner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { PartnerEntity } from '../partner/partner.entity';
import { ClubPartnerController } from './club-partner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, PartnerEntity])],
  providers: [ClubPartnerService],
  controllers: [ClubPartnerController]
})
export class ClubPartnerModule {}
