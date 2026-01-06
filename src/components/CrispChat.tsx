"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure("76bde946-6f2f-4372-88a3-a579f8f733d7");
  }, []);

  return null;
}
