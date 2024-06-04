
export function applyFilter({ inputData, comparator, filterName }) {
    if (!filterName) {
      return inputData;
    }
  
    const lowerCaseFilter = filterName.toLowerCase();
  
    return inputData.filter((item) => {
      // 여기서 item은 reports 배열의 각 요소를 나타냅니다.
      return Object.values(item).some((value) => {
        if (typeof value === 'string') {
          const lowerCaseValue = value.toLowerCase();
          return lowerCaseValue.includes(lowerCaseFilter);
        }
        return false;
      });
    });
  }
  
  export function emptyRows(page, rowsPerPage, reportsLength) {
    const rowCount = reportsLength;
    return Math.max(0, rowsPerPage - Math.min(rowsPerPage, rowCount - page * rowsPerPage));
  }
  
  export function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  