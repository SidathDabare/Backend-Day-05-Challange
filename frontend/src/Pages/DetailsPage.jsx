/** @format */

import React, { useState } from "react"
import MyNavbar from "../Components/MyNavbar"
import Container from "react-bootstrap/Container"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ReviewsCompnents from "../Components/SingleReviews"

const DetailsPage = () => {
  const [products, setProducts] = useState({})

  const location = useLocation()

  useEffect(() => {
    setProducts(location.state.productItem)
  }, [])
  return (
    <div>
      <MyNavbar />
      <Container className='d-flex col-12 mt-3'>
        <Card className='d-flex col-6'>
          <Card.Img variant='top' src={products.imageUrl} />

          <Card.Body>
            <Card.Title>{products.name}</Card.Title>
            <Card.Text>{products.description}</Card.Text>
            <h3>${products.price}</h3>
          </Card.Body>
        </Card>
        <Card className='d-flex flex-colum justify-content-between col-6'>
          <ReviewsCompnents product_Id={products.id} />
        </Card>
      </Container>
    </div>
  )
}

export default DetailsPage
