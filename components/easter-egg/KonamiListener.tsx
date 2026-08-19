"use client";

import React, { useState } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { EasterEggModal } from "./EasterEggModal";

export function KonamiListener() {
  const [modalOpen, setModalOpen] = useState(false);

  const { isTriggered, reset } = useKonamiCode(() => {
    setModalOpen(true);
  });

  const handleClose = () => {
    setModalOpen(false);
    reset();
  };

  return (
    <EasterEggModal isOpen={modalOpen || isTriggered} onClose={handleClose} />
  );
}
