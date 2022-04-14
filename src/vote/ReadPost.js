import React, { useState, useEffect} from 'react';
import { countDown } from '../utilities/Utilities.js';
import Post from '../post/Post.js';
import './Vote.css';

const ReadPost = (props) => {
	
	const { info, status, handleOnSubmit} = props;
	const [endTime, setEndTime] = useState('');

	useEffect(() => {
		// initialize
		const interval = setInterval(() => {
			setEndTime(countDown(info.endTime));
		}, 1000);

		return () => {
			clearInterval(interval);
			setEndTime();
		}
	}, []);

	return (
		<>
			<div id='vote-read-post-info'>
				<span className='vote-title'><strong>Reading Time</strong></span>
				<span>Clock is ticking...</span>
				<span>{endTime}</span>
				<button type='submit' className='btn btn-outline-warning shadow' name={status} onClick={handleOnSubmit}>NEXT</button>
			</div>
			<Post info={info} ownedFN={false}/>
		</>
	)
};

export default ReadPost;