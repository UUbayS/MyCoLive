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
  
  let admin = existingAdmin
  if (!existingAdmin) {
    // Create admin pertama
    const hashedPassword = await hashPassword('admin123')
    
    admin = await prisma.user.create({
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
  } else {
    console.log('✅ Admin already exists')
    console.log(`   Email: ${existingAdmin.email}`)
  }

  // Seed default fasilitas
  const fasilitasUmum = [
    'WiFi',
    'Parkir Motor',
    'Parkir Mobil',
    'Ruang Tamu',
    'Dapur Bersama',
    'Laundry',
    'Keamanan 24 Jam',
    'CCTV',
    'Kolam Renang',
    'Gym',
    'Taman',
    'Kantin'
  ]

  const fasilitasRuangan = [
    'AC',
    'TV',
    'Kamar Mandi Dalam',
    'Lemari',
    'Meja Belajar',
    'Kasur',
    'Kipas Angin',
    'Water Heater',
    'Jendela',
    'Balkon',
    'Kulkas Mini'
  ]

  for (const nama of fasilitasUmum) {
    const existing = await prisma.fasilitas.findFirst({ where: { nama } })
    if (!existing) {
      await prisma.fasilitas.create({ data: { nama, jenis: 'UMUM' } })
    }
  }

  for (const nama of fasilitasRuangan) {
    const existing = await prisma.fasilitas.findFirst({ where: { nama } })
    if (!existing) {
      await prisma.fasilitas.create({ data: { nama, jenis: 'RUANGAN' } })
    }
  }

  console.log(`✅ Seeded ${fasilitasUmum.length} UMUM fasilitas`)
  console.log(`✅ Seeded ${fasilitasRuangan.length} RUANGAN fasilitas`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })