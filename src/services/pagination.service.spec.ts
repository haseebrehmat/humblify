import { PaginationService } from '@services/pagination.service'

describe('PaginationService', () => {
  let paginationService: PaginationService

  beforeEach(() => {
    paginationService = new PaginationService()
  })

  describe('paginate', () => {
    it('should return paginated data with correct structure', () => {
      const items = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`)
      const result = paginationService.paginate(items, 1, 10)

      expect(result).toEqual({
        data: items.slice(0, 10),
        totalItems: 25,
        totalPages: 3,
        page: {
          current: 1,
          next: 2,
          prev: null,
        },
      })
    })

    it('should handle pagination correctly for middle pages', () => {
      const items = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`)
      const result = paginationService.paginate(items, 2, 10)

      expect(result).toEqual({
        data: items.slice(10, 20),
        totalItems: 25,
        totalPages: 3,
        page: {
          current: 2,
          next: 3,
          prev: 1,
        },
      })
    })

    it('should return the last page with correct next/prev values', () => {
      const items = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`)
      const result = paginationService.paginate(items, 3, 10)

      expect(result).toEqual({
        data: items.slice(20, 25),
        totalItems: 25,
        totalPages: 3,
        page: {
          current: 3,
          next: null,
          prev: 2,
        },
      })
    })

    it('should return an empty array when no items exist', () => {
      const result = paginationService.paginate([], 1, 10)

      expect(result).toEqual({
        data: [],
        totalItems: 0,
        totalPages: 0,
        page: {
          current: 1,
          next: null,
          prev: null,
        },
      })
    })

    it('should handle pages out of range by returning an empty data array', () => {
      const items = Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`)
      const result = paginationService.paginate(items, 3, 3)

      expect(result).toEqual({
        data: [],
        totalItems: 5,
        totalPages: 2,
        page: {
          current: 3,
          next: null,
          prev: 2,
        },
      })
    })

    it('should handle negative or zero page numbers by defaulting to page 1', () => {
      const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)
      const result = paginationService.paginate(items, -2, 5)

      expect(result.page.current).toBe(1)
    })

    it('should handle negative or zero limit values by defaulting to at least 1 item per page', () => {
      const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)
      const result = paginationService.paginate(items, 1, 0)

      expect(result.page.current).toBe(1)
      expect(result.data.length).toBe(1) // At least one item per page
    })
  })
})
