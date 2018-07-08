import React, { Component } from "react";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Header />
        <Nav />
        <Row>
          <Col size="md-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <div class="card mb-4 box-shadow">
                    <img src={book.image} alt={book.title} class="img-thumbnail"></img>
                    
                    <div class="card-body">
                      <strong class="card-text">
                        {book.title}  
                      </strong>
                      <p class="card-text">
                      <i class="fas fa-map-marker-alt"></i> {book.location}<br/>
                      <i class="fas fa-dollar-sign"></i> {book.price}/hr
                      </p>
                    
                    <Link to={"/books/" + book._id}>

                      <button type="button" class="btn btn-sm btn-outline-secondary align-center">Learn More</button>

                    </Link>
                    </div>

  
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No items to rent. Check back later.</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;