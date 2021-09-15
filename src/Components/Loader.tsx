import React from 'react'

const Loader = (props: { isPending: boolean }) => {
  return props.isPending ? (
    <div
      className='spinner-grow'
      style={{ width: '3rem', height: '3rem' }}
      role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : null
}

export default Loader
