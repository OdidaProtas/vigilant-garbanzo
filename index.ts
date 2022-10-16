import "dotenv/config";
import axios from "axios";

import { constants } from "./constants";
import { storage, xml, urls } from "./util";

import { TCategory, TOutput, TProduct } from "./types";
import { handleException } from "./util/handleException";

import { CloudFormationCustomResourceEvent } from "aws-lambda";

export const handler = async (
  event: CloudFormationCustomResourceEvent 
): Promise<TOutput | void> => {
  const productsRequest = axios.get(constants.PRODUCTS_URL);
  const mainCategoriesUrl = axios.get(constants.CATEGORIES_URL);

  const [productsRes] = await handleException(productsRequest);
  const [categoriesData] = await handleException(mainCategoriesUrl);

  const products: TProduct[] = productsRes?.data?.results ?? [];
  const mainCategories: TCategory[] = categoriesData?.data?.results ?? [];

  const productsXML = xml.create(products, urls.product);
  const mainCategoriesXml = xml.create(mainCategories, urls.category);

  const saveProductsDoc = storage.products(productsXML);
  const saveMainCategoriesDoc = storage.mainCategories(mainCategoriesXml);

  await handleException(saveProductsDoc);
  await handleException(saveMainCategoriesDoc);
};
