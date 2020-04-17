let library = [];

const submit = document.querySelector("#submit");
const form = document.querySelector("#bookForm");
const booksContainer = document.querySelector("#booksContainer");
const header = document.querySelector("#header");

submit.addEventListener("click", addBookToLibrary);

createHeading();
//createSampleBook();

function addBookToLibrary(){
    const title = form.elements["title"].value;
    const author = form.elements["author"].value;
    const pages = form.elements["pages"].value;
    const read = form.elements["read"].checked;

    if(emptyBook(title, author, pages)) return;
    if(containsBook(title, author)) return;
    
    library.push(new Book(title, author, pages, read, false));

    updateLibrary();

    updateData();

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
            const statusButton = document.createElement("button");
            statusButton.classList = "statusButton";
            statusButton.textContent = (bookStatus == true) ? "Yes" : "No"; 
            status.appendChild(statusButton);
           

            statusButton.addEventListener("click", function(){
                let text = statusButton.textContent;
                statusButton.textContent = (text == "Yes") ? "No" : "Yes"; 
                library[this.parentElement.parentElement.value].bookStatus == (statusButton.textContent == "Yes") ? true : false;
                updateData();
            });
            
            
            const deleteBook = document.createElement("div");
            deleteBook.classList = "delete";
            const deleteButton = document.createElement("button");
            deleteButton.classList = "deleteButton";
            deleteButton.textContent = "X";
            deleteBook.appendChild(deleteButton);
            
            deleteButton.addEventListener("click", function(){
                book.parentNode.removeChild(book);
                delete_book(i);
            });
            
            book.appendChild(title);
            book.appendChild(author);
            book.appendChild(pages);
            book.appendChild(status);
            book.appendChild(deleteBook);
            booksContainer.appendChild(book);

        }

    }

    updateData();
}

function delete_book(index){
    
    library.splice(index, 1);
    updateLibrary();

    updateData();
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
    status.textContent = "Read?";

    const deleteBook = document.createElement("div");
    deleteBook.classList = "delete";
    deleteBook.textContent = "Delete";
    


    header.appendChild(title);
    header.appendChild(author);
    header.appendChild(pages);
    header.appendChild(status);
    header.appendChild(deleteBook)
    
}

function createSampleBook(){

    const title = "The Hobbit";
    const author = "J.R.R Tolkein";
    const pages = "310";
    const read = true;

    library.push(new Book(title, author, pages, read, false));

    updateLibrary();
    updateData();


}

function updateData(){
    localStorage.setItem("library",JSON.stringify(library));
}
  
  
  window.onload=function(){
    
    if(localStorage.getItem("library")==null){

      createSampleBook();  
      localStorage.setItem("library",JSON.stringify(library));

    }else{
      let data=JSON.parse(localStorage.getItem("library"));
      console.log(data);
      for(let i=0;i<data.length;i++){
        let obj=data[i];
        library.push(new Book(obj.title,obj.author,obj.pages,obj.read,obj.color));
      }
      updateLibrary();
    }
  }