import React, { useState } from 'react'
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Modal = ({ clickHandler, id }) => {

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('')

  return (
    <div>
      <button
        className="appearance-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faPenNib} size="lg" style={{ color: "#3f525f", }} />
      </button>

      {showModal ? (
        <>
          <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-shark-50 outline-none focus:outline-none">
                <div className="flex items-start justify-center p-5 border-b border-solid border-shark-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-shark-600">
                    New List Name
                  </h3>
                </div>


                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='change list name...'
                  className='bg-shark-50 flex mt-5 mb-5 w-full text-center border-none focus:outline-none text-shark-600' />

                <div className="flex items-center justify-end p-6 border-t border-solid border-shark-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-shark-300 text-shark-50 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      clickHandler(id, name)
                    }
                    }
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </div>
  )
}

export default Modal