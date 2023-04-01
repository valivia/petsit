import { JobType, Pet, PrismaClient, petType } from "@prisma/client";
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
  const user = await prisma.user.create({
    data: {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),

      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      bio: faker.lorem.paragraph(),

      pets: {
        createMany: {
          data: randomAmount(1, 5).map(() => ({
            name: faker.animal.bird(),
            type: randomEnum(petType),
          })),
        }
      }
    }
  })

  const pets = await prisma.pet.createMany({
    data: randomAmount(1, 5).map(() => ({
      name: faker.animal.bird(),
      type: randomEnum(petType),
      userId: user.id,
    }))
  })
}

async function createJobs(pet: Pet) {
  await prisma.job.createMany({
    data: randomAmount(0, 2).map(() => ({
      title: faker.random.words(2),
      body: faker.lorem.paragraph(),
      hourlyRate: faker.datatype.number({ min: 3, max: 100, precision: 0.01 }),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
      type: randomEnum(JobType),
      petId: pet.id,
      userId: pet.userId,
    }))
  })
}

async function main() {
  await Promise.all(iter(10, createUser));
  const pets = await prisma.pet.findMany();
  await Promise.all(pets.map(createJobs));
}

main()
