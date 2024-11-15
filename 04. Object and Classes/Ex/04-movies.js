function solve(input) {

    const movies = [];
    for (let command of input) {
        let parts = command.split(' ');

        if (parts[0] === 'addMovie') {
            const movieName = parts.slice(1).join(' ');
            movies.push({ name: movieName });
        } else {
            const movieName = parts[0];
            const property = parts[1];
            const value = parts.slice(2).join(' ');

            let movie = movies.find(m => m.name === movieName);

            if (movie) {
                if (property === 'directedBy') {
                    movie.director = value;
                } else if (property === 'onDate') {
                    movie.date = value;
                }
            }
        }
    }
    const moviesInfo = movies.filter(m => m.name && m.director && m.date);
    moviesInfo.forEach(movie => {
        console.log(JSON.stringify(movie));
    });
}


solve([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
]);