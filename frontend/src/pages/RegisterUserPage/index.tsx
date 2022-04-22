import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { NewUserForm } from "../../components/NewUserForm";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../global";

function RegisterUserPage() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthenticationContext);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/users");
    }
  });

  return <NewUserForm isRegister={true} />;
}

export { RegisterUserPage };
