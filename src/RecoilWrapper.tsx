"use client";

import { RecoilRoot } from "recoil";
import Modal from "@/components/Modal/Modal";
import { QueryClient, QueryClientProvider } from "react-query";

const RecoilRootWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        {children}
        <Modal />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default RecoilRootWrapper;
