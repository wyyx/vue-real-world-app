function getVisiblePages(
  totalPages: number,
  visiblePages: number,
  currentPage: number
) {
  const totalGroup = Math.ceil(totalPages / visiblePages)
  const currentGroup = Math.ceil(currentPage / visiblePages)

  const currentGroupLength =
    currentGroup === totalGroup
      ? totalPages - (totalGroup - 1) * visiblePages
      : visiblePages

  const currentGroupStart =
    currentGroup === totalGroup
      ? totalPages - currentGroupLength + 1
      : (currentGroup - 1) * visiblePages + 1

  let pages = []
  for (let index = 0; index < currentGroupLength; index++) {
    pages.push(currentGroupStart + index)
  }

  return pages
}
