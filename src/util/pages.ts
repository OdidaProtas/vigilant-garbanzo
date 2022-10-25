import { TProduct } from "../../types";
import axios from "axios";

async function getAll(url: string) {
  let allProducts: TProduct[] = [];

  let count = 0;
  let page = 1;

  const res = await axios.get(url);

  const products = res.data.results;

  allProducts.concat(products ?? []);

  count = res.data.count;

  while (allProducts.length < count) {
    page++;
    const response = await axios.get(`${url}&page=${page}`);
    allProducts.concat(response.data.results);
  }

  return allProducts;
}

export const pages = { getAll };
