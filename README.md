

# DeTrace

**DeTrace** is a decentralized supply chain management system that allows you to efficiently manage the product distribution chain efficiently yet easily. 

### 💫 How it works
- It begins at the root level where the manufacturer registers a product with the system. When the product is released in the market, it is sold to a retailer for a predefined price. A customer can then purchase this product from the retailer. All of these transactions are recorded in the blockchain and this makes the product flow more transparent. 
- The entire history of a product is also displayed to the users, where they can see how the product has been handed along since the product was manufactured. This prevents the introduction of counterfeit products in the market. This can be especially useful for keeping track of medicines and branded products.
- It also allows the users to commit financial transactions via Ethereum blockchain network. This makes the entire trade and commerce more secure and safe. 
- The entire process of supply chain management is made digital which makes the operations and logistics run smoothly

### Setting up locally

- Clone the repository and install dependencies in the client using the following command 
```sh
cd client && npm install --dev
```

- Compile the contracts and deploy on **Ganache** lcoal testnet
```sh
truffle deploy --reset
```

- Start the client side
```
npm start
```

### 🛠️ Technology & Tools
- Solidity
- Web 3.0
- IPFS
- ReactJS
- Material UI
