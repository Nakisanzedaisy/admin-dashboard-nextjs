import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function getRolePermissions(role) {
  const permissions = {
    SUPER_ADMIN: [
      'create_users',
      'read_users',
      'update_users',
      'delete_users',
      'manage_roles',
      'view_analytics',
      'system_settings'
    ],
    ADMIN: [
      'read_users',
      'view_analytics'
    ]
  }
  
  return permissions[role] || []
}