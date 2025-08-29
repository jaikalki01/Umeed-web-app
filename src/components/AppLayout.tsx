import { useBackButtonHandler } from "@/components/useBackButtonHandler";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  useBackButtonHandler("/"); // "/" is your home screen

  return <div>{children}</div>;
};

export default AppLayout;
