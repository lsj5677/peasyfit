"use client";

import { SWRConfig } from "swr";

type TSwrConfig = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: TSwrConfig) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
