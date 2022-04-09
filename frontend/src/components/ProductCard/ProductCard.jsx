import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom' 

export default function ProductCard(productData) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={productData.name}
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name : {productData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price : {productData.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manufacture : {productData.manufacturer}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><Link to={`/products?id=${productData.id}`}>Track Product</Link></Button>
      </CardActions>
    </Card>
  );
}
