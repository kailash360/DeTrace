// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeTrace {

  enum Role{
    manufacturer,
    retailer,
    customer,
    not_registered
  }

  enum Stage{
    manufactured,
    released,
    sold
  }

  struct Product{
    uint256 id;
    string name;
    uint price;
    string ipfs_hash;
    Stage stage;
    address manufacturer;
    uint total_retailers;
    address customer;
  }

  struct Manufacturer{
    address id;
    string name;
  }

  struct Retailer{
    address id;
    string name;
  }

  struct Customer{
    address id;
    string name;
  }

  uint256 public total_products;
  Product[] public products;
  mapping(address => Manufacturer) public manufacturers;
  mapping(address => Retailer) public retailers;
  mapping(address => Customer) public customers;
  mapping(uint => address[]) public Product_Retailers;

  address[] address_array;

  event DeTrace_deployed(string _message);
  event Product_Added(uint _productId,address _manufacturerAddress);
  event Product_Released(uint _productId, address _manufacturerAddress, address _retailerAddress);
  event Product_Sold(uint _productId, address _retailerAddress, address _customerAddress);

  constructor(){
    total_products = 0;
    emit DeTrace_deployed('DeTrace has been deployed');
  }

  modifier isManufacturer(address _manufacturerAddress){
    require(manufacturers[_manufacturerAddress].id != address(0x0), 'Only manufacturers can perform this action');
    _;
  }

  modifier isRetailer(address _retailerAddress){
    require(retailers[_retailerAddress].id != address(0x0), 'Only retailers can perform this action');
    _;
  }

  modifier isCustomer(address _customerAddress){
    require(customers[_customerAddress].id != address(0x0), 'Only customers can perform this action');
    _;
  }

  function addManufacturer(string memory _name) public payable returns (Manufacturer memory){
    
    require(bytes(manufacturers[msg.sender].name).length == 0 , 'This address is already registered as manufacturer');

    Manufacturer memory _manufacturer;
    _manufacturer.id = msg.sender;
    _manufacturer.name = _name;

    manufacturers[msg.sender] = _manufacturer;

    return _manufacturer;
  }

  function addRetailer(string memory _name) public payable returns (Retailer memory){
    
    require(bytes(retailers[msg.sender].name).length == 0 , 'This address is already registered as retailer');

    Retailer memory _retailer;
    _retailer.id = msg.sender;
    _retailer.name = _name;

    retailers[msg.sender] = _retailer;

    return _retailer;
  }  

  function addCustomer(string memory _name) public payable returns (Customer memory){
    
    require(bytes(customers[msg.sender].name).length == 0 , 'This address is already registered as retailer');

    Customer memory _customer;
    _customer.id = msg.sender;
    _customer.name = _name;

    customers[msg.sender] = _customer;

    return _customer;
  }

  function addProduct(string memory _name, uint _price, string memory _ipfs_hash) public isManufacturer(msg.sender) payable returns(Product memory){

    require(manufacturers[msg.sender].id != address(0), 'Only manufacturers can add product');

    //get the manufacturer
    Manufacturer memory _manufacturer = manufacturers[msg.sender];
    
    //create the product
    Product memory _product;
    _product.id = total_products;
    _product.name = _name;
    _product.price = _price;
    _product.ipfs_hash = _ipfs_hash;
    _product.manufacturer = _manufacturer.id;
    _product.stage = Stage.manufactured;
    _product.total_retailers = 0;

    //add the product
    products.push(_product);
    total_products += 1;

    //Add into proper mappings
    Product_Retailers[_product.id] = address_array;

    emit Product_Added(_product.id, msg.sender);

    return _product;
  }

  function releaseProduct(uint _productId) public isRetailer(msg.sender) payable returns (Product memory){

    require(_productId < total_products,'Product does not exist');

    //Get the product
    Product memory _product = products[_productId];

    //check if the product has already been released or manufactured
    require(_product.stage == Stage.manufactured, 'Product has been released or sold');

    //Shift ownership from manufacturer to retailer
    Product_Retailers[_productId].push(msg.sender);
    _product.total_retailers++;
    _product.stage = Stage.released;

    //save the updated product details
    products[_productId] = _product;

    emit Product_Released(_productId, _product.manufacturer, msg.sender);

    return _product;
  }

  function buyProduct(uint _productId) public isCustomer(msg.sender) payable returns (Product memory){
    require(_productId < total_products,'Product does not exist');

    //Get the product
    Product memory _product = products[_productId];

    //check if the product has already been released or manufactured
    require(_product.stage == Stage.released, 'Product has not been released or has been already sold');

    //Get the details of the retailer who is selling
    address _retailerId = Product_Retailers[_product.id][_product.total_retailers - 1];
    Retailer memory _retailer = retailers[_retailerId];
    
    //Get the details of the customer
    Customer memory _customer = customers[msg.sender];

    //Shift ownership from retailer to customer
    _product.stage = Stage.sold;
    _product.customer = _customer.id;

    //save the updated product details
    products[_productId] = _product;

    emit Product_Sold(_productId, _retailer.id, msg.sender);
  
    return _product;
  }

  function getManufacturerDetails(address _manufacturerId) public view returns(Manufacturer memory){
    Manufacturer memory _manufacturer = manufacturers[_manufacturerId];
    return _manufacturer;
  }

  function getRetailerDetails(address _retailerId) public view returns(Retailer memory){
    Retailer memory _retailer = retailers[_retailerId];
    return _retailer;
  }

  function getCustomerDetails(address _customerId) public view returns(Customer memory){
    Customer memory _customer = customers[_customerId];
    return _customer;
  }

  function getProductDetails(uint _productId) public view returns(Product memory, Retailer[] memory, Manufacturer memory, Customer memory){
    //Get the product
    Product memory _product = products[_productId];

    //Get all the retailers addresses
    address[] memory _retailer_addresses = Product_Retailers[_productId];

    //Initialize an empty reailters array
    Retailer[] memory _retailers;

    //Get the manufacturer
    Manufacturer memory _manufacturer = getManufacturerDetails(_product.manufacturer);

    //Get the customer
    Customer memory _customer = getCustomerDetails(_product.customer);

    //Push all the retailers in the _retailers array
    for (uint256 i = 0; i < _retailer_addresses.length; i++) {
      _retailers[i] = getRetailerDetails(_retailer_addresses[i]);
    }
    return (_product, _retailers, _manufacturer, _customer);
  }

  function getCurrentStatus(uint _productId) public view returns (Stage, address, Manufacturer memory, Customer memory, Retailer memory ) {
    //Initilize an empty address for owner
    address _owner_address;

    //Get product details
    Product memory _product = products[_productId];

    //Get product stage
    Stage _stage = _product.stage;

    //Instantiate each user
    Manufacturer memory _manufacturer;
    Customer memory _customer;
    Retailer memory _retailer;

    //Check for each stage
    if(_stage == Stage.manufactured){
      _owner_address = _product.manufacturer;
      _manufacturer = getManufacturerDetails(_owner_address);
    } else if(_stage == Stage.sold) {
      _owner_address = _product.customer;
      _customer = getCustomerDetails(_owner_address);
    } else {
      _owner_address = Product_Retailers[_productId][_product.total_retailers - 1];
      _retailer = getRetailerDetails(_owner_address);
    }
    return (_stage, _owner_address, _manufacturer, _customer, _retailer);
  }

  function getUserType(address _user) public view returns (Role){

    if(manufacturers[_user].id != address(0x0)) return Role.manufacturer;

    if(retailers[_user].id != address(0x0)) return Role.retailer;

    if(customers[_user].id != address(0x0)) return Role.customer;

    return Role.not_registered;
  }
}

