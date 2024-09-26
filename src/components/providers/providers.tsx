"use client";

import QueryProviders from "@/components/providers/query-provider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <QueryProviders>{children}</QueryProviders>;
};
