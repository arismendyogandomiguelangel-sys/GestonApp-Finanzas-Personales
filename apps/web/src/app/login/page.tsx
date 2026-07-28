import type { ReactElement } from "react";

import { LoginForm } from "@/ui/auth/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage(): ReactElement {
  return <LoginForm />;
}
