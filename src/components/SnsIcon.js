import React from 'react'
import './SnsIcon.sass'
const path = "https://hello-japanese.s3.ap-northeast-1.amazonaws.com/2020/04/"
const SnsIcon = ({name, url, size}) => {
	return (
		<div className="sns">
			<div className="sns-background"></div>
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src={path + name + '.png'}
					title={name}
					alt={'icon of ' + name}
					height={size}
					width={size}
				/>
			</a>
		</div>
	)
}

export default SnsIcon