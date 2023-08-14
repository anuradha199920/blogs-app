import { Author } from "@/components";
import Link from "next/link";
import Image from "next/image";


export default function AuthorCard({ author }: {author: Author}) {
    return (
      <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
          <div className="relative mt-1 h-24 w-24 flex-shrink-0 ">
            <Link href={`/about`}>
            <Image
                src={author.profilePicture.url}
                alt={author.name}
                fill
                className="rounded-full object-cover fill"
                sizes="96px"
            />
            </Link>
          </div>
          <div>
            <div className="mb-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
                About {author.name}
              </h3>
            </div>
            <div>
              {author.bio}
            </div>
            <div className="mt-3">
              <Link
                href={`/about`}
                className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 ">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  