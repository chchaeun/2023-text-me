const PATH = {
  USER: {
    ROOT: "/users",
    REFRESH: "/users/token/refresh",
    SIGNUP: "/users/signup",
    LOGIN: {
      EMAIL: "/users/login",
      KAKAO: "/oauth/login/kakao",
    },
    FIND: "/users/find",
    FIND_ONE: (id: string) => `/users/find/${id}`,
    LOGOUT: "/users/logout",
  },
  LETTER: {
    ROOT: "/letters",
    GET_ONE: (id: number) => `/letters/${id}`,
    GET_MEMBER_ALL: (id: string) => `/letters/members/${id}`,
    SEND: (type: "email" | "address") => `/letters/${type}`,
  },
  CARD: {
    ROOT: "/cards",
    UPLOAD: "/cards/upload",
  },
  UPLOAD: {
    FILES: "/files/upload",
  },
  DKU: {
    LETTER: {
      EVENT: "/letters/events",
      GET_ONE: (id: number) => `/letters/events/${id}`,
      REPORT: (id: number) => `/letters/events/${id}/reports`,
    },
  },
};

export { PATH };
