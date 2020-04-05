import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import './PostList.sass'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
			<>
				<figure>
					<img className="img-pc" src="https://hello-japanese.net/wp-content/uploads/2018/10/HelloJapanese2.jpg" alt="image"/>
					<img className="img-sp" src="https://hello-japanese.net/wp-content/themes/hello-japanese-sp/img/HelloJapanese2_sp.jpg" alt="image"/>
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
											<img src="https://hello-japanese.net/wp-content/uploads/2018/10/HelloJapanese2.jpg" alt="image"/>
										</figure>
										<div className="article-text">
											<h3 className="article-text-title">{post.title}</h3>
											<p className="article-text-date">
												{post.date}
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
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
