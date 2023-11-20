import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerEntity } from './partner.entity';
import { PartnerController } from './partner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  providers: [PartnerService],
  controllers: [PartnerController]
})
export class PartnerModule {}
