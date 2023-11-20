import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { Repository } from "typeorm";
import { TypeOrmTestingConfig } from "../shared/testing-utils/typeorm-testing-config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { faker } from "@faker-js/faker";
import { ClubEntity } from "./club.entity";

describe('ClubService', () => {

  let service: ClubService;
  let repository: Repository<ClubEntity>;
  let clubList: ClubEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService]
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<ClubEntity>>(
      getRepositoryToken(ClubEntity)
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    clubList = [];
    for (let i = 0; i < 5; i++) {
      const club: ClubEntity = await repository.save({
        name: faker.lorem.word(),
        foundationDate: faker.date.past(),
        image: faker.image.url(),
        description: faker.lorem.sentence(),
      });
      clubList.push(club);
    }
  };

  it("should be defined", () => {
    expect(service).toBeDefined();
  });


  it("findAll should return all clubs", async () => {
    const members: ClubEntity[] = await service.findAll();
    expect(members).not.toBeNull();
    expect(members).toHaveLength(clubList.length);
  });

  it("findOne should return a club by id", async () => {
    const storedClub: ClubEntity = clubList[0];
    const club: ClubEntity = await service.findOne(storedClub.id);

    expect(club).not.toBeNull();
    expect(club.name).toEqual(storedClub.name);
    expect(club.image).toEqual(storedClub.image);
    expect(club.description).toEqual(storedClub.description);
  });

  it("findOne should throw an exception for an invalid club", async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The club with the given id was not found");
  });

  it('create should return a new club', async () => {
    const club: ClubEntity = {
      id: '1000000',
      name: faker.lorem.word(),
      foundationDate: faker.date.past(),
      image: faker.image.url(),
      description: faker.lorem.sentence(),
      partners: []
    }

    const newClub: ClubEntity = await service.create(club);
    expect(newClub).not.toBeNull();

    const storedAirport: ClubEntity = await repository.findOne({ where: { id: newClub.id } })
    expect(storedAirport).not.toBeNull();
    expect(storedAirport.name).toEqual(newClub.name)
    expect(storedAirport.image).toEqual(newClub.image)
    expect(storedAirport.description).toEqual(newClub.description)
  });
});
