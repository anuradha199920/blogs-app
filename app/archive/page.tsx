import {fetchPaginatedPosts} from "@/utils";
import Archive from "./archive";
const POSTS_PER_PAGE = 6;

export default async function ArchivePage() {
  const initialposts = await fetchPaginatedPosts([0,POSTS_PER_PAGE]);
  return <Archive initialposts={initialposts} />;
}