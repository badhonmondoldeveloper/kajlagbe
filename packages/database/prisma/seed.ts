import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROLES = [
  { name: 'SUPER_ADMIN', displayName: 'Super Administrator', description: 'Full platform access and administration' },
  { name: 'ADMIN', displayName: 'Administrator', description: 'Operations and platform management' },
  { name: 'OPERATIONS_MANAGER', displayName: 'Operations Manager', description: 'Service operations, provider monitoring and disputes' },
  { name: 'FINANCE_ADMIN', displayName: 'Finance Administrator', description: 'Payments, commissions, ledger and payouts' },
  { name: 'VERIFICATION_OFFICER', displayName: 'Verification Officer', description: 'Provider identity, NID, trade license and document verification' },
  { name: 'SUPPORT_AGENT', displayName: 'Support Agent', description: 'Customer and provider help desk & dispute mediation' },
  { name: 'CUSTOMER', displayName: 'Customer', description: 'End user seeking and booking services' },
  { name: 'INDIVIDUAL_PROVIDER', displayName: 'Individual Service Provider', description: 'Freelance skilled professional offering services' },
  { name: 'COMPANY_OWNER', displayName: 'Service Company Owner', description: 'Business owner managing company profile and teams' },
  { name: 'COMPANY_MANAGER', displayName: 'Company Manager', description: 'Manager for company jobs, team and bookings' },
  { name: 'TEAM_MEMBER', displayName: 'Company Team Member', description: 'Technician/staff assigned to company service jobs' },
];

const DIVISIONS = [
  { name: 'Dhaka', bnName: 'ঢাকা', code: 'DHAKA' },
  { name: 'Chittagong', bnName: 'চট্টগ্রাম', code: 'CHITTAGONG' },
  { name: 'Rajshahi', bnName: 'রাজশাহী', code: 'RAJSHAHI' },
  { name: 'Khulna', bnName: 'খুলনা', code: 'KHULNA' },
  { name: 'Barisal', bnName: 'বরিশাল', code: 'BARISAL' },
  { name: 'Sylhet', bnName: 'সিলেট', code: 'SYLHET' },
  { name: 'Rangpur', bnName: 'রংপুর', code: 'RANGPUR' },
  { name: 'Mymensingh', bnName: 'ময়মনসিংহ', code: 'MYMENSINGH' },
];

async function main() {
  console.log('Seeding foundation data for KajLagbe...');

  // 1. Seed Roles
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { displayName: role.displayName, description: role.description },
      create: {
        name: role.name,
        displayName: role.displayName,
        description: role.description,
        isSystem: true,
      },
    });
  }
  console.log(`✓ Seeded ${ROLES.length} roles`);

  // 2. Seed Divisions
  for (const div of DIVISIONS) {
    await prisma.division.upsert({
      where: { code: div.code },
      update: { name: div.name, bnName: div.bnName },
      create: div,
    });
  }
  console.log(`✓ Seeded ${DIVISIONS.length} Bangladesh divisions`);

  // 3. Seed Basic System Settings
  const settings = [
    { key: 'PLATFORM_NAME', value: 'KajLagbe', description: 'Platform official brand name', isPublic: true },
    { key: 'PLATFORM_CURRENCY', value: 'BDT', description: 'Primary currency', isPublic: true },
    { key: 'DEFAULT_COMMISSION_PERCENT', value: '10', description: 'Default commission percentage', isPublic: false },
    { key: 'SUPPORT_EMAIL', value: 'support@kajlagbe.com', description: 'Support email', isPublic: true },
  ];

  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description, isPublic: s.isPublic },
      create: s,
    });
  }
  console.log(`✓ Seeded default system settings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

