import React from 'react';

const Input = ({id, value, className, onChange, autoFocus, readOnly, dataIndex}) => {
	return (
			<input
				id={id}
				value={value}
				className={className}
				onChange={onChange}
				autoFocus={autoFocus}
				data-index={dataIndex}
				readOnly={readOnly}
			/>
		)
}


Input.defaultProps = {
	id: '',
	value: '',
	className: '',
	onChange: null,
	autoFocus: false,
	dataIndex: '',
	readOnly: false
}

export default Input