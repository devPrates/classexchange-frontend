'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="four_zero_four_bg w-full">
                <h1 className="text-center">404</h1>

            </div>

            <div className='flex space-x-2'>
                <Button onClick={() => router.back()}>Voltar</Button>
                <Button asChild>
                    <Link href="/">
                        Voltar para a página inicial
                    </Link>
                </Button>
            </div>
        </div>
    );
}