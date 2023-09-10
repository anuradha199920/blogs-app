import React from 'react';
import Link from 'next/link';

const Header: React.FC<any> = ()=> {
    return (
        <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8">
            <nav>
                <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10 ">
                    <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                        <Link href="/graphs">
                            <span className="px-5 py-2 text-md font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400">
                            Graphs
                            </span>
                        </Link>
                        <Link href="/tweets">
                            <span className="px-5 py-2 text-md font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400">
                            Tweets
                            </span>
                        </Link>
                    </div>
                    <div className="mx-8 flex w-full items-center justify-between md:w-auto">
                        <Link href="/home">
                            <span className="px-5 py-2 text-gray-800 hover:text-blue-500 dark:text-gray-400 cursor-pointer font-bold text-4xl">
                                Blogs
                            </span>
                        </Link>
                    </div>
                    <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                        <Link href="/about">
                            <span className="px-5 py-2 text-md font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400">
                            About
                            </span>
                        </Link>
                        <Link href="/archive">
                            <span className="px-5 py-2 text-md font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400">
                            Archive
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
            
        </div>
    )
};

export default Header;