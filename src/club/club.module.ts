import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity';

@Module({
  providers: [ClubService],
  imports: [TypeOrmModule.forFeature([ClubEntity])],
  controllers: [ClubController]
})
export class ClubModule {}
