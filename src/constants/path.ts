const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  voucher: '/user/voucher-wallet',
  login: '/login',
  register: '/register',
  logout: '/logout',
  product: '/products',
  productDetail: '/products/:nameId',
  category: 'categories/:nameId',
  cart: '/cart',
  recommendationDaily: '/find_similar_products',

  //chat
  chat: '/chat/users',
  conversations: '/chat/conversations',
  conversationDetail: '/chat/conversation/ :conversationId',

  // shop channels
  shopChannel: '/shopchannel',

  productManagement: '/shopchannel/portal/product/list',
  productManagementAll: '/shopchannel/portal/product/list/all',
  productManagementActive: '/shopchannel/portal/product/list/live/all',
  productAdd: '/shopchannel/portal/product/new',
  productEdit: '/shopchannel/portal/product/:nameId',
  voucherShop: '/shopchannel/portal/marketing/vouchers/list',
  voucherShopAdd: '/shopchannel/portal/marketing/vouchers/new',
  voucherShopEdit: '/shopchannel/portal/marketing/vouchers/edit',
  //Email verification.
  emailVerify: '/emailVerify',

  advertiseManagement: '/shopchannel/portal/advertise',
  advertiseAdd: '/shopchannel/portal/advertise/new',

  // admin
  adminSuperShop: '/admin-super-shop',
  adminCategories: '/admin-super-shop/categories'
} as const

export default path
