import React, { useEffect } from 'react';

function Application({ openApplication, setOpenApplication }) {
	console.log(openApplication)
	const Part01 = {
		column: { "col2": ["NAME", "DOOR No. / FLAT No.", "ROAD/STREET", "VILLAGE|MANDAL", "CITY/TOWN", "DISTRICT", "E-MAIL", ["MOBILE", "ALTERNATE"]] }
	}
	const header = ["File No.", "ULB ABBREVIATION", "BP", "ZONE", "CIR", "WD", "", "", "", ""];
	const FormDate = ["", "", "", ""]
	useEffect(() => {
		// Open the modal when the component mounts
		const modal = document.getElementById('my_modal_5');
		if (modal) {
			modal.showModal();
		}
	}, []);

	return (
		<div className='w-full h-full text-black'>
			<dialog id="my_modal_5" className="modal">
				<div className="modal-box w-11/12 max-w-5xl p-14">
					<div className='text-center'>
						<h2>FORM - 6</h2>
						<h2 className='mt-3'>………………….(ULB)</h2>
						<h2 className='mt-3'>BUILDING PERMISSION APPLICATION</h2>
					</div>
					<div className='mt-6'>
						<table className="table border-0 ">
							<tbody>
								<div className='w-full flex items-center justify-between'>
									<tr>
										{header.map(data => <td className=' bg-white border border-black'>{data}</td>)}
									</tr>
									<tr>  <td className=' bg-white border border-black'>Date:</td> {FormDate.map(data => <td className=' bg-white border border-black'>{data}</td>)}</tr>
								</div>
							</tbody>
						</table>
					</div>
					<div className='mt-5'>
						<h1>To</h1>
						<p>The Commissioner,</p>
						<p className='mt-3'>……………………………………………..(ULB)</p>
						<span>(Use CAPITAL LETTERS only)</span>
					</div>
					<div className="modal-action">

					</div>
					<div>
						{/* Part01 */}
						<div className="overflow-x-auto">
							<table className="table bg-white">
								{/* head */}
								<thead>
									<tr>
										<th className='bg-white border border-black fontbold text-black'>A</th>
										<th className='bg-white border-l border-t border-black fontbold text-black'>ADDRESS OF THE APPLICANT</th>
										<th className='bg-white border-r border-t border-black fontbold text-black'></th>
									</tr>
								</thead>
								<tbody className='bg-white'>
									{/* row 1 */}
									{Part01.column.col2.map((data, index) => (
										<>
											<tr key={index} className='bg-white'>
												<th className='bg-white border border-black w-14'>{index + 1}</th>
												<td className='bg-white border border-black w-24 p-0 pl-4'>{
													index == 7 ?
														<span className='flex items-center justify-between'>
															<span>PHONE</span>
															<span className='flex flex-col border-black'>
																{data.map((d,i) => <span className={`border-l border-black p-1 ${i==0&&"border-b"}`}>{d}</span>)}
															</span>
														</span>

														: data}</td>
												<td className='bg-white border border-black'></td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>


					<form method="dialog">
						<button onClick={() => setOpenApplication(false)} className="btn mt-5 text-right">Close</button>
					</form>
				</div>

			</dialog>
		</div>
	)
}

export default Application;
