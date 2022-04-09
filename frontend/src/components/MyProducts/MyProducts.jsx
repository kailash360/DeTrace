import * as React from 'react';
import ProductListTemplate from '../ProductListTemplate/ProductListTemplate';

const productList = [
    {
        name: 'CHakku',
        id: '123',
        price: 200,
        ipfsHash: 'test',
        stage: 'Sold',
        manufacturer: '0xxxx',
        retailerList: ['Oxxx1','Oxxx2' ],
        customer: '0xxx4'
    },
    {
        name: 'CHakku',
        id: '123',
        price: 200,
        ipfsHash: 'test',
        stage: 'Sold',
        manufacturer: '0xxxx',
        retailerList: ['Oxxx1','Oxxx2' ],
        customer: '0xxx4'
    },
    {
        name: 'CHakku',
        id: '123',
        price: 200,
        ipfsHash: 'test',
        stage: 'Sold',
        manufacturer: '0xxxx',
        retailerList: ['Oxxx1','Oxxx2' ],
        customer: '0xxx4'
    },
    {
        name: 'CHakku',
        id: '123',
        price: 200,
        ipfsHash: 'test',
        stage: 'Sold',
        manufacturer: '0xxxx',
        retailerList: ['Oxxx1','Oxxx2' ],
        customer: '0xxx4'
    },
]

const MyProductsList = () => {

  return (
    <ProductListTemplate title={'My Products'} productList={productList} />
  )
}

export default MyProductsList