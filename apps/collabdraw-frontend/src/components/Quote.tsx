import { PointerHighlight } from "@/components/ui/pointer-highlight";

export function Quote() {
  return (
    <div className="mx-auto py-52 text-2xl font-bold tracking-tight md:text-4xl">
      Great ideas become extraordinary when we
      <PointerHighlight
        rectangleClassName="bg-blue-900 border-blue-700 leading-loose"
        pointerClassName="text-blue-700"
        containerClassName="inline-block mx-1"
      >
        <span className="relative z-10">collaborate</span>
      </PointerHighlight>
      together.
    </div>
  );
}