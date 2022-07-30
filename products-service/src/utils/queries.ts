export const getProductsQuery = `select
  products.id,
  products.title,
  products.description,
  products.image_url,
  products.price,
  stocks.count
  from products join stocks on stocks.product_id = products.id
`;

export const getProductByIdQuery = `
  ${getProductsQuery}
  where products.id = $1
`;

export const createProductQuery = `insert into products
  (title, description, image_url, price)
  values ($1, $2, $3, $4)
  returning *
`;

export const createStockQuery = `insert into stocks
  (product_id, count)
  values ($1, $2)
  returning count
`;
