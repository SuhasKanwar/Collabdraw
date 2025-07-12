import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function Quote() {
  return (
    <div className="max-w-[80vw] text-center mx-auto my-72 text-6xl font-bold tracking-tight md:text-8xl">
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