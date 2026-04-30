import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is CollabDraw and how does it work?",
    answer: "CollabDraw is a real-time collaborative drawing platform that allows multiple users to work together on the same canvas simultaneously. Using WebSocket technology, all changes are instantly synchronized across all connected users, enabling seamless teamwork for creative projects, brainstorming sessions, and educational purposes."
  },
  {
    question: "How many people can collaborate on a single canvas?",
    answer: "CollabDraw supports up to 50 simultaneous users on a single canvas. Each user gets their own cursor color and can see real-time changes made by others. For larger teams, we recommend creating multiple canvases and organizing them into project folders."
  },
  {
    question: "Is my artwork automatically saved?",
    answer: "Yes! CollabDraw automatically saves your work every few seconds. We also maintain a complete version history, so you can restore previous versions of your artwork at any time. Your projects are securely stored in the cloud and accessible from any device."
  },
  {
    question: "What drawing tools are available?",
    answer: "CollabDraw offers a comprehensive set of professional drawing tools including various brushes, pens, shapes, text tools, layers, color palettes, gradients, and an eraser. We also support both vector and raster graphics, giving you flexibility in your creative process."
  },
  {
    question: "Can I export my collaborative artwork?",
    answer: "Absolutely! You can export your collaborative artwork in multiple formats including PNG, JPEG, SVG, and PDF. You can also share a live link to your canvas for real-time viewing or collaboration, and set different permission levels for viewers and editors."
  },
  {
    question: "Is CollabDraw secure for sensitive projects?",
    answer: "Yes, we take security seriously. CollabDraw uses end-to-end encryption for all communications, secure cloud storage with enterprise-grade protection, and offers access control management. We're also compliant with major data protection regulations."
  },
  {
    question: "Do I need to install any software?",
    answer: "No installation required! CollabDraw runs entirely in your web browser. It's compatible with all modern browsers on desktop, tablet, and mobile devices. Simply create an account and start drawing immediately."
  }
];

export default function FAQ() {
  return (
    <section className="py-20" id="faqs">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-200 shadow-lg border border-gray-700 mb-4">
            <span>💡</span>
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Everything you need to know about CollabDraw and collaborative drawing
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-700 last:border-b-0"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-gray-200 py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}