import { VIETNAMESE_PHRASES } from "../data/phrases";
import { PhrasebookCard } from "../components/PhrasebookCard";

export default function PhrasebookPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h1 className="mb-8 text-3xl font-bold">Essential Vietnamese Phrases</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {VIETNAMESE_PHRASES.map((phrase) => (
          <PhrasebookCard key={phrase.id} phrase={phrase} />
        ))}
      </div>
    </div>
  );
}
