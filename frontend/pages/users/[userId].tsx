import { useRouter } from "next/router";
import React from "react";
import { EditUserPage } from "../../src/pages/EditUserPage";

export default function EditUser() {
  const router = useRouter();
  const { userId } = router.query;

  return <EditUserPage userId={userId} />;
}
