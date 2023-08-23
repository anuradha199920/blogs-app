"use client"
import { useRouter, useSearchParams } from 'next/navigation';

const Collection = ()  => {
    const router = useRouter();
    const searchParams = useSearchParams();

   console.log(searchParams.get('data'));
    // Use the tokenId for your component logic

    return (
        <div>
            {searchParams}
        </div>
    );
}

export default Collection;
