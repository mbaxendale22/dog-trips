export const screenOptions = {
  WELCOME: "WELCOME",
  CHOOSE_PERSON: "CHOOSE_PERSON",
  STATS: "stats",
};

export const isAuthenticated = localStorage.getItem("user") === "authenticated";
