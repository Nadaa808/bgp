const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const clientsData = [{
        clientId: 'CL001',
        email: 'john.smith@email.com',
        firstName: 'John',
        lastName: 'Smith',
        country: 'United States',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Alice Johnson',
        balance: 125000.50,
        clientType: 'Individual'
    },
    {
        clientId: 'CL002',
        email: 'sarah.wilson@email.com',
        firstName: 'Sarah',
        lastName: 'Wilson',
        country: 'Canada',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Bob Chen',
        balance: 89500.75,
        clientType: 'Individual'
    },
    {
        clientId: 'CL003',
        email: 'michael.brown@email.com',
        firstName: 'Michael',
        lastName: 'Brown',
        country: 'United Kingdom',
        isVerified: false,
        tradingStatus: 'Inactive',
        manager: 'Carol Davis',
        balance: 67200.00,
        clientType: 'Community'
    },
    {
        clientId: 'CL004',
        email: 'emma.garcia@email.com',
        firstName: 'Emma',
        lastName: 'Garcia',
        country: 'Spain',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'David Lee',
        balance: 156780.25,
        clientType: 'Individual'
    },
    {
        clientId: 'CL005',
        email: 'tech.innovations@email.com',
        firstName: 'Tech',
        lastName: 'Innovations Ltd',
        country: 'Australia',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Eve Martinez',
        balance: 298450.80,
        clientType: 'Community'
    },
    {
        clientId: 'CL006',
        email: 'james.rodriguez@email.com',
        firstName: 'James',
        lastName: 'Rodriguez',
        country: 'Mexico',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Frank Wilson',
        balance: 78900.45,
        clientType: 'Individual'
    },
    {
        clientId: 'CL007',
        email: 'lisa.chen@email.com',
        firstName: 'Lisa',
        lastName: 'Chen',
        country: 'Singapore',
        isVerified: false,
        tradingStatus: 'Pending',
        manager: 'Grace Kim',
        balance: 45600.00,
        clientType: 'Individual'
    },
    {
        clientId: 'CL008',
        email: 'global.ventures@email.com',
        firstName: 'Global',
        lastName: 'Ventures Corp',
        country: 'Germany',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Henry Zhang',
        balance: 567890.25,
        clientType: 'Community'
    },
    {
        clientId: 'CL009',
        email: 'marie.dubois@email.com',
        firstName: 'Marie',
        lastName: 'Dubois',
        country: 'France',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Isabel Torres',
        balance: 234567.80,
        clientType: 'Individual'
    },
    {
        clientId: 'CL010',
        email: 'akira.tanaka@email.com',
        firstName: 'Akira',
        lastName: 'Tanaka',
        country: 'Japan',
        isVerified: false,
        tradingStatus: 'Inactive',
        manager: 'Jack Brown',
        balance: 98765.40,
        clientType: 'Individual'
    },
    {
        clientId: 'CL011',
        email: 'innovation.hub@email.com',
        firstName: 'Innovation',
        lastName: 'Hub Limited',
        country: 'Hong Kong',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Kate Miller',
        balance: 445678.90,
        clientType: 'Community'
    },
    {
        clientId: 'CL012',
        email: 'pedro.silva@email.com',
        firstName: 'Pedro',
        lastName: 'Silva',
        country: 'Brazil',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Luis Garcia',
        balance: 167890.55,
        clientType: 'Individual'
    },
    {
        clientId: 'CL013',
        email: 'anna.kowalski@email.com',
        firstName: 'Anna',
        lastName: 'Kowalski',
        country: 'Poland',
        isVerified: false,
        tradingStatus: 'Pending',
        manager: 'Maria Santos',
        balance: 56789.20,
        clientType: 'Individual'
    },
    {
        clientId: 'CL014',
        email: 'digital.solutions@email.com',
        firstName: 'Digital',
        lastName: 'Solutions Inc',
        country: 'Netherlands',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Nina Patel',
        balance: 378945.65,
        clientType: 'Community'
    },
    {
        clientId: 'CL015',
        email: 'raj.patel@email.com',
        firstName: 'Raj',
        lastName: 'Patel',
        country: 'India',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Oliver Smith',
        balance: 123456.78,
        clientType: 'Individual'
    },
    {
        clientId: 'CL016',
        email: 'sofia.andersson@email.com',
        firstName: 'Sofia',
        lastName: 'Andersson',
        country: 'Sweden',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Paul Johnson',
        balance: 209876.45,
        clientType: 'Individual'
    },
    {
        clientId: 'CL017',
        email: 'blockchain.ventures@email.com',
        firstName: 'Blockchain',
        lastName: 'Ventures Ltd',
        country: 'Switzerland',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Quinn Davis',
        balance: 789123.50,
        clientType: 'Community'
    },
    {
        clientId: 'CL018',
        email: 'kim.min.jun@email.com',
        firstName: 'Kim',
        lastName: 'Min Jun',
        country: 'South Korea',
        isVerified: false,
        tradingStatus: 'Inactive',
        manager: 'Rachel Green',
        balance: 87654.30,
        clientType: 'Individual'
    },
    {
        clientId: 'CL019',
        email: 'alessandro.rossi@email.com',
        firstName: 'Alessandro',
        lastName: 'Rossi',
        country: 'Italy',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Sam Wilson',
        balance: 345678.90,
        clientType: 'Individual'
    },
    {
        clientId: 'CL020',
        email: 'crypto.collective@email.com',
        firstName: 'Crypto',
        lastName: 'Collective Group',
        country: 'United Arab Emirates',
        isVerified: true,
        tradingStatus: 'Active',
        manager: 'Tina Rodriguez',
        balance: 612345.75,
        clientType: 'Community'
    }
];

const leadsData = [{
        leadId: 'LD001',
        email: 'emma.wilson@email.com',
        firstName: 'Emma',
        lastName: 'Wilson',
        country: 'Germany',
        status: 'Hot',
        source: 'Website',
        score: 85,
        estimatedValue: 95000,
        clientType: 'Individual',
        notes: 'Interested in blockchain investments, high potential'
    },
    {
        leadId: 'LD002',
        email: 'david.chen@email.com',
        firstName: 'David',
        lastName: 'Chen',
        country: 'Singapore',
        status: 'Warm',
        source: 'Referral',
        score: 72,
        estimatedValue: 125000,
        clientType: 'Individual',
        notes: 'Referred by existing client, needs follow-up'
    },
    {
        leadId: 'LD003',
        email: 'innovation.labs@email.com',
        firstName: 'Innovation',
        lastName: 'Labs Corp',
        country: 'Japan',
        status: 'Cold',
        source: 'Social Media',
        score: 45,
        estimatedValue: 250000,
        clientType: 'Community',
        notes: 'Corporate lead, long sales cycle expected'
    },
    {
        leadId: 'LD004',
        email: 'carlos.mendez@email.com',
        firstName: 'Carlos',
        lastName: 'Mendez',
        country: 'Mexico',
        status: 'Hot',
        source: 'Website',
        score: 88,
        estimatedValue: 78000,
        clientType: 'Individual',
        notes: 'Ready to invest, schedule demo call'
    },
    {
        leadId: 'LD005',
        email: 'nordic.ventures@email.com',
        firstName: 'Nordic',
        lastName: 'Ventures Ltd',
        country: 'Norway',
        status: 'Warm',
        source: 'Conference',
        score: 76,
        estimatedValue: 350000,
        clientType: 'Community',
        notes: 'Met at blockchain conference, interested in DeFi'
    }
];

async function main() {
    console.log('🌱 Starting database seeding...');

    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await prisma.lead.deleteMany({});
        await prisma.client.deleteMany({});

        // Seed clients
        console.log('👥 Seeding clients...');
        for (const clientData of clientsData) {
            await prisma.client.create({
                data: clientData
            });
        }

        // Seed leads
        console.log('🎯 Seeding leads...');
        for (const leadData of leadsData) {
            await prisma.lead.create({
                data: leadData
            });
        }

        console.log(`✅ Successfully seeded ${clientsData.length} clients and ${leadsData.length} leads`);

        // Display statistics
        const totalClients = await prisma.client.count();
        const verifiedClients = await prisma.client.count({
            where: { isVerified: true }
        });
        const activeClients = await prisma.client.count({
            where: { tradingStatus: 'Active' }
        });
        const individualClients = await prisma.client.count({
            where: { clientType: 'Individual' }
        });
        const communityClients = await prisma.client.count({
            where: { clientType: 'Community' }
        });

        console.log('\n📊 Database Statistics:');
        console.log(`   Total Clients: ${totalClients}`);
        console.log(`   Verified Clients: ${verifiedClients} (${Math.round((verifiedClients/totalClients)*100)}%)`);
        console.log(`   Active Clients: ${activeClients} (${Math.round((activeClients/totalClients)*100)}%)`);
        console.log(`   Individual Clients: ${individualClients}`);
        console.log(`   Community Clients: ${communityClients}`);

        // Calculate total balance
        const totalBalance = await prisma.client.aggregate({
            _sum: {
                balance: true
            }
        });

        console.log(`   Total Balance: $${totalBalance._sum.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}`);

        // Lead statistics
        const totalLeads = await prisma.lead.count();
        const hotLeads = await prisma.lead.count({
            where: { status: 'Hot' }
        });
        const totalEstimatedValue = await prisma.lead.aggregate({
            _sum: { estimatedValue: true }
        });

        console.log(`\n🎯 Lead Statistics:`);
        console.log(`   Total Leads: ${totalLeads}`);
        console.log(`   Hot Leads: ${hotLeads}`);
        console.log(`   Total Estimated Value: $${totalEstimatedValue._sum.estimatedValue?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}`);

        console.log('\n🎉 Database seeding completed successfully!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });