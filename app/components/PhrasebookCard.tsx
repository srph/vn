"use client";

import { motion } from "framer-motion";

interface PhrasebookCardProps {
  phrase: {
    en: string;
    vn: string;
    pronunciation: string;
  };
}

export function PhrasebookCard({ phrase }: PhrasebookCardProps) {
  return (
    <div className="space-y-2 rounded-lg bg-neutral-800 p-4">
      <div className="text-sm text-neutral-400">{phrase.en}</div>
      <div className="text-xl font-bold">{phrase.vn}</div>
      <div className="text-sm italic text-neutral-500">
        /{phrase.pronunciation}/
      </div>
    </div>
  );
}
