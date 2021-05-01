const Comment = ({ commentInfo }) => {
  const containerStyle = {
    border: "red 2px solid",
    textAlign: "center",
    marginTop: "3em",
  };
  return (
    <div style={containerStyle}>
      <h3>name :{commentInfo.name}</h3>
      <h3>email :{commentInfo.email}</h3>
      <p>{commentInfo.body}</p>
    </div>
  );
};

export default Comment;
