interface Product {
  id: number;
  name: string;
  price: number;
}

function printProduct(product: Product) {
  console.log(product.name);
  console.log(product.price);
}

printProduct({
  id: 1,
  name: "laptop",
  price: 120000,
});
