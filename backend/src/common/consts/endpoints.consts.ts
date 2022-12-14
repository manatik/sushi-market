export const GLOBAL_PREFIXES = {
  AUTH: 'auth',
  ROLE: 'role',
  USER: 'user',
  CATEGORY: 'category',
  SUB_CATEGORY: 'sub-category',
  PRODUCT: 'product',
  PROMOTION: 'promotion',
  INGREDIENT: 'ingredient',
};

export const ENDPOINTS = {
  DEFAULT: {
    ALL: '',
    CREATE: '',
    BY_ID: ':id',
    UPDATE: ':id',
    REMOVE: ':id',
  },
  AUTH: {
    LOGIN: 'login',
    REGISTER: 'register',
    REFRESH: 'refresh',
    IS_AUTH: 'is-auth',
    LOGOUT: 'logout',
  },
  USER: {
    CREATE: '',
    ALL: 'all',
    INFO: 'info',
    BY_ID: ':id',
    UPDATE_SELF: '',
    UPDATE: ':id',
    REMOVE: ':id',
    ADDRESS: 'address',
    ACTIVE_ADDRESS: 'address/active',
    UPDATE_ADDRESS: 'address/:id',
    REMOVE_ADDRESS: 'address/:id',
    ADD_ROLES: 'roles/:id',
    REMOVE_ROLE: 'roles/:id',
  },
  PRODUCT: {
    ALL: '',
    CREATE: '',
    ADD_PHOTOS: 'photos/:id',
    ADD_INGREDIENTS: 'ingredients/:id',
    BY_ID: ':id',
    UPDATE: ':id',
    REMOVE: ':id',
    REMOVE_PHOTO: 'photos/:id',
    REMOVE_INGREDIENT: 'ingredients/:id',
  },
};
