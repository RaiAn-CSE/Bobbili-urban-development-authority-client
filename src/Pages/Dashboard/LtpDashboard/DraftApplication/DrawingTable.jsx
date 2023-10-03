import React from 'react'
import DocumentFooter from './DocumentFooter'
import { Link } from 'react-router-dom'

function DrawingTable() {
  const TrData = [
    { "Proposed Site Area": ["Tanjimul", "Islam", "Sabbir"] },
    { "Access Road Width": ["Tanjimul", "Islam", "Sabbir"] },
    { "Scope of Road Windering": ["Tanjimul", "Islam", "Sabbir"] },
    { "Setbacks": ["Tanjimul", "Islam", "Sabbir"] },
    { "North": ["Tanjimul", "Islam", "Sabbir"] },
    { "South": ["Tanjimul", "Islam", "Sabbir"] },
    { "East": ["Tanjimul", "Islam", "Sabbir"] },
    { "West": ["Tanjimul", "Islam", "Sabbir"] },
    { "Number of floors": ["Tanjimul", "Islam", "Sabbir"] },
    { "No. of Units": ["Tanjimul", "Islam", "Sabbir"] },
    { "Green Strip": ["Yes", "Yes", "Yes/No"] },
    { "Staircase Width": ["Tanjimul", "Islam", "Sabbir"] }
  ]
  const skipNumber = [5, 6, 7, 8]
  return (
    <div>

      <div className="overflow-x-auto mb-16 w-full max-w-5xl ml-7">
        <Link to="/" className="link link-success">Drawing Scrutiny report</Link>
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
                  <tr>
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
      <DocumentFooter />
    </div>
  )
}

export default DrawingTable;