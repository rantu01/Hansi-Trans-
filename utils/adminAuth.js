export const requireAdminAuth = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("adminToken");
  if (!token) {
    window.location.href = "/login";
    return false;
  }
  return token;
};
