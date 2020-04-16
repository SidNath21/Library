let library = [];

const submit = document.querySelector("#submit");
const form = document.querySelector("#bookForm");
const booksContainer = document.querySelector("#booksContainer");
const header = document.querySelector("#header");

submit.addEventListener("click", addBookToLibrary);

createHeading();
createSampleBook();

function addBookToLibrary(){
    const title = form.elements["title"].value;
    const author = form.elements["author"].value;
    const pages = form.elements["pages"].value;
    const read = form.elements["read"].checked;

    if(emptyBook(title, author, pages)) console.log("empty")
    if(containsBook(title, author)) return;
    
    library.push(new Book(title, author, pages, read, false));

    updateLibrary();

}


function Book(title, author, pages, read, rendered){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rendered = rendered
}

function emptyBook(title, author, pages){
    return (title == "" || author == "" || pages == null)
}
function containsBook(title, author){

    for(let i=0; i<library.length; i++){
        let bookTitle = library[i].title;
        let bookAuthor = library[i].author;

        if(bookTitle === title && bookAuthor === author) return true;

    }

    return false;
}

function printLibrary(){
    for(let i=0; i<library.length; i++){
        console.log(library[i].title + " by " + library[i].author 
        + " ( " + library[i].pages + " pages, completed book : " + library[i].read + " )");
    }
}

function updateLibrary(){
    for(let i=0; i<library.length; i++){

        if(!library[i].rendered){

            library[i].rendered = true;

            let bookTitle = library[i].title;
            let bookAuthor = library[i].author;
            let bookPages = library[i].pages;
            let bookStatus = library[i].read;

            const book = document.createElement("div");
            book.classList = "bookList";
            book.value = i;

            const title = document.createElement("div");
            title.classList = "title";
            title.textContent = bookTitle;

            const author = document.createElement("div");
            author.classList = "author";
            author.textContent = bookAuthor;

            const pages = document.createElement("div");
            pages.classList = "pages";
            pages.textContent = bookPages;

            const status = document.createElement("div");
            status.classList = "status";
            status.textContent = (bookStatus == true) ? "Completed" : "In Progress"; 

            book.appendChild(title);
            book.appendChild(author);
            book.appendChild(pages);
            book.appendChild(status);
            booksContainer.appendChild(book);
        }

    }
}

function createHeading(){

   
    const title = document.createElement("div");
    title.classList = "title";
    title.textContent = "Title";

    const author = document.createElement("div");
    author.classList = "author";
    author.textContent = "Author";

    const pages = document.createElement("div");
    pages.classList = "pages";
    pages.textContent = "Pages";

    const status = document.createElement("div");
    status.classList = "status";
    status.textContent = "Status";

    header.appendChild(title);
    header.appendChild(author);
    header.appendChild(pages);
    header.appendChild(status);
    
}

function createSampleBook(){

    const title = "Title";
    const author = "Author";
    const pages = "100";
    const read = true;

   
    library.push(new Book(title, author, pages, read, false));

    updateLibrary();


}