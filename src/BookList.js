import React, { Component } from "react";
import axios from "axios";
// Components

import SearchBar from "./SearchBar";
import Loading from "./Loading";
import BookRow from "./BookRow";
import { faBookDead } from "@fortawesome/free-solid-svg-icons";
import BookTable from "./BookTable";
class BookList extends Component {
  state = {
    filteredBooks: this.props.books,
    filterBooksColor: []
  };

  filterBooks = query => {
    query = query.toLowerCase();
    let filteredBooks = this.props.books.filter(book =>
      `${book.title}`.toLowerCase().includes(query)
    );
    this.setState({ filteredBooks: filteredBooks });
  };

  filterBooksColor = color => {
    if (color) {
      let filteredBooks = this.props.books.filter(book => book.color === color);

      this.setState({ filteredBooks: filteredBooks });
    } else {
      this.setState({ filteredBooks: this.props.books });
    }
  };

  componentDidUpdate(prevState) {
    if (
      prevState.match.params.bookColor !== this.props.match.params.bookColor
    ) {
      this.filterBooksColor(this.props.match.params.bookColor);
    }
  }
  render() {
    return (
      <div>
        <h1>Books</h1>
        <SearchBar onChange={this.filterBooks} />

        <BookTable books={this.state.filteredBooks} />
      </div>
    );
  }
}

export default BookList;
