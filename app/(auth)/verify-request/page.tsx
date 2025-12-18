import { Suspense } from "react";
import VerifyRequest from "./verify-request";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading verification...</div>}>
      <VerifyRequest />
    </Suspense>
  );
}
