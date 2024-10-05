import { faker } from "@faker-js/faker";
import { dbInstance } from "../config/dbConnection.cjs";
import { users } from "../models/userModel.js";

export async function userSeed() {
  const dummyUsers = [];
  for (let i = 0; i < 15; i++) {
    dummyUsers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "123456",
      // password: faker.internet.password(),
      role: faker.helpers.arrayElement(["user", "admin"]),
    });
  }
  try {
    await dbInstance.insert(users).values(dummyUsers);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}


