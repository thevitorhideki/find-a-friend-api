import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const org = await prisma.organization.create({ data })

    return org
  }
}
