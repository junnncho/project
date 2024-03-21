import { useSearchParams } from 'next/navigation';
import MainPage from '@junblog/frontend/pages';

export function Index() {
  const userId = useSearchParams().get('userId') as string;
  return <MainPage view={true} userId={userId} />;
}

export default Index;
