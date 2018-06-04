const createBlankMatrix = (
  length: number,
  placeholder?: any,
  placeHolderGenerator?: Function
): any[][] => {
  return Array.from({ length }).map(() => {
    return Array.from({ length }).map(() => placeholder || placeHolderGenerator())
  })
}

export default createBlankMatrix
