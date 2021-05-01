import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const Post = ({ data, url }) => {
  const { id } = useParams();
  const post = data.find((p) => p.id === +id);

  const [comments, setComments] = useState([]);

  const divStyle = {
    width: " 60%",
    height: " 80%",
    border: "9px gold solid",
    margin: "auto",
    padding: "1em",
    textAlign: "center",
  };

  let commentUrl = `${url}/${id}/comments`;

  useEffect(() => {
    try {
      const getComment = async () => {
        const response = await fetch(commentUrl);
        const data = await response.json();
        setComments(data);
      };
      getComment();
    } catch (error) {
      console.log(error);
    }
  }, [commentUrl]);

  return (
    <>
      <Link to="/" style={{ cursor: "pointer" }}>
        {" "}
        <button>Back to see all posts</button>{" "}
      </Link>
      <div style={divStyle}>
        <p>User Id : {post.userId}</p>
        <h3> {post.title}</h3>
        <p> {post.body}.</p>
      </div>
      <div>
        <hr />
        {comments.length === 0 ? (
          <h1>Loading ...</h1>
        ) : (
          comments.map((comment) => {
            return <Comment commentInfo={comment} />;
          })
        )}
      </div>
    </>
  );
};

export default Post;
