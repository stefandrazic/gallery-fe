import React from "react";

export default function useAuth() {
  const user = localStorage.getItem("token");
  //checking whether token is preset or not
  if (user) {
    return true;
  } else {
    return false;
  }
}
