import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import './page.sass'

export const PageTemplate = ({ title, content, date, thumbnail }) => {
	const returnSpThumbnail = (url) => {
		const position = url.lastIndexOf('.')
		if (position === -1) return ''
		const extension = url.slice(position)
		const thumbnailSp = url.slice(0, position)
		return thumbnailSp + '_sp' + extension
	}
  return (
		<article className="page">
			<figure className="page-thumbnail">
				<img className="page-thumbnail-pc" src={thumbnail} alt={title} title={title}/>
				<img className="page-thumbnail-sp" src={returnSpThumbnail(thumbnail)} alt={title} title={title}/>
			</figure>
			<section className="page-container container section">
				<h2 className="page-container-title title">
					{title}
				</h2>
				<p className="page-container-date">{date}</p>
				<div
					className="page-container-content content"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</section>
		</article>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
	date: PropTypes.string,
	thumbnail: PropTypes.string,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <PageTemplate
				title={page.title}
				content={page.content}
				date={page.date}
				thumbnail={page.featured_media.source_url}
			/>
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
			content
			slug
			date(formatString: "MMMM D, Y")
			featured_media {
				source_url
			}
    }
  }
`
