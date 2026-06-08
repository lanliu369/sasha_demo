"use client";

import "@arco-design/web-react/es/_util/react-19-adapter";
import { ConfigProvider } from "@arco-design/web-react";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";

type ArcoProviderProps = {
  children: React.ReactNode;
};

export function ArcoProvider({ children }: ArcoProviderProps) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        primaryColor: "#3370FF",
      }}
    >
      {children}
    </ConfigProvider>
  );
}
