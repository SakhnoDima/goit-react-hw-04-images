import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {
  ImageGallery,
  Loader,
  Modal,
  Searchbar,
  fetchArticlesWithQuery,
} from './index';

import './styles/styles.css';

export const App = () => {
  const [picture, setPicture] = useState('');
  const [page, setPage] = useState(1);
  const [pictureList, setPictureList] = useState([]);
  const [icon, setIcon] = useState('');
  const [modalShow, setModalShow] = useState(false);

  let loading = useRef(false);
  let totalHitse = useRef(0);

  useEffect(() => {
    const lastPage = () => {
      if (page * 12 > totalHitse.current) toast.error('Its last page');
    };
    const imageLoading = async () => {
      loading.current = true;

      try {
        const { hits, totalHits, total } = await fetchArticlesWithQuery(
          picture,
          page
        );
        if (total === 0) {
          setPictureList(null);
          return toast.error('Image not found');
        }
        totalHitse.current = totalHits;
        setPictureList(prev => [...prev, ...hits]);

        // перевірка знайшли щось чи ні
        lastPage(); // перевірка лише на одну сторінку
      } catch (error) {
        toast.error('Sorry! We have some problem. Try again later! '); // помилка
        console.log(error.message);
      } finally {
        loading.current = false;
      }
    };
    if (!picture) {
      return;
    }
    imageLoading();
  }, [picture, page]);

  const handleFormGetPicture = picture => {
    setPicture(picture);
    setPage(1);
    setPictureList([]);
    totalHitse.current = 0;
  };
  const handleOnclick = () => {
    setPage(prev => prev + 1);
  };

  const handleGetIcon = url => {
    setModalShow(prev => !prev);
    setIcon(url);
  };

  const handleToggleModalShow = () => {
    setModalShow(prev => !prev);
  };
  return (
    <div className="App">
      <Searchbar onSubmitGetPicture={handleFormGetPicture} />
      <ImageGallery pictureList={pictureList} onClick={handleGetIcon} />
      <Loader visible={loading.current} />
      <ToastContainer autoClose={3000} />
      {page * 12 < totalHitse.current && (
        <button className="Button" type="button" onClick={handleOnclick}>
          Load more
        </button>
      )}
      {modalShow && <Modal onClick={handleToggleModalShow} icon={icon} />}
    </div>
  );
};
