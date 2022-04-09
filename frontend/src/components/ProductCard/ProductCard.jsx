import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function ProductCard({productData}) {

  const navigate = useNavigate()
  const { role } = React.useContext(AuthContext)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={productData.name}
        height="140"
        image={`https://ipfs.io/ipfs/${productData.ipfs_hash}`}
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
        <Button size="small" onClick={(e)=>{navigate(`/${role}/products/${productData.id}`,{replace:true})}} >Track Product</Button>
      </CardActions>
    </Card>
  );
}
