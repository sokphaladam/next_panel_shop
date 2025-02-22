import { useUser } from "@/service/UserProvider";
import React from "react";
import { role_permission } from "../polaris/PolarisLayout";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
  permission?: role_permission[];
  children?: React.ReactNode | undefined;
}

export function PageLayout(props: Props) {
  const user = useUser();

  const block = (
    <Alert variant={"destructive"}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
    </Alert>
  );

  const permissionDenied = !props.permission?.includes(user?.role?.id || 0);

  return (
    <React.Fragment>
      <div className="p-6">{permissionDenied ? block : props.children}</div>
    </React.Fragment>
  );
}
