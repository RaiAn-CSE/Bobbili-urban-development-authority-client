import React, { useState } from 'react'
import DocumentFooter from './DocumentFooter'
import { Link } from 'react-router-dom'

function DrawingTable({ setApprovedConfirmation, setRecomendationMessage }) {
  const TrData = [
    { "Proposed Site Area": ["","",""] },
    { "Access Road Width": ["","",""] },
    { "Scope of Road Windering": ["","",""] },
    { "Setbacks": ["","",""] },
    { "North": ["","",""] },
    { "South": ["", "", "Hello"] },
    { "East": ["","",""] },
    { "West": ["","",""] },
    { "Number of floors": ["","",""] },
    { "No. of Units": ["","",""] },
    { "Green Strip": ["Yes", "Yes", "Yes/No"] },
    { "Staircase Width": ["","",""] }
  ]
  const skipNumber = [5, 6, 7, 8]
  return (
    <div>

      <div className="overflow-x-auto mb-16 w-full max-w-5xl md:ml-7">
        <Link to="/" className="link">Drawing Scrutiny report</Link>
        <table className="table text-black table-sm mt-4">
          {/* Table Header */}
          <thead className='text-black'>
            <tr>
              <th className='border border-black w-8'>Serial No.</th>
              <th className='border border-black'>Description</th>
              <th className='border border-black'>As per G.O.s</th>
              <th className='border border-black'>As on Plan</th>
              <th className='border border-black'>Observation</th>
            </tr>
          </thead>
          <tbody>
            {
              TrData.map((data, index) => {
                return (
                  <tr key={index}>
                    <th className='border border-black bg-white w-8 text-center'>
                      {skipNumber.includes(index + 1) ? "" : skipNumber.find(num => num < index + 1) ? index - 3 : index + 1}
                    </th>
                    <td className='border border-black bg-white'>{Object.keys(TrData[index])}</td>
                    <td className='border border-black bg-white'>{Object.values(data)[0][0]}</td>
                    <td className='border border-black bg-white'>{Object.values(data)[0][1]}</td>
                    <td className='border border-black bg-white'>{Object.values(data)[0][2]}</td>
                  </tr>)
              })
            }
          </tbody>
        </table>
      </div>
      <DocumentFooter setApprovedConfirmation={setApprovedConfirmation} setRecomendationMessage={setRecomendationMessage}/>
    </div>
  )
}

export default DrawingTable;