import React, { useState } from "react";
import API from "../../utils/API";
import axios from "axios";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    let API_URL = `https://www.googleapis.com/books/v1/volumes`;

    const fetchBooks = async () => {
        // Ajax call to API using Axios
        const result = await axios.get(`${API_URL}?q=${searchTerm}`);
        // Books result
        setBooks(result.data);
        console.log(result.data);
    }

    const [books, setBooks] = useState({ items: [] });

    // Submit handler
    const onSubmitHandler = (e) => {
        // Prevent browser refreshing after form submission
        e.preventDefault();
        // Call fetch books async function
        fetchBooks();
    }

    const bookAuthors = authors => {
        if (authors.length <= 2) {
          authors = authors.join(' and ');
        } else if (authors.length > 2) {
          let lastAuthor = ' and ' + authors.slice(-1);
          authors.pop();
          authors = authors.join(', ');
          authors += lastAuthor;
        }
        return authors;
      };
    
    return(
        <div>
        <div style={{backgroundColor: "black", margin: "0 0 40px 0"}}>
            <h2 style={{color: "white", padding: "40px 40px 0px 40px"}}>Search</h2>
            <form onSubmit={onSubmitHandler}>
            <div style={{ padding: "0px 40px 85px 40px"}} className="input-group mb-3">
                <input style={{ backgroundColor: "black", color: "white"}} type="search" value={searchTerm} onChange={onInputChange} className="form-control" placeholder="Search by Book Title, Author, or Genere" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-light" type="submit" id="button-addon2"><i className="fas fa-search"></i></button>
                </div>
            </div>
            </form>
        </div>
            <ul>
                {
                books.items.map((book, index) => {
                    console.log(book);
                    return (
                        <div className="container" key={index}>
                            <div className="row">
                                <div className="col-md-3">
                                    <img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                                </div>
                                <div className="col-md-9">
                                    <div style={{maxHeight: "200px", overflow: "auto", margin: "0 0 10px 0"}}>
                                        <h3>{book.volumeInfo.title}</h3>
                                        <p>{book.volumeInfo.authors ? bookAuthors(book.volumeInfo.authors) : ''}</p>
                                        <p>{book.volumeInfo.description}</p>
                                    </div>
                                    <div>
                                        <a rel="noreferrer noopener" target="_blank" href={book.volumeInfo.infoLink}>Book Info</a>
                                        <a rel="noreferrer noopener" style={{margin: "0 0 0 20px"}} target="_blank" href={book.saleInfo.buyLink}>
                                            {book.saleInfo.isEbook ? 'Buy Book' : ''}
                                        </a>
                                        <button onClick={ (event) =>{
                                                event.preventDefault();
                                                if (book.volumeInfo.title) {
                                                    API.saveBook({
                                                    title: book.volumeInfo.title,
                                                    author: bookAuthors(book.volumeInfo.authors),
                                                    description: book.volumeInfo.description,
                                                    imgLink: `http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
                                                    buyLink: book.saleInfo.buyLink,
                                                    infoLink: book.volumeInfo.infoLink
                                                    })
                                                    .then()
                                                    .catch(err => console.log(err));
                                                }
                                             }
                                        } style={{margin: "0 0 0 20px"}} type="button" className="btn btn-dark">Save Book</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    );
                })
                }
            </ul>
        </div>
    );
}

export default Search;
