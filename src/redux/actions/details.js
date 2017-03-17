
export const VIEW_DETAILS = 'VIEW_DETAILS'

export function viewDetails(movieId) {
  return {
    type: VIEW_DETAILS,
    movieId
  }
}
