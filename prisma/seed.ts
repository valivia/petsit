import { JobType, Pet, PrismaClient, RateType, User, petType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const iter = (n: number, fn: () => Promise<any>) => {
  return Array.from({ length: n }, fn);
}

const randomAmount = (min: number, max: number) => {
  const length = Math.floor(Math.random() * (max - min + 1) + min);
  return new Array(length).fill(1);
}

function randomEnum<T extends object>(anEnum: T): T[keyof T] {
  const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

async function createUser() {
  await prisma.user.create({
    data: {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),

      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      bio: faker.lorem.paragraph(),
      location: faker.address.city(),
    }
  })
}

async function createJob(user: User) {
  await prisma.job.create({
    data: {
      title: faker.random.words(2),
      description: faker.lorem.paragraph(),
      rate: faker.datatype.number({ min: 3, max: 100, precision: 0.01 }),
      rateType: randomEnum(RateType),
      location: faker.address.city(),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
      type: randomEnum(JobType),
      authorId: user.id,
      pets: {
        create: randomAmount(1, 3).map(() => ({
          name: faker.name.firstName(),
          breed: faker.animal.bird(),
          bio: faker.lorem.paragraph(),
          birthDate: faker.date.past(),
          type: randomEnum(petType),
          userId: user.id,
        }))
      }
    }
  })
}

async function main() {
  await Promise.all(iter(10, createUser));
  const users = await prisma.user.findMany();
  await Promise.all(users.map(user => randomAmount(0, 4).map(() => createJob(user))));
}

main()
