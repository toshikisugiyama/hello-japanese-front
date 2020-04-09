import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import './post.sass'

export const BlogPostTemplate = ({
  content,
  categories,
  title,
	date,
	thumbnail,
  author,
}) => {
	const returnSpThumbnail = (url) => {
		const position = url.lastIndexOf('.')
		if (position === -1) return ''
		const extension = url.slice(position)
		const thumbnailSp = url.slice(0, position)
		return thumbnailSp + '_sp' + extension
	}
  return (
    <article className="post">
			<figure className="post-thumbnail">
				<img className="post-thumbnail-pc" src={thumbnail} alt={title} title={title}/>
				<img className="post-thumbnail-sp" src={returnSpThumbnail(thumbnail)} alt={title} title={title}/>
			</figure>
      <section className="post-container container section">
				<div className="post-container-category">
					{categories && categories.length ? (
						<ul className="post-container-category-list">
							{categories.map(category => (
								<li key={`${category.slug}cat`} className="post-container-category-list-item">
									<Link to={`/categories/${category.slug}/`}>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					) : null}
				</div>
				<h1 className="post-container-title title">
					{title}
				</h1>
				<p className="post-container-date">{date}</p>
				<div
					className="post-container-content content"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
				<p className="post-container-author">
					posted by{' '}
					<Link to={`/author/${author.slug}`}>{author.name}</Link>
				</p>
      </section>
    </article>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
	title: PropTypes.string,
	thumbnail: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        title={post.title}
				date={post.date}
				thumbnail={post.featured_media.source_url}
        author={post.author}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
			date(formatString: "MMMM D, YYYY")
			featured_media {
				source_url
			}
      categories {
        name
        slug
      }
      author {
        name
        slug
      }
    }
  }
`
