export const GLOBAL_PREFIXES = {
  AUTH: 'auth',
  ROLE: 'role',
  USER: 'user',
  CATEGORY: 'category',
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
  },
};
