"use client";

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function LanguageToggle() {
    const pathname = usePathname();
    const router = useRouter();

    // Extract lang from URL: /en/... or /ar/...
    const segments = pathname.split('/').filter(Boolean);
    const currentLang = (segments[0] === 'ar' || segments[0] === 'en') ? segments[0] : 'en';
    const newLang = currentLang === 'en' ? 'ar' : 'en';

    // Replace the lang segment in the path
    const restOfPath = segments.slice(1).join('/');
    const newPath = `/${newLang}${restOfPath ? '/' + restOfPath : ''}`;

    const handleToggle = () => {
        document.cookie = `lang=${newLang};path=/;max-age=${60 * 60 * 24 * 365}`;
        router.push(newPath);
        router.refresh();
    };

    return (
        <div onClick={handleToggle} className="flex items-center gap-1.5 cursor-pointer">
            <Image
                src={newLang === 'en' ? '/us-flag.png' : '/egypt-flag.png'}
                alt={newLang === 'en' ? 'United States Flag' : 'Egypt Flag'}
                width={18}
                height={18}
            />
            <p className="text-sm text-gray-500 font-medium">{newLang.toUpperCase()}</p>
        </div>
    );
}
