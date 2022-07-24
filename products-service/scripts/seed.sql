CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table IF NOT EXISTS products(
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   title text not null,
   description text,
   image_url text,
   price decimal
);

create table IF NOT EXISTS stocks(
	product_id uuid PRIMARY KEY,
	count integer,
	foreign key (product_id) references products(id) ON DELETE CASCADE
);

insert into products (title, description, image_url, price) values
('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 'Your perfect pack for everyday use and walks in the forest.', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', 109.95),
('Mens Casual Premium Slim Fit T-Shirts', 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket.', 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', 22.3),
('Mens Cotton Jacket', 'Great outerwear jackets for Spring/Autumn/Winter.', 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', 55.99),
('Mens Casual Slim Fit', 'The color could be slightly different between on the screen and in practice.', 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', 15.99),
('Solid Gold Petite Micropave', 'Satisfaction Guaranteed.', 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 168),
('Pierced Owl Rose Gold Plated Stainless Steel Double', 'Rose Gold Plated Double Flared Tunnel Plug Earrings.', 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', 10.99),
('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 'Easy upgrade for faster boot up, shutdown, application load and response.', 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', 109),
('Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', '21. 5 inches Full HD (1920 x 1080) widescreen IPS display.', 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', 599),
('Opna Womens Short Sleeve Moisture', '100% Polyester, Machine wash, 100% cationic polyester interlock.', 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg', 7.95),
('Rain Jacket Women Windbreaker Striped Climbing Raincoats', 'Lightweight perfet for trip or casual wear---Long sleeve with hooded.', 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', 39.99)

insert into stocks (product_id, count) values
((SELECT id FROM products LIMIT 1 OFFSET 0), 16),
((SELECT id FROM products LIMIT 1 OFFSET 1), 25),
((SELECT id FROM products LIMIT 1 OFFSET 2), 3),
((SELECT id FROM products LIMIT 1 OFFSET 3), 18),
((SELECT id FROM products LIMIT 1 OFFSET 4), 1),
((SELECT id FROM products LIMIT 1 OFFSET 5), 126),
((SELECT id FROM products LIMIT 1 OFFSET 6), 17),
((SELECT id FROM products LIMIT 1 OFFSET 7), 9),
((SELECT id FROM products LIMIT 1 OFFSET 8), 11),
((SELECT id FROM products LIMIT 1 OFFSET 9), 4)
