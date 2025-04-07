/*export class Product {
    id: number = 0;
    product_name!: string;
    product_price!: number;
    product_description!: string;
    image: string = ""; // Empty array


}
*/


export class Product {
    id: number = 0;
    name!: string; // Changed from product_name to name (to match Spring Boot entity)
    price!: number; // Changed from product_price to price
    description!: string; // Changed from product_description to description
    imageUrl!: string; // This will hold the Base64-encoded image from the backend
  }