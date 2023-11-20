import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartnerEntity } from "./partner.entity";
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>
  ){}

  async findAll(): Promise<PartnerEntity[]> {
    return await this.partnerRepository.find();
  }

  async findOne(id: string): Promise<PartnerEntity> {
    const partner: PartnerEntity = await this.partnerRepository.findOne({
      where: { id },
    });
    if (!partner)
      throw new BusinessLogicException(
        'The partner with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return partner;
  }

  async create(partner: PartnerEntity): Promise<PartnerEntity> {
    const birthdate = new Date(partner.birthdate);

    if (birthdate > new Date()) {
      throw new BusinessLogicException(
        'Invalid birthdate',
        BusinessError.BAD_REQUEST,
      );
    }

    this.validateEmail(partner.email);

    return await this.partnerRepository.save(partner);
  }

  async update(id: string, partner: PartnerEntity): Promise<PartnerEntity> {
    const persistedPartner: PartnerEntity =
      await this.partnerRepository.findOne({
        where: { id },
      });

    if (!persistedPartner)
      throw new BusinessLogicException(
        'The partner with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const birthdate = new Date(persistedPartner.birthdate);

    if (birthdate > new Date()) {
      throw new BusinessLogicException(
        'Invalid birthdate',
        BusinessError.BAD_REQUEST,
      );
    }

    this.validateEmail(partner.email);

    return await this.partnerRepository.save({
      ...persistedPartner,
      ...partner,
    });
  }

  async delete(id: string) {
    const partner: PartnerEntity = await this.partnerRepository.findOne({
      where: { id },
    });
    if (!partner)
      throw new BusinessLogicException(
        'The partner with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.partnerRepository.remove(partner);
  }

  private validateEmail(email: string): void {
    if (!email || !email.includes('@')) {
      throw new BusinessLogicException(
        'Invalid email',
        BusinessError.BAD_REQUEST,
      );
    }
  }
}
