export class Paging {

  constructor(navDirection?: string) {
    this.navDirection = navDirection ? 'navLeft' : 'navRight';
  }

  page = 1;
  pageSize = 10;
  navDirection = null;
  prevPage = 1;
}

export function handlePageChange(page: number, paginationControl: Paging) {
  if (page > paginationControl.prevPage) {
    paginationControl.navDirection = 'navLeft';
  } else {
    paginationControl.navDirection = 'navRight';
  }
  paginationControl.prevPage = page;
}
