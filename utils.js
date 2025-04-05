export const movies = [
  {
    id: 1,
    moviename: "The Shawshank Redemption",
    length: 142,
    releaseyear: 1994,
  },
  { id: 2, moviename: "The Godfather", length: 175, releaseyear: 1972 },
  { id: 3, moviename: "The Dark Knight", length: 152, releaseyear: 2008 },
  { id: 4, moviename: "Pulp Fiction", length: 154, releaseyear: 1994 },
  {
    id: 5,
    moviename: "The Lord of the Rings: The Return of the King",
    length: 201,
    releaseyear: 2003,
  },
  { id: 6, moviename: "Forrest Gump", length: 142, releaseyear: 1994 },
  { id: 7, moviename: "Inception", length: 148, releaseyear: 2010 },
  { id: 8, moviename: "Fight Club", length: 139, releaseyear: 1999 },
  { id: 9, moviename: "The Matrix", length: 136, releaseyear: 1999 },
  { id: 10, moviename: "Interstellar", length: 169, releaseyear: 2014 },
];

const generateRandomTime = () => {
  const randomNumber = Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;
  return randomNumber;
};

export const delayResult = (data) => {
  const delayTime = generateRandomTime();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, delayTime);
  });
};
