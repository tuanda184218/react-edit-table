import { faker } from '@faker-js/faker';


export function createRandomProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 100, max: 5000 }),
    description: faker.lorem.sentence(),
    a: faker.lorem.word(),
    b: faker.lorem.word(),
    c: faker.lorem.word(),
    d: faker.lorem.word(),
    e: faker.lorem.word(),
    f: faker.lorem.word(),
    g: faker.lorem.word(),
    h: faker.lorem.word(),
    i: faker.lorem.word(),
    k: faker.lorem.word(),
    l: faker.lorem.word(),
    m: faker.lorem.word(),
    n: faker.lorem.word(),
    o: faker.lorem.word(),
    p: faker.lorem.word(),
    q: faker.lorem.word(),
    r: faker.lorem.word(),
  };
}

export const fakeProducts = faker.helpers.multiple(createRandomProduct, {
  count: 100,
});