import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import './PostList.sass'

const url = 'https://hello-japanese.s3.ap-northeast-1.amazonaws.com/2020/04/HelloJapanese1.png'
const returnSpThumbnail = (url) => {
	const position = url.lastIndexOf('.')
	if (position === -1) return ''
	const extension = url.slice(position)
	const thumbnailSp = url.slice(0, position)
	return thumbnailSp + '_sp' + extension
}
const initialToUpperCase = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
const showDate = (date) => {
	const target = 'May'
	date = initialToUpperCase(date)
	const hasTarget = date.includes(target)
	if (hasTarget) {
		const dot = date.indexOf('.')
		if (dot === -1) {
			return date
		}
		const month = date.slice(0, dot)
		const dayYear = date.slice(dot + 1)
		return month + dayYear
	}
	return date
}
export default class IndexPage extends React.Component {
	render() {
		const { posts, title } = this.props

    return (
			<>
				<figure>
					<img className="img-pc" src={url} alt="image"/>
					<img className="img-sp" src={returnSpThumbnail(url)} alt="image"/>
				</figure>
				<section className="section">
					<div className="container">
						<div className="content">
							<h2 className="container-content-title">{title}</h2>
						</div>
						<div className="articles">
							{posts.map(({ node: post }) => (
								<div
									className="content"
									key={post.id}
								>
									<Link className="article" to={post.slug}>
										<figure>
											<img src={post.featured_media.source_url} alt={post.title} title={post.title}/>
										</figure>
										<div className="article-text">
											<h3 className="article-text-title">{post.title}</h3>
											<p className="article-text-date">
												{showDate(post.date)}
											</p>
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>
				</section>
			</>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    date(formatString: "MMM. D, YYYY")
		slug
		featured_media {
      source_url
    }
  }
`
