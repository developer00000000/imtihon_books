import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Books from "../../components/Books/Books";

const BooksDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => {
       
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

    const { volumeInfo } = book;

  return (
    <section>
      <div className="back heroContainer"><Link to='/'><FaArrowLeftLong /></Link></div>
      <div className="detail heroContainer">
        <div className="detail_left">
          <div className="booksDetail">
           <div className="img">
               <img
              src={volumeInfo?.imageLinks?.thumbnail}
              alt={volumeInfo?.title}
               />
           </div>
            <div className="books_mains">
              <h3>{volumeInfo?.title}</h3>
              <p>by {volumeInfo?.authors?.join(", ")}</p>
              <div className="books_mains_title">
                 <p>{volumeInfo?.publisher}</p>
                 <p>{volumeInfo?.publishedDate}</p>
              </div>
              <div className="books_mains_btns">
                  <button className="btn1">Buy Now</button>
                  <button className="btn2">Read Book</button>
              </div>
            </div>
          </div>
          <div className="sinopsis">
            <h3 >Sinopsis</h3>
            <p>{volumeInfo?.description}</p>
             <div className="sinopsis_btns">
                <button>Biografi</button>
                <button>AutoBiografi</button>
                <button>Memoar</button>
             </div>
             <h3>Informasi Tambahan</h3>
             <ul>
                 <li>Page count <span>{volumeInfo?.pageCount}</span></li>
                 <li>Published Date <span>{volumeInfo?.publishedDate}</span></li>
                 <li>Category <span>{volumeInfo?.title}</span></li>
             </ul>
                <button className="comments_btn">See Comment</button>
          </div>
        </div>

        <div>
            <Books title={"Cerita Serupa"} className={'recommends'} className2={'allBooks'} className3={'allBooks_box'} limit={4} limitP={60} btn={'btn_home'}/>
        </div>
      </div>
    </section>
  );
};

export default BooksDetail;
