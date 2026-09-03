import { PrismaClient } from '@prisma/client';
import { createClient } = require('@supabase/supabase-js');

const prisma = new PrismaClient();

const supabaseUrl = process.env.SUPABASE_URL || 'https://epmbzwcvhophzhzetoio.supabase.co';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseSecretKey) {
  console.error("SUPABASE_SECRET_KEY is required.");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createSuperAdmin() {
  const adminEmail = 'badhon.admin@kajlagbe.com';
  const adminPassword = 'KajLagbeSuperAdmin#2026';
  const firstName = 'Badhon';
  const lastName = 'Mondol';

  console.log(`Creating/Updating Super Admin account for ${adminEmail}...`);

  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: { displayName: 'Super Administrator', description: 'Full platform control' },
    create: { name: 'SUPER_ADMIN', displayName: 'Super Administrator', description: 'Full platform control', isSystem: true },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: { displayName: 'Administrator', description: 'Operations and platform management' },
    create: { name: 'ADMIN', displayName: 'Administrator', description: 'Operations and platform management', isSystem: true },
  });

  let userId: string;
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  
  const existingSupabaseUser = existingUsers?.users?.find(u => u.email === adminEmail);

  if (existingSupabaseUser) {
    userId = existingSupabaseUser.id;
    await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        firstName,
        lastName,
        role: 'SUPER_ADMIN',
        onboardingStatus: 'COMPLETED',
      },
      app_metadata: {
        role: 'SUPER_ADMIN',
        roles: ['SUPER_ADMIN', 'ADMIN'],
      },
    });
  } else {
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        firstName,
        lastName,
        role: 'SUPER_ADMIN',
        onboardingStatus: 'COMPLETED',
      },
      app_metadata: {
        role: 'SUPER_ADMIN',
        roles: ['SUPER_ADMIN', 'ADMIN'],
      },
    });

    if (createError || !newUser.user) {
      throw new Error(`Failed to create Supabase user: ${createError?.message}`);
    }
    userId = newUser.user.id;
  }

  const dbUser = await prisma.user.upsert({
    where: { id: userId },
    update: {
      email: adminEmail,
      status: 'ACTIVE',
      onboardingStatus: 'COMPLETED',
      isEmailVerified: true,
    },
    create: {
      id: userId,
      email: adminEmail,
      status: 'ACTIVE',
      onboardingStatus: 'COMPLETED',
      isEmailVerified: true,
    },
  });

  await prisma.userRole.deleteMany({ where: { userId: dbUser.id } });
  await prisma.userRole.createMany({
    data: [
      { userId: dbUser.id, roleId: superAdminRole.id },
      { userId: dbUser.id, roleId: adminRole.id },
    ],
  });

  await prisma.userProfile.upsert({
    where: { userId: dbUser.id },
    update: {
      firstName,
      lastName,
      verificationStatus: 'APPROVED',
      bio: 'Super Administrator & Founder of KajLagbe Platform',
    },
    create: {
      userId: dbUser.id,
      firstName,
      lastName,
      verificationStatus: 'APPROVED',
      bio: 'Super Administrator & Founder of KajLagbe Platform',
    },
  });

  console.log('✅ SUPER ADMIN ACCOUNT CREATED SUCCESSFULLY!');
}

createSuperAdmin()
  .catch((err) => {
    console.error('❌ Error creating Super Admin:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
