import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductCard from '../ProductCard/ProductCard';


const ProductListTemplate = ({ title, productList }) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
        {title}
      </Typography>
      {
        <ListItem>
          <Grid container gap={8} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {productList.map((product, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ProductCard productData={product} />
              </Grid>
            ))}
          </Grid>
        </ListItem>
      }
    </Grid>
  )
}

export default ProductListTemplate