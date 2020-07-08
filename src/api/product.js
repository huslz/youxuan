import https from "../https";

export default {
  getProduct(pageNum, pageSize) {
    let params = { pageNum, pageSize };
    return https.fetchGet("/api/manage/product/list", params);
  },
  searchProduct(pageNum, pageSize, attr, key) {
    let params = { pageNum, pageSize, [attr]: key };
    return https.fetchGet("/api/manage/product/search", params);
  },
  updateProductStatus(productId, status) {
    let params = { productId, status };
    return https.fetchPost("/api/manage/product/updateStatus", params);
  },
  addProduct(categoryId, pCategoryId, name, desc, price, detail, imgs) {
    let params = { categoryId, pCategoryId, name, desc, price, detail, imgs };
    return https.fetchPost("/api/manage/product/add", params);
  },
  updateProduct(
    _id,
    categoryId,
    pCategoryId,
    name,
    desc,
    price,
    detail,
    imgs
  ) {
    let params = {
      _id,
      categoryId,
      pCategoryId,
      name,
      desc,
      price,
      detail,
      imgs
    };
    return https.fetchPost("/api/manage/product/update", params);
  }
};
