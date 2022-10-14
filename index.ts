import axios from "axios";

import { handleException } from "./util/handleException";

import { storage, xml, urls } from "./util";
import { constants } from "./constants";

import { TCategory, TOutput, TProduct } from "./types";
import { CloudFormationCustomResourceEvent } from "aws-lambda";

export const handler = async (
  event: CloudFormationCustomResourceEvent
): Promise<TOutput | void> => {
  try {
    const productsRequest = axios.get(constants.PRODUCTS_URL);
    const categoriesRequest = axios.get(constants.CATEGORIES_URL);

    const [productsRes] = await handleException(productsRequest);
    const [categoriesData] = await handleException(categoriesRequest);

    const products: TProduct[] = productsRes?.data?.results ?? [];
    const categories: TCategory[] = categoriesData?.data?.results ?? [];

    const productsXML = xml.create(products, urls.product);
    const categoriesXml = xml.create(categories, urls.category);

    const saveProductsDoc = storage.bin.storeXMLFile(
      productsXML,
      constants.PRODUCTS_FILENAME
    );

    const saveCategoriesDoc = storage.bin.storeXMLFile(
      categoriesXml,
      constants.CATEGORIES_FILENAME
    );

    const [productsUrl] = await handleException(saveProductsDoc);
    const [categoriesUrl] = await handleException(saveCategoriesDoc);

    let output: TOutput = {
      productsUrl,
      categoriesUrl,
    };
    return output;
  } catch (err: any) {
    const error = err.message;
    console.error(error);
  }
};
