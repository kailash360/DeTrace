import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function ProductCard({ productData }) {

  const navigate = useNavigate()
  const { role } = React.useContext(AuthContext)

  return (
    <Card sx={{ maxWidth: 450, minWidth: 400, maxHeight: 500, minHeight: 350, backgroundColor: '#ff7043', boxShadow: '0 0 10px 0 rgba(0,0,0, 0.5)' }}>
      <CardMedia
        sx={{ backgroundColor: 'white' }}
        component="img"
        alt={productData.name}
        height="250"
        image={`https://ipfs.io/ipfs/${productData.ipfs_hash}`}
      />
      <CardContent>
        <Typography sx={{ color: 'white' }} gutterBottom variant="h5" component="div">
          {productData.name}
        </Typography>
        <Typography sx={{ color: 'white' }} variant="body2" color="text.secondary">
          {productData.price}
        </Typography>
        <Typography sx={{ color: 'white' }} variant="body2" color="text.secondary">
          Manufacture : {productData.manufacturer}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => { navigate(`/${role}/products/${productData.id}`, { replace: true }) }} >Track Product</Button>
      </CardActions>
    </Card>
  );
}
