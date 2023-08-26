import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {
  ImageGallery,
  Loader,
  Modal,
  Searchbar,
  fetchArticlesWithQuery,
} from './index';

import './styles/styles.css';

export class App extends Component {
  state = {
    picture: '',
    page: 1,
    pictureList: [],
    loading: false,
    icon: '',
    modalShow: false,
    totalHits: 0,
  };
  async componentDidUpdate(_, prevState) {
    const prevPicture = prevState.picture;
    const nextPicture = this.state.picture;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPicture !== nextPicture || prevPage !== nextPage) {
      this.setState({ loading: true });
      try {
        const { hits, totalHits, total } = await fetchArticlesWithQuery(
          nextPicture,
          this.state.page
        );
        if (total === 0) {
          this.setState({ pictureList: null });
          return toast.error('Image not found');
        }
        this.setState(prevState => ({
          totalHits,
          pictureList: [...prevState.pictureList, ...hits],
        }));
        // перевірка лише на одну сторінку

        if (this.state.page * 12 > totalHits && total !== 0)
          toast.error('Its last page');
        // перевірка знайшли щось чи ні
      } catch (error) {
        toast.error('Sorry! We have some problem. Try again later! '); // помилка
        console.log(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  handleFormGetPicture = picture => {
    this.setState({ picture, page: 1, pictureList: [] });
  };
  handleOnclick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleGetIcon = url => {
    this.setState(prevState => ({ modalShow: !prevState.modalShow }));
    this.setState({ icon: url });
  };
  handleToggleModalShow = () => {
    this.setState(prevState => ({ modalShow: !prevState.modalShow }));
  };
  lastPage = () => {
    const { totalHits, page } = this.state;
    if (page * 12 > totalHits) toast.error('Its last page');
  };
  render() {
    const { pictureList, loading, modalShow, totalHits, page } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmitGetPicture={this.handleFormGetPicture} />
        <ImageGallery pictureList={pictureList} onClick={this.handleGetIcon} />
        <Loader visible={loading} />
        <ToastContainer autoClose={3000} />
        {page * 12 < totalHits && (
          <button className="Button" type="button" onClick={this.handleOnclick}>
            Load more
          </button>
        )}
        {modalShow && (
          <Modal onClick={this.handleToggleModalShow} icon={this.state.icon} />
        )}
      </div>
    );
  }
}
