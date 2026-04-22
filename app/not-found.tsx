/**
 * 404 — tasteful "page not found" with a shloka and a way home.
 */

import Link from 'next/link';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-8">
      <div className="space-y-4">
        <p className="text-7xl font-serif font-bold text-indigo-100">404</p>
        <h1 className="font-serif text-2xl font-semibold text-indigo">
          Page Not Found
        </h1>
        <p className="text-charcoal-300 max-w-sm mx-auto">
          The path you seek does not exist here. Like the seeker who must
          return to the Guru, let us guide you back.
        </p>
      </div>

      <ShlokaBlock
        devanagari="तमेव शरणं गच्छ सर्वभावेन भारत"
        iast="Tameva śaraṇaṁ gaccha sarvabhāvena Bhārata"
        translation="Seek refuge in Him alone with your whole being."
        source="Bhagavad Gītā 18.62"
        size="sm"
      />

      <Link href="/">
        <Button variant="primary">
          <Home size={16} />
          Return Home
        </Button>
      </Link>
    </div>
  );
}
