export enum CATEGORY {
  FEATURED_CATEGORIES = 'api/featured-categories',
  FEATURED_PRDUCT_CATEGORIES = 'api/guest/featured-products-categories',
  GUEST = 'api/guest/products-categories',
  MIN = 'api/guest/products-categories-min',
  POPULAR_CATEGORIES = 'api/guest/popular-products-categories',
  ALL_CATEGORIES = 'api/guest/products-categories',
  ALL_CATEGORIES_ON_DEMAND = 'api/products-categories/on-demand',
}

export enum PRODUCT {
  POPULAR_PRODUCTS = 'api/top-products',
  LATEST_PRODUCTS = 'api/latest-products',
  PRODUCT_DETAILS = 'api/products/',
  PRODUCT_GUEST_DETAILS = 'api/guest/products/',
  PRODUCT = 'api/products',
  ENQUIRE = 'api/buyer-requirements',
  APPROVED_PRODUCTS_BY_SELLER = 'api/guest/products/by-seller/',
  RELATED_PRODUCTS_BY_PRODUCT_ID = 'api/guest/products/by-seller-related/',
  FEATURED_PRODUCTS_BY_SELLER = 'api/featured-products/by-seller/',
}

export enum OFFER {
  LATEST_OFFERS = 'api/guest/offers',
}

export enum BANNER {
  GUEST = 'api/guest/banners',
  GET_BANNER_BY_PAGE_NAME = 'api/guest/banners-by-webpagename',
  BANNER_BY_KEYWORD = 'api/keywords-banner',
}

export enum IMAGE {
  IMAGE = 'api/images/',
}

export enum BLOG {
  GUEST = 'api/guest/blogs',
  FILTER = 'api/guest/filter-blogs',
  CATEGORIES = 'api/guest/blog-categories',
  GUEST_BY_TITLE = 'api/guest/blogs-by-title',
  GUEST_FEATURED = 'api/guest/featured-blogs',
}

export enum LOGIN {
  SEND_OTP = 'api/otps',
  USER_EXISTS = 'api/guest/users/',
  AUTHENTICATE_OTP = 'api/authenticate-otp',
  OTP_REGISTER = 'api/register-otp',
  HISTORY = 'api/user-login-histories',
  AUTHENTICATE_SOCIAL = 'api/authenticate-social',
  REGISTER_SOCIAL = 'api/register-social',
  AUTHENTICATE = 'api/authenticate',
  BROWSING_HISTORY = 'api/user-browsing-history-group',
  PRODUCT_HISTORY = 'api/user-product-history-group',
}

export enum SELLER {
  REQUIRMENTS = 'api/requirements-by-seller/',
  ENQUIRIES = 'api/enquiries-by-seller/',
  PRODUCTS_SERVICES = 'api/products/by-seller-all/',
  BY_LOGIN = 'api/users',
  PARTIAL_UPDATE = 'api/sellers-partial-update',
  GUEST_BY_LOGIN = 'api/guest/seller-users/',
  OFFER = 'api/offers',
  USER_PARTIAL_UPDATE = 'api/users-partial-update',
  BY_COMPANY_NAME = 'api/guest/search-sellers-company-name/',
  STATS = 'api/seller-stats/',
  TEMP_SELLER = 'api/temp-sellers/',
}

export enum BUYER {
  ENQUIRIES = 'api/enquiries-by-buyer/',
  REQUIRMENTS = 'api/user-buyer-requirements/',
}

export enum SEARCH {
  BY_SEARCH = 'api/search-suggestions',
  PRODUCTS = 'api/new-search-products',
  PACKAGE_PRODUCTS = 'api/search-package-products',
  SUBCATEGORY_BY_ID = 'api/guest/products-subcategories/',
}

export enum PACKAGES {
  SERVICE_PACKAGES = 'api/service-packages',
}

export enum ENQUIRY {
  COMPANY_ENQUIRY = 'api/enquiries',
}

export enum KEYWORD {
  UPDATE_KEYWORD = 'api/guest/keywords',
  BY_NAME = 'api/keywords-by-name',
}

export enum LEAD {
  BY_SEARCH = 'api/filter-published-enquiries',
  ADD_ENQUIRY = 'api/add-enquiry-to-seller',
}

export enum USER {
  REGISTER = 'api/register',
  CHANGE_PASSWORD = 'api/account/change-password',
  FORGOT_PASSWORD = 'api/account/reset-password/init',
  EMAIL_VERIFICATION = 'api/activate-updated-mail',
}

export enum JOBS {
  JOB_PORTAL = 'api/job-portals',
  GUEST_JOB_PORTAL = 'api/guest/job-portals',
  FILTER_JOB = 'api/guest/filter-jobs',
  APPLY_JOB = 'api/job-applicants',
  SELLER_JOB = 'api/jobs-by-seller',
  BUYER_JOB = 'api/job-by-applicant',
  JOB_APPLICANTS_BY_JOBID = 'api/job-applicants-by-job',
  JOB_CATEGORIES = 'api/job-categories',
}

export enum BUSINESS {
  CLAIM = 'api/guest/claim-businesses',
}

export enum DOCUMENTS {
  ADD = 'api/document-files',
}

export enum SALES {
  ORDER = 'api/sales-orders/by-seller',
}

export enum BLINDKEYWORDS {
  BLIND_KEYWORD = 'api/guest/blind-keywords',
  BY_NAME = 'api/blind-keywords-by-name',
}
