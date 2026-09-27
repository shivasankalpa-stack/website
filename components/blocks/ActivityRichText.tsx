/**
 * Light markup for activity narratives in Studio (plain text fields):
 *   # Heading
 *   ## Sub-heading
 *   - bullet (also * or •)
 *   blank line between paragraphs
 */

type Block =
  | { type: 'h3' | 'h4'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

const BULLET = /^[-*•]\s+(.*)$/;

export function parseActivityRichText(raw: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim();
    if (text) blocks.push({ type: 'p', text });
    paragraph = [];
  };

  const flushList = () => {
    if (list.length) blocks.push({ type: 'ul', items: list });
    list = [];
  };

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h4', text: trimmed.slice(3).trim() });
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h3', text: trimmed.slice(2).trim() });
      continue;
    }
    const bullet = trimmed.match(BULLET);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1].trim());
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  return blocks;
}

export function ActivityRichText({ text }: { text: string }) {
  const blocks = parseActivityRichText(text);

  return (
    <div className="mx-auto max-w-2xl space-y-5 text-left">
      {blocks.map((block, index) => {
        if (block.type === 'h3') {
          return (
            <h3
              key={index}
              className="font-serif text-xl font-semibold text-indigo tracking-tight pt-2 first:pt-0"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === 'h4') {
          return (
            <h4
              key={index}
              className="font-serif text-lg font-semibold text-indigo-300 tracking-tight"
            >
              {block.text}
            </h4>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul
              key={index}
              className="list-disc space-y-1.5 pl-6 text-charcoal-300 leading-relaxed marker:text-kumkuma"
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-charcoal-300 leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
