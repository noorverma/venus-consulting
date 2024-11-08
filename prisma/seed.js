const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Voltage Tester',
        description: 'A high-quality voltage tester for safe electrical inspections.',
        price: 25.99,
        image: '/voltagetester.png',
      },
      {
        name: 'Insulated Gloves',
        description: 'Electrical safety gloves with high insulation protection.',
        price: 15.50,
        image: '/insulatedgloves.jpeg',
      },
      {
        name: 'Circuit Breaker Finder',
        description: 'Accurate circuit breaker finder for quick electrical testing.',
        price: 40.00,
        image: '/circuitbreakerfinder.png',
      },
    ],
  });
}

main()
  .then(() => console.log('Database seeded!'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
