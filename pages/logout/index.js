import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    delete sessionStorage["pgsData"];
    router.push("/");
  }, []);
  return <>LOGGING OFF</>;
}
