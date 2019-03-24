export const pageUtil = {
  // get page numbers
  getPages(
    totalItems: number,
    itemsPerPage: number,
    visiblePages: number,
    currentPage: number
  ) {
    // if (totalItems < 1) {
    //   return
    // }

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // change currentPage to last page when currentPage are greater than totalPages
    if (currentPage > totalPages) {
      currentPage = totalPages
    }

    const totalGroup = Math.ceil(totalPages / visiblePages)
    const currentGroup = Math.ceil(currentPage / visiblePages)
    const lastGroupLength = totalPages - (totalGroup - 1) * visiblePages

    const currentGroupLength =
      currentGroup === totalGroup ? lastGroupLength : visiblePages

    const currentGroupStart =
      currentGroup === totalGroup
        ? (totalGroup - 1) * visiblePages + 1
        : (currentGroup - 1) * visiblePages + 1

    let pages = []
    for (let index = 0; index < currentGroupLength; index++) {
      pages.push(currentGroupStart + index)
    }
    return pages
  }
}
