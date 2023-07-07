import React, { useEffect, useState } from "react";
import { Cart, FormFiled, Loader } from "../components/";

const ReanderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Cart key={post._id} {...post} />);
  } else {
    return (
      <h2 className="mt-5 font-bold text-[#6949ff] text-xl uppercase">
        {title}
      </h2>
    );
  }
};

function Home() {
  const [loading, setLoading] = useState(false);
  const [allposts, setAllposts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setsearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const result = await response.json();
          setAllposts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleSerchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allposts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          community shwocase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Browse through a collection of imaganitive and visually stunning
          images ganarated by DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <FormFiled
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSerchChange}
        />
      </div>

      <div className="mt-16">
        {loading ? (
          <div className="flex justfy-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[666e75] text-xl mb-3 ">
                showing results{" "}
                <span className="text-[222328] ">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <ReanderCards
                  data={searchedResults}
                  title="No search result found"
                />
              ) : (
                <ReanderCards data={allposts} title="No post found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
