
const API_URL = "https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json";

const getMoviesData = async (setMovies, setLoading, setError) => {
    setLoading(true);
    await fetch(`${API_URL}`)
    .then(response => response.json())
    .then(res => setMovies(res))
    .catch(err => setError(err))
    .finally(setLoading(false))
}

export {getMoviesData};