import { useState, useEffect } from "react";
import "./HomeAuth.css";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useMoralisWeb3Api } from "react-moralis";



const HomeAuth = () => {

  const [blogs, setBlogs] = useState();
  const [blogsContent, setBlogsContent] = useState();
  const Web3Api = useMoralisWeb3Api();

  const fetchAllNfts = async () => {

    const options = {
      chain: "mumbai",
      address: "0x6C81D7CEA8dBF7292c96F1Ed9EB6c97A269fe4A8",
    };

    const polygonNFTs = await Web3Api.token.getNFTOwners(options);
    const tokenUri = polygonNFTs?.result?.map((data) => {
      const { metadata, owner_of } = data;

      if (metadata) {
        const metadataObj = JSON.parse(metadata);
        const { externalUrl } = metadataObj;
        return { externalUrl, owner_of };
      } else {
        return undefined;
      }
    });
    setBlogs(tokenUri);
    
  };
  

  const fetchBlogsContent = async () => {
    
    const limit5 = blogs?.slice(0, 5);
    let contentBlog = [];

    if (limit5) {
      limit5.map(async (blog) => {
        if (blog) {
          const { externalUrl, owner_of } = blog;
          const res = await axios.get(externalUrl);
          const text = res.data.text.toString();
          const title = res.data.title;
          contentBlog.push({ title, text, owner_of, externalUrl });
        }
      });
    }

    setBlogsContent(contentBlog);

  };
//.
  useEffect(() => {
    if (blogs && !blogsContent) {
      fetchBlogsContent();
    }
  }, [blogs, blogsContent]);

  useEffect(() => {
    if (!blogs) {
      fetchAllNfts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs, fetchBlogsContent]);


  return (
    <div className="homeAuth_container">
      <div className="homeAuth_header">Blogs on the Blockchain</div>
      <div className="homeAuth_blogs">
        {blogsContent &&
          blogsContent.map((blog, i) => {
            const { title, text, owner_of, externalUrl } = blog;
            return (
              <BlogCard
                key={i}
                title={title}
                text={text}
                ownerOf={owner_of}
                externalUrl={externalUrl}
              />
            );
          })}
      </div>
    </div>
  );
};

export default HomeAuth;
 