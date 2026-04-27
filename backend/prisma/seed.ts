import { PrismaClient } from '../src/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { hashPassword } from '../src/utils/password'

const connection = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(connection)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')
  
  // Cek apakah sudah ada admin
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'PEMILIK' }
  })
  
  if (existingAdmin) {
    console.log('✅ Admin already exists')
    console.log(`   Email: ${existingAdmin.email}`)
    return
  }
  
  // Create admin pertama
  const hashedPassword = await hashPassword('admin123')
  
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@mycolive.com',
      password: hashedPassword,
      nama: 'Admin MyCoLive',
      role: 'PEMILIK',
      no_telepon: '6280000000000'
    }
  })
  
  console.log('✅ Admin created successfully!')
  console.log(`   Email: ${admin.email}`)
  console.log(`   Password: admin123`)
  console.log('')
  console.log('⚠️  IMPORTANT: Ganti password setelah login pertama!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })