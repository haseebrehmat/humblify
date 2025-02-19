import { Injectable } from '@nestjs/common'

export interface PaginatedResult<T> {
  data: T[]
  totalItems: number
  totalPages: number
  page: {
    current: number
    next: number | null
    prev: number | null
  }
}

@Injectable()
export class PaginationService {
  paginate<T>(items: T[], page = 1, limit = 10): PaginatedResult<T> {
    page = Math.max(page, 1) // Ensure page is at least 1
    limit = Math.max(limit, 1) // Ensure limit is at least 1

    const totalItems = items.length
    const totalPages = Math.ceil(totalItems / limit)

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = items.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      totalItems,
      totalPages,
      page: {
        current: page,
        next: page < totalPages ? page + 1 : null,
        prev: page > 1 ? page - 1 : null,
      },
    }
  }
}
