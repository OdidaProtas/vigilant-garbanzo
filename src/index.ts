import "dotenv/config";
import axios from "axios";

import { constants } from "./constants";
import { storage, xml, urls } from "./util";

import { handleException } from "./util/handleException";

import { CloudFormationCustomResourceEvent } from "aws-lambda";
import { TOutput } from "../types";

const {
  PRODUCTS_URL,
  BRANDS_URL,
  COLLECTIONS_URL,
  MAIN_CATEGORIES_URL,
  SUB_CATEGORIES_URL,
  CHILD_CATEGORIES_URL,
} = constants;

export const handler = async (
  event: CloudFormationCustomResourceEvent
): Promise<TOutput> => {
  const productsRequest = axios.get(PRODUCTS_URL);
  const mainCategoriesRequest = axios.get(MAIN_CATEGORIES_URL);
  const subCategoriesRequest = axios.get(SUB_CATEGORIES_URL);
  const collectionsRequest = axios.get(COLLECTIONS_URL);
  const brandsRequest = axios.get(BRANDS_URL);
  const childCategoriesRequest = axios.get(CHILD_CATEGORIES_URL);

  const [products] = await handleException(productsRequest);
  const [mainCategories] = await handleException(mainCategoriesRequest);
  const [subCategories] = await handleException(subCategoriesRequest);
  const [collections] = await handleException(collectionsRequest);
  const [brands] = await handleException(brandsRequest);
  const [childCategories] = await handleException(childCategoriesRequest);

  const productsXML = xml.create(products, urls.product);
  const mainCategoriesXml = xml.create(mainCategories, urls.mainCategory);
  const subCategoriesXml = xml.create(subCategories, urls.subCategory);
  const collectionsXml = xml.create(collections, urls.collections);
  const brandsXml = xml.create(brands, urls.brands);
  const childCategoriesXml = xml.create(childCategories, urls.childCategory);

  const saveProductsDoc = storage.products(productsXML);
  const saveMainCategoriesDoc = storage.mainCategories(mainCategoriesXml);
  const saveCollectionsDoc = storage.collections(collectionsXml);
  const saveBrandsDoc = storage.brands(brandsXml);
  const saveSubCategoriesDoc = storage.subCategories(subCategoriesXml);
  const saveChildategoriesDoc = storage.childCategories(childCategoriesXml);

  const [productsSitemap] = await handleException(saveProductsDoc);
  const [mainCategoriesSitemap] = await handleException(saveMainCategoriesDoc);
  const [subCategoriesSitemap] = await handleException(saveSubCategoriesDoc);
  const [brandsSitemap] = await handleException(saveBrandsDoc);
  const [collectionsSitemap] = await handleException(saveCollectionsDoc);
  const [childCategoriesSitemap] = await handleException(saveChildategoriesDoc);

  const output = {
    products: {
      url: productsSitemap,
      doc: productsXML,
    },
    mainCategories: {
      url: mainCategoriesSitemap,
      doc: mainCategoriesXml,
    },
    subCategories: {
      url: subCategoriesSitemap,
      doc: subCategoriesXml,
    },
    brands: {
      url: brandsSitemap,
      doc: brandsXml,
    },
    collections: {
      url: collectionsSitemap,
      doc: collectionsXml,
    },
    childCategories: {
      url: childCategoriesSitemap,
      doc: childCategoriesXml,
    },
  };

  return output;
};
