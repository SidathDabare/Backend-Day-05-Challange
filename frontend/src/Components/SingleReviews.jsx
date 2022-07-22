/** @format */

import React, { useEffect, useState } from "react"

import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

const ReviewsCompnents = ({ product_Id }) => {
  //const [products, setProducts] = useState({})
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState("")
  const [rate, setRate] = useState("")
  const [productId, setProductId] = useState("")

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getReviews = async () => {
    let url = `http://localhost:3001/products/reviews/${product_Id}`
    try {
      let res = await fetch(url)
      let data = await res.json()
      //console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const addReviews = async () => {
    let url = `http://localhost:3001/products/reviews`
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          comment: comment,
          rate: rate,
          productId: product_Id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      let data = await res.json()
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addReviews()
  }

  useEffect(() => {
    //setProducts(location.state.productItem)
    getReviews().then((review) => {
      //console.log(review)
      setReviews(review)
    })
  }, [product_Id])
  return (
    <>
      <ListGroup>
        {reviews && reviews.length > 0 ? (
          reviews.map((review, i) => (
            <ListGroup.Item key={i}>
              {" "}
              <span>{review.comment}</span>
              <span></span>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No review</ListGroup.Item>
        )}
      </ListGroup>
      <Button variant='primary' onClick={handleShow}>
        + Add Your Feedback
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='d-flex'>
              <Form.Group className='mb-3 col-9' controlId='formBasicEmail'>
                <Form.Label>Add Cooment</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Comment'
                  className='my-1'
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3 col-3' controlId='formBasicEmail'>
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='0'
                  className='my-1'
                  onChange={(e) => setRate(e.target.value)}
                />
              </Form.Group>
            </div>

            <Button variant='primary' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewsCompnents
