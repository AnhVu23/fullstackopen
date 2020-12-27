import React from 'react'
export default ({ onFormSubmit }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}
