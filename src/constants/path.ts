import AdvertiseAdd from 'src/pages/Shop/page/AdvertiseManagement/AdvertiseAdd'

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
  productDetail: ':nameId',
  category: 'category',
  cart: '/cart',

  // shop channels
  shopChannel: '/shopchannel',

  productManagement: '/shopchannel/portal/product/list',
  productManagementAll: '/shopchannel/portal/product/list/all',
  productManagementActive: '/shopchannel/portal/product/list/live/all',
  productAdd: '/shopchannel/portal/product/new',
  voucherShop: '/shopchannel/portal/marketing/vouchers/list',
  voucherShopAdd: '/shopchannel/portal/marketing/vouchers/new',

  //Email verification.
  emailVerify: '/emailVerify',

  advertiseManagement: '/shopchannel/portal/advertise',
  advertiseAdd: '/shopchannel/portal/advertise/new'
} as const

export default path
