import argon2 from 'argon2';
import { users } from '../db-data';
import { logger } from '../logger';

const seedData = [
  { id: '1', email: 'test@angular-university.io', password: 'angular' },
];

export async function seedUsers() {
  for (const seed of seedData) {
    users.push({
      id: seed.id,
      email: seed.email,
      // Argon2id defaults: m=65536 (64 MiB), t=3 iterations, p=4 — OWASP recommended
      passwordHash: await argon2.hash(seed.password),
    });
    logger.info({ email: seed.email }, 'Seeded user');
  }
}
