import { useRouter } from "next/router";
import React from "react";
import { TransactionDetailPage } from "../../../src/pages/TransactionDetailPage";

export default function TransferDetailPage() {
  const router = useRouter();
  const { userId, dataCadastro } = router.query;

  return (
    <TransactionDetailPage
      userId={userId as string}
      dataCadastro={dataCadastro as string}
    />
  );
}
