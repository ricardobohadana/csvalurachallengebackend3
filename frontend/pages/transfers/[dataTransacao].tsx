import { useRouter } from "next/router";
import React from "react";
import { TransactionDetailPage } from "../../src/pages/TransactionDetailPage";

export default function TransferDetailPage() {
  const router = useRouter();
  const { dataTransacao } = router.query;

  return <TransactionDetailPage dataTransacao={dataTransacao as string} />;
}
