export const INITIAL_LOGIN_FORM = {
  email: "",
  password: "",
};

export const INITIAL_STATE_LOGIN_FORM = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    _form: [],
  },
};

export const INITIAL_STATE_PROFILE = {
  id: "",
  name: "",
  role: "",
  avatar_url: "",
};

export const INITIAL_CREATE_USER_FORM = {
  name: "",
  role: "",
  avatar_url: "",
  email: "",
  password: "",
};

export const INITIAL_STATE_CREATE_USER = {
  status: "idle",
  errors: {
    email: [],
    name: [],
    role: [],
    avatar_url: [],
    password: [],
    _form: [],
  },
};

export const ROLE_LIST = [
  {
    label: "admin",
    value: "Admin",
  },
  {
    label: "kitchen",
    value: "Kitchen",
  },
  {
    label: "cashier",
    value: "Cashier",
  },
];
