import type { Metadata } from 'next';
import AdminEditor from '@/components/AdminEditor';
export const metadata: Metadata = { title: 'Управление сайтом АЙА', robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminEditor />; }
