import {fetchPaginatedPosts} from "@/utils";
import Archive from "./archive";
const POSTS_PER_PAGE = 6;

export default async function ArchivePage() {
  const initialposts = await fetchPaginatedPosts({skip:0,first: POSTS_PER_PAGE});
  return <Archive initialposts={initialposts} />;
}