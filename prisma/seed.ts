import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Bijli Database...');

    // Create a default Admin/Test Profile
    const user = await prisma.user.upsert({
        where: { walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }, // Example address
        update: {},
        create: {
            walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            profile: {
                create: {
                    name: 'Prashant User', // Store under person name for better understanding
                    role: 'PROSUMER',
                    reputation: 85,
                    bio: 'Early adopter of Bijli Grid. Production: 15kW Solar.',
                    sustainabilityScore: 92,
                },
            },
        },
        include: { profile: true },
    });

    if (user.profile) {
        // Add some test assets
        await prisma.energyAsset.createMany({
            data: [
                {
                    profileId: user.profile.id,
                    type: 'SOLAR',
                    capacity: 15.5,
                    availability: 12.0,
                    location: 'Rooftop Sector 7',
                },
                {
                    profileId: user.profile.id,
                    type: 'WIND',
                    capacity: 5.0,
                    availability: 2.5,
                    location: 'North Ridge',
                },
            ],
        });

        // Add some history
        await prisma.history.create({
            data: {
                profileId: user.profile.id,
                type: 'TRADE',
                description: 'Sold 50kWh to Grid',
                amount: 25.5,
            },
        });

        console.log(`Seeding complete. Profile created: ${user.profile.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
