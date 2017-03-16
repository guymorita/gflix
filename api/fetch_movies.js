
async function getMoviesFromApi() {
  try {
    let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    let responseJson = await response.json();
    return responseJson.results;
  } catch(error) {
    console.error(error);
  }
}

export default getMoviesFromApi;
