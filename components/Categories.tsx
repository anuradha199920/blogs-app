"use client"
import React,{useEffect, useState} from 'react';
import moment from 'moment';
import Link from 'next/link';
import {Category, Post} from "@/components/types";
import {fetchCategories} from "@/utils";

const Categories =  ()=>{
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories().then(
            (result)=>{
                setCategories(result);
            }
        )
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Categories
            </h3>
            {
                categories.map((category: Category)=>(
                        <Link key={category.name} href={`/categories/${category.slug}`}>
                            <span className="cursor-pointer block pb-3 mb-3">
                                {category.name}
                            </span>
                        </Link>
                    )
                )
            }
        </div>
    )
};

export default Categories;