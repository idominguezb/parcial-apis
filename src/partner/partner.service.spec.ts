import { Test, TestingModule } from "@nestjs/testing";
import { PartnerService } from "./partner.service";

import { faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { PartnerEntity } from "./partner.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";

describe("PartnerService", () => {
  let service: PartnerService;
  let repository: Repository<PartnerEntity>;
  let partnersList: PartnerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PartnerService]
    }).compile();

    service = module.get<PartnerService>(PartnerService);
    repository = module.get<Repository<PartnerEntity>>(
      getRepositoryToken(PartnerEntity)
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    partnersList = [];
    for (let i = 0; i < 5; i++) {
      const partner: PartnerEntity = await repository.save({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        birthdate: faker.date.past()
      });
      partnersList.push(partner);
    }
  };

  it("should be defined", () => {
    expect(service).toBeDefined();
  });


  it("findAll should return all members", async () => {
    const members: PartnerEntity[] = await service.findAll();
    expect(members).not.toBeNull();
    expect(members).toHaveLength(partnersList.length);
  });

  it("findOne should return a member by id", async () => {
    const storedAirport: PartnerEntity = partnersList[0];
    const member: PartnerEntity = await service.findOne(storedAirport.id);

    expect(member).not.toBeNull();
    expect(member.username).toEqual(storedAirport.username);
    expect(member.email).toEqual(storedAirport.email);
  });

  it("findOne should throw an exception for an invalid member", async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The member with the given id was not found");
  });
});
