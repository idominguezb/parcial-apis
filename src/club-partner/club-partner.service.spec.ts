import { Test, TestingModule } from '@nestjs/testing';
import { ClubPartnerService } from './club-partner.service';

import { faker } from '@faker-js/faker';
import { Repository } from "typeorm";
import { ClubEntity } from "../club/club.entity";
import { PartnerEntity } from "../partner/partner.entity";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { getRepositoryToken } from "@nestjs/typeorm";
describe('ClubPartnerService', () => {
  let service: ClubPartnerService;
  let clubRepository: Repository<ClubEntity>;
  let partnerRepository: Repository<PartnerEntity>;
  let club: ClubEntity;
  let partnerList: PartnerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubPartnerService],
    }).compile();

    service = module.get<ClubPartnerService>(ClubPartnerService);
    clubRepository = module.get<Repository<ClubEntity>>(getRepositoryToken(ClubEntity));
    partnerRepository = module.get<Repository<PartnerEntity>>(getRepositoryToken(PartnerEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    partnerRepository.clear();
    clubRepository.clear();

    partnerList = [];
    for (let i = 0; i < 5; i++) {
      const airport: PartnerEntity = await partnerRepository.save({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        birthdate: faker.date.past(),
      })
      partnerList.push(airport);
    }

    club = await clubRepository.save({
      name: faker.lorem.word(),
      foundationDate: faker.date.past(),
      image: faker.image.url(),
      description: faker.lorem.sentence(),
      partners: partnerList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
