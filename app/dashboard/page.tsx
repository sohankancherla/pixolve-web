import { redirect } from 'next/navigation';

export default async function AppHomePage() {
  return redirect('/dashboard/clean');
}
