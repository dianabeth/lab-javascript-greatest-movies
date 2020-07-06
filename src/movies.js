// Iteration 1: All directors? - Get the array of all directors.
const getAllDirectors = movie => {
  return movies.map(movie => movie.director);
};

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

//remove duplicates
const sortedDirectors = getAllDirectors().sort();
obj = {};
for (let i of sortedDirectors) {
  obj[i] = true;
}
let directorsWithoutDuplicates = Object.keys(obj);

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
const howManyMovies = movies => {
  let stevenDirected = movies.filter(movie => {
    movie.director === 'Steven Spielberg' && movie.genre.includes('Drama');
  }).length;
  return stevenDirected;
};

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function ratesAverage(movies) {
  if (!movies.length) return 0;
  let filteredMovies = movies.filter(value => value.rate);
  let ratedMovies = filteredMovies.reduce((acc, value) => acc + value.rate, 0);
  return Math.round((ratedMovies / filteredMovies.length) * 100) / 100;
}
ratesAverage(movies);

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(movies) {
  let dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
  let dramaMoviesAvg = ratesAverage(dramaMovies);
  return dramaMoviesAvg;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(array) {
  const moviesArray = [...array];
  moviesArray.sort((movie1, movie2) => {
    let movie1ReleaseYr = movie1.year;
    let movie2ReleaseYr = movie2.year;
    if (movie1ReleaseYr < movie2ReleaseYr) {
      return -1;
    } else if (movie1ReleaseYr > movie2ReleaseYr) {
      return 1;
    } else if (movie1.title.toLowerCase() > movie2.title.toLowerCase()) {
      return 1;
    } else {
      return 1;
    }
  });
  return moviesArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

const orderAlphabetically = movie => {
  let alphabetsArray = [...movies];
  alphabetsArray.sort((movie1, movie2) => {
    return movie1.title.localeCompare(movie2.title);
  });
  const orderedByTitles = alphabetsArray.map(movieTitle => movieTitle.title);
  return orderedByTitles.slice(0, 20);
};

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
const turnHoursToMinutes = array => {
  const moviesWithDurationAsMinutes = array.map(movie => {
    const durationAsString = movie.duration;

    let duration = 0;

    for (let value of durationAsString.split(' ')) {
      const number = parseInt(value);
      if (value.includes('h')) {
        duration += number * 60;
      } else if (value.includes('min')) {
        duration += number;
      }
    }

    const movieWithDurationInMinutes = {
      ...movie,
      duration
    };

    return movieWithDurationInMinutes;
  });

  return moviesWithDurationAsMinutes;
};

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
const bestYearAvg = array => {
  if (array.length === 0) {
    return null;
  }

  const movieAverageRateByYear = array.reduce((accumulator, movie) => {
    const yearOfMovie = movie.year;
    const rateOfMovie = movie.rate;

    if (typeof accumulator[yearOfMovie] === 'undefined') {
      accumulator[yearOfMovie] = [rateOfMovie];
    } else {
      accumulator[yearOfMovie].push(rateOfMovie);
    }

    return accumulator;
  }, {});

  for (let year in movieAverageRateByYear) {
    const averageRateOfYear = movieAverageRateByYear[year].reduce(
      (accumulator, rate, index, originalArray) => accumulator + rate / originalArray.length,
      0
    );
    movieAverageRateByYear[year] = averageRateOfYear;
  }

  const auxiliaryArray = Object.entries(movieAverageRateByYear);

  auxiliaryArray.sort((a, b) => {
    const rateOfYearA = a[1];
    const rateOfYearB = b[1];
    if (rateOfYearA > rateOfYearB) {
      return -1;
    } else {
      return 1;
    }
  });

  const year = auxiliaryArray[0][0];
  const rate = auxiliaryArray[0][1];

  return `The best year was ${year} with an average rate of ${rate}`;
};
