import React, { useState, useEffect } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { SRLWrapper } from "simple-react-lightbox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
function App() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(true);
  const KEY = "gIDqCOogfLyW1C1dEKo4oyvUiMBF10hFGZRrNmgMvz0";

    function toggle() {
      setModal(!modal);
    }
  const getValue = (e) => {
    setImage(e.target.value);
  };
  const getImages = () => {
    const URL_API =
      "https://api.unsplash.com/search/photos?page=1&query=" +
      image +
      "&client_id=" +
      KEY;
    axios.get(URL_API).then((res) => {
      setResult(res.data.results);
      console.log(res);
    });
  };
  return (
    <SRLWrapper>
      <>
        <div className="nav">
          <h2 className={"h1"}>📷 Rasmlar qidiruv sayti</h2>
        </div>
        <div className="formSec">
          <input
            type="text"
            name="image"
            onChange={getValue}
            placeholder="Qidiruv..."
          />
          <Button className={'buttonn'} variant="contained" color="primary"  onClick={getImages}>
            <Search/>
          </Button>
        </div>
        <hr />
        <div className="result">
        {result.map((item, index) => (
          <div className="cardd" key={item.id}>
            <a>
              <LazyLoadImage
                src={item.urls.full}
                className={"resultImage"}
                effect="blur"
                delayTime="300"
              />
              <p className={'username'}>Photo by {item.user.name}</p>
            </a>
          </div>
        ))}
        </div>
      </>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader >Tushuntirish</ModalHeader>
        <ModalBody >
          <h5 className={'modaltext'}>
            Assalomu alaykum siz bu web saytda xohlagan rasmingizni topishingiz
            mumkin. Qidiruv bo'limi faqat inglizcha so'zlarni qabul qiladi.
          </h5>
        </ModalBody>
        <ModalFooter >
          <p className="text-center">
            <Button className={'modalbtn'} onClick={toggle} variant="contained" color="primary">
              Tushundim
            </Button>
          </p>
        </ModalFooter>
      </Modal>
    </SRLWrapper>
  );
}

export default App;
