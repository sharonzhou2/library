let myLibrary = [];
const myLibContainer = document.querySelector(".library");
const submitBtn = document.getElementById("submit");
const removeAllBtn = document.getElementById("reset");
let latestId = null;
latestId = parseInt(window.localStorage.getItem('bookID'));


function Book( author, title, noPages, isRead) {

    this.author = author;
    this.title = title;
    this.noPages = noPages;
    this.isRead = isRead;


}
function incrementID(latestId) {
    latestId = parseInt(window.localStorage.getItem('bookID'));
    if (!latestId) {
        // console.log("hi");
        latestId = 1;
    } else {
        latestId++;
    }

    window.localStorage.setItem('bookID', latestId);
    // console.log(parseInt(window.localStorage.getItem('bookID')));
    return latestId;
}

function loadBooks() {
    myLibraryStorage = JSON.parse(window.localStorage.getItem('myLibrary'));
    if (myLibraryStorage!== null) {
        myLibrary = myLibraryStorage;
        getAllBooks(myLibraryStorage);
    }
}
loadBooks();

// let book1 = new Book("Masashi", "Naruto", 30, false);
// console.log(book1)

function addBookToLibrary(author, title, noPages, isRead) {
  let book1 = new Book(author, title, noPages, isRead);
  myLibrary.push(book1);

  return book1;
}

// addBookToLibrary("Masashi", "Naruto", 30, false);
// addBookToLibrary("Hello", "newBook", 50, false);
// console.log(myLibrary)

function getAllBooks(myLibrary) {
    myLibrary.forEach(book => {
        addBook(book);
        // console.log(book);
       
        
    });
}



function addBook(book) {
   

    
        let bookCard = document.createElement('div');
        bookCard.classList.add("card");
        myLibContainer.appendChild(bookCard)
        bookCard.setAttribute("data-id", incrementID());
        
        let titleElement = document.createElement("p");
        let authorElement = document.createElement("p");
        let pagesElement = document.createElement("p");
        // console.log(book.title);
        let titleInfo = document.createTextNode(book.title);
        let authInfo = document.createTextNode(book.author);
        let pagesInfo = document.createTextNode(book.noPages);
        
        titleElement.classList.add("titleInfo");
        authorElement.classList.add("authInfo");
        pagesElement.classList.add("pageInfo");

        authorElement.innerText = "Written by: ";
        pagesElement.innerText = "No. of pages: "

        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);

        titleElement.appendChild(titleInfo);
        authorElement.appendChild(authInfo);
        pagesElement.appendChild(pagesInfo);

        let btnDiv = document.createElement("div");
        btnDiv.classList.add("outerBtn");

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBook");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener('click', (e) => {
            let booktitles = e.target.parentElement.parentElement.firstChild.textContent;
            myLibrary = myLibrary.filter(books => books.title !== booktitles);
            window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
        });

        let readingBtn = document.createElement("button");
        btnDiv.appendChild(readingBtn);
        bookCard.appendChild(btnDiv);
        readingBtn.classList.add("read");
        if (book.isRead === false) {
            console.log(book.isRead)
            readingBtn.classList.toggle("unread");
            readingBtn.textContent = "Unread";
        } else {
            readingBtn.textContent = "Read";
        }

        btnDiv.appendChild(deleteBtn);

        readingBtn.addEventListener('click', (e) => {
            console.log(e);
            if (e.target.classList.value.includes("unread")) {
                readingBtn.classList.toggle("unread");
                readingBtn.textContent = "Read";
            } else {
                readingBtn.classList.toggle("unread");
                readingBtn.textContent = "Unread";
            }
            // console.log(e.target.classList.value.includes("unread"));
        })
  
}


function checkBookExistsAlready(bookTitle){
    console.log(myLibrary);
    let exists = false;
    myLibrary.forEach(books => {
        // console.log(`compare ${bookTitle} and ${books.title}`);
        if (bookTitle.value === books.title) {
            exists = true;
        }
    })
    return exists;
    
}


function addNewBooks() {
    let bookTitle = document.getElementById("btitle");
    if (!checkBookExistsAlready(bookTitle)) {
        let checkbox = document.getElementById("checkboxRead");
        let hasRead = false;
        if (checkbox.checked === true) {
            hasRead = true;
        }
        
        let author = document.getElementById("author");
        let noPages = document.getElementById("pages");
        
        let book = addBookToLibrary(author.value, bookTitle.value, noPages.value, hasRead);
        // getAllBooks(myLibrary);
        addBook(book);
        console.log(myLibrary);
        window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        // myLibraryStorage = JSON.parse(window.localStorage.getItem('myLibrary'));
        // console.log(myLibraryStorage);
        
    } else {
        console.log("exist");
        alert("Book already exists in database!");
    }
    // console.log(window.localStorage.getItem('myLibrary'));
}

function removeAll() {
    window.localStorage.clear();
    myLibContainer.innerHTML = '';
    myLibrary = [];
    console.log(myLibrary);
}

submitBtn.addEventListener('click', addNewBooks);
removeAllBtn.addEventListener('click', removeAll);

// getAllBooks(myLibrary);