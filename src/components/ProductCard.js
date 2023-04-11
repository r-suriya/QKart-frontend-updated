import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import "./ProductCard.css";

import Grid from '@mui/material/Grid';

const ProductCard = ({ product, handleAddToCart }) => {
  console.log(product)
  /* let temp = {"name":"Tan Leatherette Weekender Duffle",
  "category":"Fashion",
  "cost":150,
  "rating":4,
  "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  "_id":"PmInA797xJhMIPti"} */
  
    return (
      product.map(productDetail => {
        return(
          <Grid item lg={3} md={6} xs={12}>
        <Card className="card">
  
        {/* <CardMedia
          component="img"
          height="194"
          image={productDetail.image}
        /> */}

        <img src={productDetail.image} alt="alt"/>
        
        
        <CardContent>
          <Typography sx={{ fontSize: 24 }}>
            {productDetail.name}
          </Typography>
  
          <Typography variant="h5">$
            {productDetail.cost}
          </Typography>
  
          <Rating name="read-only" value={productDetail.rating} readOnly />
  
        </CardContent>
  
        <CardActions className="card-actions">
          <Button className="card-button"><AddShoppingCartOutlined/> Add to cart</Button>
        </CardActions>
  
  
      </Card>
      </Grid>
        )

      })
      
    );
    
  };

export default ProductCard;
