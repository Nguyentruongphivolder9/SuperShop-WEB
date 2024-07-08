const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: '/products/:nameId',
  category: 'categories/:nameId',
  cart: '/cart',

  // shop channels
  shopChannel: '/shopchannel',
  productManagement: '/shopchannel/portal/product/list',
  productManagementAll: '/shopchannel/portal/product/list/all',
  productManagementActive: '/shopchannel/portal/product/list/live/all',
  productAdd: '/shopchannel/portal/product/new',

  //Email verification.
  emailVerify: '/emailVerify',

  advertiseManagement: '/shopchannel/portal/advertise',
  advertiseAdd: '/shopchannel/portal/advertise/new',

  // admin
  adminSuperShop: '/admin-super-shop',
  adminCategories: '/admin-super-shop/categories'
} as const

export default path
