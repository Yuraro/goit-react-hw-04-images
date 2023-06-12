import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'components/Button/Button';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Error from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import getPictures from '../Services/getPictures';
import { notification } from 'components/Notification/Notification';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPics, setTotalPics] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = (newSearchQuery) => {
    if (newSearchQuery === searchQuery) {
      notification(`Images of ${newSearchQuery} have already been displayed.`);
      return;
    }
    setSearchQuery(newSearchQuery);
    setPictures([]);
    setPage(1);
    setTotalPics(null);
    setIsOpen(false);
    setLoading(false);
    setModalImgSrc('');
    setError(null);
  };

  const loadPictures = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getPictures(searchQuery, page);
      const { hits, totalHits } = response.data;
      setPictures((prevPictures) => [...prevPictures, ...hits]);
      setTotalPics(totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (searchQuery === '') return;

    loadPictures();
  }, [searchQuery, page, loadPictures]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleModalOpen = (imgSrc) => {
    setModalImgSrc(imgSrc);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery pictures={pictures} onClick={handleModalOpen} />

      {totalPics === 0 && (
        <Error errorText={'Sorry, nothing has been found at your request'} />
      )}
      {error && (
        <Error
          errorText={`Something went wrong... ${error}. Please try again.`}
        />
      )}
      {loading && <Loader />}
      {totalPics / pictures.length > page && (
        <Button onClick={handleLoadMore} />
      )}
      {isOpen && <Modal imgSrc={modalImgSrc} onClose={handleModalClose} />}
      <ToastContainer />
    </Container>
  );
};

