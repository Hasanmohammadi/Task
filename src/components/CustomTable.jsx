import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  paginationDiv: {
    width: "44%",
    height: "2em",
    margin: "auto",
    display: "flex",
    flexFlow: "wrap",
  },
  pageBox: {
    width: "1em",
    height: "1em",
    margin: "1.5em 1em",
  },
  arrow: {
    width: "1em",
    height: "1em",
    fontSize: "3em",
    textDecoration: "none",
    color: "black",
  },
  loading: {
    textAlign: "center",
    padding: "10em 0",
  },
  active: {
    color: "red",
    fontWeight: "bolder",
  },
});

export default function CustomTable({ data, itemsPerPage }) {
  const classes = useStyles();
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    const start = (id - 1) * itemsPerPage;
    const end = id * itemsPerPage;
    const postWillShow = data.slice(start, end);
    setPosts(postWillShow);
    setNumberOfPages(Math.ceil(data.length / itemsPerPage));
  }, [id, itemsPerPage, data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Posts</StyledTableCell>
              <StyledTableCell align="right">User Id</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <StyledTableRow key={post.id}>
                <StyledTableCell component="th" scope="row">
                  <span>{`${index + 1}) `}</span>{" "}
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{post.userId}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classes.paginationDiv}>
        {+id === 1 ? (
          <Link className={classes.arrow} to="#">⬅</Link>
        ) : (
          <Link className={classes.arrow} to={`${+id - 1}`}>
            ⬅
          </Link>
        )}
        {Array.from({ length: numberOfPages }, (_, index) => index + 1).map(
          (number) => {
            return (
              <div key={number} className={classes.pageBox}>
                <NavLink to={`${number}`} activeClassName={classes.active}>
                  {number}
                </NavLink>
              </div>
            );
          }
        )}

        {+id === numberOfPages ? (
          <Link className={classes.arrow} to="#">➡</Link>
        ) : (
          <Link className={classes.arrow} to={`${+id + 1}`}>
            ➡
          </Link>
        )}
      </div>
    </>
  );
}
