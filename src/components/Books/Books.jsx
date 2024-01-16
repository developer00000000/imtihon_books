import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/reducer";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/headerImg/stars.svg";

const Books = ({
  title,
  className,
  className2,
  className3,
  limit,
  limitP,
  btn,
  star
}) => {
  const goPage = useNavigate();
  const dispatch = useDispatch();
  const deta = useSelector((state) => state.user?.users);

  useEffect(() => {
    // dispatch(fetchData("design")());
  }, []);

  console.log(deta);

  return (
    <div className={className}>
      <h2>{title}</h2>
      <ul>
        <div className={className2}>
          {deta?.slice(0, limit)?.map((books) => (
            <div
              className={className3}
              key={books?.id}
              onClick={() => {
                goPage(`/home/${books?.id}`);
              }}
            >
              <img src={books?.volumeInfo.imageLinks?.thumbnail} alt="books" />
              <div className="books_main">
                <h3>
                  {books?.volumeInfo.title &&
                    books?.volumeInfo.title.slice(0, 40)}
                </h3>
                <p>by {books?.volumeInfo.authors}</p>
                {/* <p>Publisher: {books?.volumeInfo.publisher}</p> */}
                <div className="flex gap-4">
                  <img className={star} src={stars} alt="" />
                  <p> {books?.volumeInfo.publishedDate}</p>
                </div>
                <p>
                  {" "}
                  {books?.volumeInfo.description &&
                    books?.volumeInfo.description.slice(0, limitP)}
                  ...
                </p>
                <button className={btn}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Books;
