import type { ICellRendererParams } from 'ag-grid-community';

export function RatingRenderer(params: ICellRendererParams) {
  const rating = document.createElement('post-rating');
  rating.setAttribute('current-rating', params.value);
  return rating;
}
