/** @format */

import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import Navbar from "react-bootstrap/Navbar"
import { useEffect } from "react"

const MyNavbar = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addProduct = async () => {
    let url = `http://localhost:3001/products/`
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          brand: brand,
          imageUrl: image,
          price: price,
          category: category,
          description: description,
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
    addProduct()
  }

  useEffect(() => {
    //console.log(name)
  }, [])
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Shop</Navbar.Brand>
        <Button variant='primary' onClick={handleShow}>
          + Add New Product
        </Button>
      </Container>
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
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='Name'
                className='my-1'
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                type='text'
                placeholder='Brand'
                className='my-1'
                onChange={(e) => setBrand(e.target.value)}
              />
              <Form.Control
                type='text'
                placeholder='Image Url'
                className='my-1'
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type='text'
                placeholder='Price'
                className='my-1'
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Control
                type='text'
                placeholder='Category'
                className='my-1'
                onChange={(e) => setCategory(e.target.value)}
              />
              <Form.Control
                as='textarea'
                rows={3}
                type='textarea'
                placeholder='Descrption'
                className='my-1'
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  )
}

export default MyNavbar
