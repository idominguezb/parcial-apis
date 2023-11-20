import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from "../shared/errors/business-errors";
import { ClubEntity } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>
  ){}

  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find();
  }

  async findOne(id: string): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return club;
  }

  async create(club: ClubEntity): Promise<ClubEntity> {
    this.validateDescription(club.description);

    return await this.clubRepository.save(club);
  }

  async update(id: string, club: ClubEntity): Promise<ClubEntity> {
    const persistedClub: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });

    if (!persistedClub) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    this.validateDescription(club.description);

    return await this.clubRepository.save({
      ...persistedClub,
      ...club,
    });
  }

  async delete(id: string) {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }

    await this.clubRepository.remove(club);
  }

  private validateDescription(description: string): void {
    if (description && description.length > 100) {
      throw new BusinessLogicException(
        "The club's description exceeds the maximum length of 100 characters",
        BusinessError.BAD_REQUEST,
      );
    }
  }
}

