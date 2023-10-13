import React from 'react'

function MessageCard({msg}) {
  return (
    <div className='col-lg-8 col-sm-12 text-center p-3 border mx-auto shadow-sm my-3 rounded-2'>
      <p className='p-0 m-0'>{msg}</p>
    </div>
  )
}

export default MessageCard