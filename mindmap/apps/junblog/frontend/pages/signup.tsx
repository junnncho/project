import { useApi } from '@junblog/frontend/stores/server';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const res = useApi.useInitialize();
  useEffect(() => {
    res.isError || (res.isSuccess && router.push('/'));
  }, [res]);
  return (
    <div className="flex items-center justify-center w-screen h-screen"></div>
  );
}
