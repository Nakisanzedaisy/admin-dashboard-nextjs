const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createSuperAdmin() {
  try {
    // Check if a super admin already exists
    const existingSuperAdmin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' }
    })

    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email)
      return
    }

    // Create the first super admin
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const superAdmin = await prisma.user.create({
      data: {
        email: 'superadmin@admin.com',
        password: hashedPassword,
        name: 'Super Administrator',
        role: 'SUPER_ADMIN',
        isActive: true
      }
    })

    console.log('Super admin created successfully!')
    console.log('Email: superadmin@admin.com')
    console.log('Password: admin123')
    console.log('Please change this password after first login.')

  } catch (error) {
    console.error('Error creating super admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSuperAdmin()