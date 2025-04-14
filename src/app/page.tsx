"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCustomerStore } from "@/stores/customerStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const setIds = useCustomerStore((s) => s.setIds);

  useEffect(() => {
    const restaurant_id = params.get("restaurant_id");
    const table_id = params.get("table_id");
    const customer_id = params.get("customer_id");

    if (restaurant_id && table_id && customer_id) {
      setIds(restaurant_id, table_id, customer_id);
      router.push("/menus");
    }
  }, [params, setIds]);

  return <></>;
}
