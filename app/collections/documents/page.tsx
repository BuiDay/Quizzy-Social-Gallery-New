"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetCollectionsMutation } from "@/redux/features/user/userApi";
import { DashboardDocuments, type CollectionDocument } from "@/components/dashboard/DashboardViews";

export default function DocumentsPage() {
  const [getCollections, { isLoading, isError }] = useGetCollectionsMutation();
  const { products } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    void getCollections({});
  }, [getCollections]);

  return (
    <DashboardDocuments
      documents={(products ?? []) as CollectionDocument[]}
      documentsLoading={isLoading}
      documentsError={isError}
      onRetry={() => { void getCollections({}); }}
    />
  );
}
