import React, { Suspense } from "react";
import AddServiceClient from "./AddServiceClient";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <AddServiceClient />
    </Suspense>
  );
}
