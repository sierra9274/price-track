"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductURL = (url: string)=>{
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(
      hostname.includes('amazon.com') || 
      hostname.includes ('amazon.') || 
      hostname.endsWith('amazon') ||
      hostname.includes('amzn')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt]= useState('');
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const isValidLink = isValidAmazonProductURL(searchPrompt);
      if(!isValidLink) return alert('Please provide a valid Amazon link')

        try {
          setIsLoading(true);
    
          // Scrape the product page
          const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

  return (
    <form className="flex flex-wrap items-center max-w-lg w-full gap-4 mt-12" onSubmit={handleSubmit}>

    <input type="text"
    value={searchPrompt}
    onChange={(e)=>setSearchPrompt(e.target.value)}
    placeholder="Enter Product link here"
    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"/>

  <button 
  type="submit" 
  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
  disabled={searchPrompt === " "}
  >
  {isLoading ? "Searching..." : "Search"}
  </button>


    </form>
  )
}

export default SearchBar  