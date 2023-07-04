import React, { useEffect, useState } from "react";
import { Cart, FormFiled, Loader } from "../components/";

function Home() {
  const [loading, setLoading] = useState(false);
  const [allposts, setAllposts] = useState(null);
  const [serchText, setSearchText] = useState("");

 const ReanderCards = ({ data, title }) => {
    if (data.leanth > 0) {
      return data.map((post) => <Cart key={post._id} {...post} />);
    }
    return (
      <h2 className="mt-5 font-bold text-[#6949ff] text-xl uppercase">
        {title}
      </h2>
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
        <FormFiled />
      </div>

      <div className="mt-16">
        {loading ? (
          <div className="flex justfy-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {serchText && (
              <h2 className="font-medium text-[666e75] text-xl mb-3 ">
                showing results{" "}
                <span className="text-[222328] ">{serchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {serchText ? (
                <ReanderCards data={[]} title="No search result found" />
              ) : (
                <ReanderCards data={[]} title="No post found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
