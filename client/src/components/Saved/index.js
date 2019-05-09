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
            <h1>Saved Books</h1>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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