import { notFound } from 'next/navigation';

// This will catch any invalid paths under /states/
export function generateStaticParams() {
  return [{ not_found: ['404'] }];
}

export default function CatchAllPage() {
  notFound();
} 