const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Initial library data
let library = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", available: true },
  { title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", available: false },
  { title: "1984", author: "George Orwell", genre: "Dystopian", available: true },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", available: false },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", available: true }
];

function countTotalBooks(library) {
  return library.length;
}

function filterBooksByGenre(library, genre) {
  return library.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
}

function findMostFrequentAuthor(library) {
  const authorCount = {};
  library.forEach(book => {
    authorCount[book.author] = (authorCount[book.author] || 0) + 1;
  });

  let maxAuthor = null;
  let maxCount = 0;

  for (const author in authorCount) {
    if (authorCount[author] > maxCount) {
      maxAuthor = author;
      maxCount = authorCount[author];
    }
  }
  return maxAuthor;
}

function groupBooksByAvailability(library) {
  return library.reduce(
    (groups, book) => {
      if (book.available) {
        groups.available.push(book);
      } else {
        groups.borrowed.push(book);
      }
      return groups;
    },
    { available: [], borrowed: [] }
  );
}


function fetchNewBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBooks = [
        { title: "Moby Dick", author: "Herman Melville", genre: "Classic", available: true },
        { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", available: false },
        { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: true },
        { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", available: false },
        { title: "Inferno", author: "Dan Brown", genre: "Thriller", available: true }
      ];
      resolve(newBooks);
    }, 1000);
  });
}


function showMenu() {
  console.log("\n==== Library Management Menu ====");
  console.log("1. Count total number of books");
  console.log("2. Filter books by genre");
  console.log("3. Find most frequent author");
  console.log("4. Group books by availability");
  console.log("5. Fetch new books (simulate)");
  console.log("0. Exit");
  rl.question("Choose an option: ", handleMenu);
}

function handleMenu(option) {
  switch (option) {
    case "1":
      console.log('Total number of books:', countTotalBooks(library));
      showMenu();
      break;

    case "2":
      rl.question("Enter genre to filter: ", (genre) => {
        const filtered = filterBooksByGenre(library, genre);
        if (filtered.length === 0) {
          console.log('No books found in genre:', genre);
        } else {
          console.table(filtered);
        }
        showMenu();
      });
      break;

    case "3":
      console.log('Most frequent author:', findMostFrequentAuthor(library));
      showMenu();
      break;

    case "4":
      console.log("Grouped by availability:");
      console.log(groupBooksByAvailability(library));
      showMenu();
      break;

    case "5":
      console.log("Fetching new books (local)...");
      fetchNewBooks().then(newBooks => {
        library.push(...newBooks);
        console.log('New books added! Total books now:', library.length);
        showMenu();
      });
      break;

    case "0":
      console.log("Goodbye!");
      rl.close();
      break;

    default:
      console.log("Invalid option. Try again.");
      showMenu();
      break;
  }
}

showMenu();
