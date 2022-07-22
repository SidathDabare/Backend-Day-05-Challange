/** @format */

import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useState } from "react"
import { useEffect } from "react"

const SingleProduct = ({ product }) => {
  const [productItem, setProductItem] = useState({})
  //   console.log(productItem)
  const navigate = useNavigate()

  useEffect(() => {
    setProductItem(product)
  }, [product])
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant='top' src={productItem.imageUrl} />
      <Card.Body>
        <Card.Title>{productItem.name}</Card.Title>
        <Card.Title>{productItem.brand}</Card.Title>
        <Card.Text>{productItem.category}</Card.Text>
        <Card.Text>{productItem.description}</Card.Text>
        <h3>$ {productItem.price}</h3>
        <Button
          onClick={() => {
            navigate(`/details/${productItem.id}`, {
              state: { productItem },
            })
          }}
          variant='primary'>
          Product Details
        </Button>
        {/* <Link to={`/details/${productItem.id}`}>More Details</Link> */}
      </Card.Body>
    </Card>
  )
}

export default SingleProduct
