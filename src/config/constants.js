/*
 * @Author: Matheus Rezende
 * @Date: 2018-07-20 12:26:04
 * @Last Modified by: matheus.rezende
 * @Last Modified time: 2018-12-16 08:45:37
 */
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
};

export default {
  ...config,
};
