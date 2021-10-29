import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetails from "./BookDetails";

import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooks);
  const [bookSelected, setBookSelected] = useState(null)

  if (loading) {
    return <p>Loading Books...</p>;
  }
  if (error) {
    return <p>Error loading books...</p>;
  }
  // console.log(data)
  return (
    <Row xs={1} md={2} className="g-4">
      <Col>
        {data.books.map((book) => (
          <Card
            border="info"
            text="info"
            className="text-center shadow mb-2"
            key={book.id}
            onClick={setBookSelected.bind(this, book.id)}
          >
            <Card.Body>{book.name}</Card.Body>
          </Card>
        ))}
      </Col>

      <Col className="mt-3">
        <BookDetails bookId={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookList;
