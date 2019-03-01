import React, { Component } from 'react';
import {
 Container, Header, Image, Segment, Label,
 Input,

} from 'semantic-ui-react';
import renderHtml from 'react-render-html';
import PropTypes from 'prop-types';
import Moment from 'moment';
import './article.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../../utils/auth';
import { deleteUserArticle } from '../../redux/actions/ArticleActions/actions';
import ArticleButtonGroup from './ArticleButtonGroup';

const activeUser = getCurrentUser();

class ArticleComponent extends Component {
  state = { isDeletePopUpOpen: false };

componentWillUpdate(nextProps, nextState, nextContext) {
  const { deleteArticle } = nextProps;
  if (deleteArticle.isDeleted) {
     window.location.assign('/');
  }
}

  handleDeleteOpen = () => {
    this.setState({ isDeletePopUpOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ isDeletePopUpOpen: false });
  };

  handleDelete = () => {
    const { deleteArticleAction, articles } = this.props;
    const { article } = articles.data;
    deleteArticleAction({ slug: article.slug });
    setTimeout(() => {
      this.handleDeleteClose();
    }, 1000);
  };

  render() {
    const popUpEvents = {
     handleDeleteClose: this.handleDeleteClose,
     handleDeleteOpen: this.handleDeleteOpen,
    };
    const {
      articles, isFetching, handleEdit, imageInput, deleteArticle, rating,
    } = this.props;
    const { article: fetchedArticle } = articles.data;
    const { isDeletePopUpOpen } = this.state;
    return (
      <Segment loader={isFetching} basic>
        {fetchedArticle && activeUser.username === fetchedArticle.author.username ? (
          <ArticleButtonGroup
            isDeletePopUpOpen={isDeletePopUpOpen}
            popUpEvents={popUpEvents}
            isDeleting={deleteArticle.isDeleting}
            handleDelete={this.handleDelete}
            handleEdit={handleEdit}
          />
        ) : null}
        <Container text style={{ marginTop: '7em' }}>
          <Header id="single-article-head" as="h1">{fetchedArticle && fetchedArticle.title}</Header>
          <p id="article-description">{fetchedArticle && fetchedArticle.description}</p>
          <Input
            style={{ display: 'none' }}
            type="file"
            name="image"
            ref={imageInput}
          />
          <Image
            label={{
              as: 'a',
              color: 'teal',
              corner: 'right',
              icon: 'edit outline',
            }}
            src={(fetchedArticle && fetchedArticle.image)
            || 'https://source.unsplash.com/random/720x580'}
            className="article-image"
          />
          <div className="clearfix">
            <span className="article-span">
              {fetchedArticle && fetchedArticle.author.username}
            </span>
            {'| '}
            <span className="article-span">
              {Moment(fetchedArticle && fetchedArticle.created_at).format('dddd Do MMMM YYYY')}
            </span>
            <span className="article-span float-right">{rating}</span>
          </div>
          <span className="article-body">
            {fetchedArticle && renderHtml(fetchedArticle.body)}
          </span>

        </Container>
      </Segment>
    );
  }
}

const mapStateToProps = ({ articles, deleteArticle }) => ({
  articles,
  deleteArticle,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  deleteArticleAction: deleteUserArticle,
}, dispatch);
ArticleComponent.propTypes = {
  article: PropTypes.shape({}).isRequired,
  articles: PropTypes.shape({}).isRequired,
  deleteArticle: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  imageInput: PropTypes.shape({}).isRequired,
  deleteArticleAction: PropTypes.func.isRequired,
  rating: PropTypes.shape({}).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent);
