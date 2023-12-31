"use client";
import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
const mobilemenu = [
  {
    label: "Home",
    href: "/home"
  },{
    label: "Our Work",
    href: "/home#dashboard"
  },{
    label: "Blogs",
    href: "/home#blogs"
  },{
    label: "Clients",
    href: "/home#clients"
  },{
    label: "Contact Us",
    href: "/home#contactus"
  }];
  return (
    <div className="sticky top-0 z-20  py-2 w-[100%] border-stoke bg-white bg-opacity-90 mb-4 h-15  border-b-[1px] shadow-md">
      <nav className="rounded-none px-4 lg:px-8 flex justify-between">
        <Disclosure key={"navBarDisclosure"}>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                <div className="order-2 hidden w-full flex-col justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row py-2">
                  {mobilemenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="px-5 py-2 text-lg font-semibold text-[#3C61BD] hover:text-blue-500 dark:text-gray-400 hover:underline transform ease-in-out delay-400 duration-300 underline-offset-2">
                          <span> {item.label}</span>
                        </Link>
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="flex w-full justify-between md:w-auto">
                
                <div className="relative h-25 w-25 flex-shrink-0 shadow-md rounded-full ">
                  <Link href={`https://twitter.com/eekeyguy_eth`}>
                      <Image
                          src={"https://media.graphassets.com/jOnwtOcnSr6y9PcBkc7m"}
                          alt={"Eekeyguy"}
                          fill
                          className="rounded-full object-cover fill"
                          sizes="96px"
                      />
                  </Link>
                </div>
                <div className="flex items-start">
                <Disclosure.Panel>
                <div className="order-2 -ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden bg-white">
                  {mobilemenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="w-full px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400">
                          {item.label}
                        </Link>
                    </Fragment>
                  ))}
                </div>
              </Disclosure.Panel>
                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 md:hidden"
                  key="navBarButton">
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>
                </div>
                
              </div>
             
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
}
