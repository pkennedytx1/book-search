import React from "react";
import DeleteBtn from "../Delete";
import API from "../../utils/API";
import { List, ListItem } from "../List";

class Saved extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
          .then(res =>
            this.setState({ books: res.data, title: "", author: "", description: "", imgLink: "", infoLink: "", buyLink: ""})
          )
          .catch(err => console.log(err));
    };
    
    deleteBook = id => {
    API.deleteBook(id)
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };

    render() {
        return(
            <div>
            <h1 style={{padding: "40px", color: "white", backgroundColor: "black"}}>Saved Books</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                      <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <img alt={`${book.title} book`} src={book.imgLink} />
                                </div>
                                <div className="col-md-9">
                                    <div style={{maxHeight: "200px", overflow: "auto", margin: "0 0 10px 0"}}>
                                        <h3>{book.title}</h3>
                                        <p>{book.author}</p>
                                        <p>{book.description}</p>
                                    </div>
                                    <div>
                                        <a rel="noreferrer noopener" target="_blank" href={book.infoLink}>Book Info</a>
                                        <a rel="noreferrer noopener" style={{margin: "0 0 0 20px"}} target="_blank" href={book.buyLink}>{!book.buyLink ? '' : 'Buy Book'}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Saved Books to Display</h3>
            )}
            </div>
        )

    }
}

export default Saved;