import React from "react";
import { NewUserForm } from "../../components/NewUserForm";

function CreateUserPage() {
  return <NewUserForm isRegister={false} />;
}

export { CreateUserPage };
