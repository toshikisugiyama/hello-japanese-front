import React from 'react'
import './Footer.sass'
import SnsIcon from './SnsIcon'

const snsItems = [
	{
		name: 'twitter',
		url: 'https://twitter.com/HelloJapanese1'
	},
	{
		name: 'instagram',
		url: 'https://www.instagram.com/hellojapanese1'
	},
]
const Footer = () => {
	return (
		<footer className="footer">
			<ul className="footer-snslist">
				{snsItems.map(item => {
					return (
						<li className="fotter-snslist-item" key={item.name} >
							<SnsIcon name={item.name} url={item.url} size="50px" />
						</li>
					)
				})}
			</ul>
			<p className="footer-copyright">&#169;2018 - {new Date().getFullYear()} Hello Japanese</p>
		</footer>
	)
}

export default Footer