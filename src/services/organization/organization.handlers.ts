import type { OrganizationStatus } from './organization.types'

const BADGE_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DELETED: 'deleted',
} as const satisfies Record<OrganizationStatus, string>

export const getBadgeStatus = (status: OrganizationStatus) => BADGE_STATUSES[status]
