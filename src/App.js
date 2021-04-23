import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { URL } from "./baseUrl";
import CustomTable from "./components/CustomTable";
import Post from "./components/Post";





const App = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPosts] = useState([]);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      };
  
      getPosts();
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "10em 0",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <Route
        path={"/"}
        render={() => <Redirect to={`/posts/page/1`} />}
        exact
      />
      <Route path={`/posts/page/:id`} exact>
        <CustomTable data={post} itemsPerPage={10} />
      </Route>
      <Route path="/posts/:id"  exact >
        <Post data={post} url={URL}/>
      </Route>
    </div>
  );
};

export default App;
