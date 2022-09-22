import { ReactNode } from "react";
import AdminPageLayout from "./components/AdminPageLayout";

const AdminPage = ({ children }: { children: ReactNode }) => {
  return <AdminPageLayout>{children}</AdminPageLayout>;
};

export default AdminPage;
