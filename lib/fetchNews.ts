import { gql } from "graphql-request"
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
    // GraphQl query
    const query = gql`
      query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
      ) {
        myQuery(
          access_key: $access_key
          categories: $categories
          countries: "gb"
          sort: "published_desc"
          keywords: $keywords
        ) {
          data {
            author
            category
            image
            description
            country
            language
            published_at
            source
            title
            url
          }
          pagination {
            count
            limit
            offset
            total
          }
        }
      }
    `
    
    // Fetch function with Next,js 13 caching...
    const res = await fetch("https://parelhas.stepzen.net/api/wandering-ibis/__graphql", {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "applicaion/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        }
      })
    })

    console.log(
      "LOADING NEW DATA FROM API for category >>> ",
      category,
      keywords,
    );

    const newsResponse = await res.json()
    
    console.log("NewsRespose: ", newsResponse)
    // Sort function by images vs not images present
    const news = sortNewsByImage (newsResponse.data.myQuery);

    // return res
    return news;
}

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=c07478350fd505860f66aecf9456cfca&sources=business,sports